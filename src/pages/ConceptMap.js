import React, { useState } from 'react';
import '../styles/components.css';

const conceptNodes = [
  { id: 'data_warehouse', label: 'Data Warehouse', icon: '🏛️', category: 'Storage', color: '#45b7d1', x: 50, y: 50, description: 'Central repository for structured, processed data optimized for analytics. Examples: Snowflake, BigQuery, Redshift.' },
  { id: 'data_lake', label: 'Data Lake', icon: '🌊', category: 'Storage', color: '#4ecdc4', x: 20, y: 30, description: 'Stores raw data in its native format at scale. Handles structured, semi-structured, and unstructured data.' },
  { id: 'data_lakehouse', label: 'Data Lakehouse', icon: '🏠', category: 'Storage', color: '#06d6a0', x: 35, y: 15, description: 'Combines data lake storage with data warehouse analytics. Examples: Databricks, Delta Lake, Apache Iceberg.' },
  { id: 'etl', label: 'ETL', icon: '🔄', category: 'Processing', color: '#ffd166', x: 75, y: 30, description: 'Extract, Transform, Load — moves data from sources to destination with transformation in the middle.' },
  { id: 'elt', label: 'ELT', icon: '⚡', category: 'Processing', color: '#ff9f1c', x: 80, y: 55, description: 'Extract, Load, Transform — loads raw data first, transforms inside the warehouse. Common in cloud DWs.' },
  { id: 'kafka', label: 'Apache Kafka', icon: '📨', category: 'Streaming', color: '#ff6b6b', x: 15, y: 65, description: 'Distributed event streaming platform. Handles millions of events/second. The backbone of real-time pipelines.' },
  { id: 'spark', label: 'Apache Spark', icon: '⚡', category: 'Processing', color: '#e63946', x: 50, y: 80, description: 'Distributed computing engine for large-scale data processing. Supports batch and streaming. 100x faster than MapReduce.' },
  { id: 'airflow', label: 'Apache Airflow', icon: '🌊', category: 'Orchestration', color: '#a855f7', x: 78, y: 78, description: 'Workflow orchestration platform. Defines, schedules, and monitors data pipelines as DAGs (Directed Acyclic Graphs).' },
  { id: 'dbt', label: 'dbt', icon: '🔧', category: 'Transformation', color: '#ff9e2c', x: 65, y: 15, description: 'Data Build Tool — SQL-based transformation layer. Adds version control, testing, and documentation to data models.' },
  { id: 'star_schema', label: 'Star Schema', icon: '⭐', category: 'Modeling', color: '#ffd700', x: 50, y: 40, description: 'Data model with a central fact table surrounded by dimension tables. Optimized for analytical queries.' },
  { id: 'feature_store', label: 'Feature Store', icon: '🗃️', category: 'ML', color: '#7c3aed', x: 20, y: 78, description: 'Centralized repository for ML features. Enables consistent feature computation across training and serving.' },
  { id: 'delta_lake', label: 'Delta Lake', icon: '🔺', category: 'Storage', color: '#0ea5e9', x: 35, y: 65, description: 'Open-source storage layer that brings ACID transactions to data lakes. Created by Databricks.' }
];

const conceptEdges = [
  { from: 'data_lake', to: 'data_warehouse', label: 'feeds', style: 'solid' },
  { from: 'data_lake', to: 'data_lakehouse', label: 'evolves to', style: 'dashed' },
  { from: 'data_warehouse', to: 'data_lakehouse', label: 'merges with', style: 'dashed' },
  { from: 'etl', to: 'data_warehouse', label: 'loads into', style: 'solid' },
  { from: 'elt', to: 'data_warehouse', label: 'transforms in', style: 'solid' },
  { from: 'elt', to: 'data_lake', label: 'loads into', style: 'solid' },
  { from: 'kafka', to: 'spark', label: 'streams to', style: 'solid' },
  { from: 'spark', to: 'data_lake', label: 'writes to', style: 'solid' },
  { from: 'spark', to: 'data_warehouse', label: 'writes to', style: 'solid' },
  { from: 'airflow', to: 'etl', label: 'orchestrates', style: 'solid' },
  { from: 'airflow', to: 'spark', label: 'triggers', style: 'solid' },
  { from: 'dbt', to: 'data_warehouse', label: 'transforms in', style: 'solid' },
  { from: 'dbt', to: 'star_schema', label: 'builds', style: 'solid' },
  { from: 'star_schema', to: 'data_warehouse', label: 'pattern for', style: 'dashed' },
  { from: 'delta_lake', to: 'data_lakehouse', label: 'enables', style: 'solid' },
  { from: 'delta_lake', to: 'data_lake', label: 'layer on', style: 'solid' },
  { from: 'feature_store', to: 'data_lake', label: 'reads from', style: 'solid' },
  { from: 'spark', to: 'feature_store', label: 'computes for', style: 'solid' }
];

const categories = ['All', 'Storage', 'Processing', 'Streaming', 'Orchestration', 'Transformation', 'Modeling', 'ML'];
const categoryColors = {
  Storage: '#45b7d1', Processing: '#ffd166', Streaming: '#ff6b6b',
  Orchestration: '#a855f7', Transformation: '#ff9e2c', Modeling: '#ffd700', ML: '#7c3aed'
};

const ConceptMap = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredNode, setHoveredNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel] = useState(1);

  const filteredNodes = conceptNodes.filter(n => {
    const catMatch = activeCategory === 'All' || n.category === activeCategory;
    const searchMatch = !searchTerm || n.label.toLowerCase().includes(searchTerm.toLowerCase()) || n.description.toLowerCase().includes(searchTerm.toLowerCase());
    return catMatch && searchMatch;
  });

  const filteredIds = new Set(filteredNodes.map(n => n.id));

  const visibleEdges = conceptEdges.filter(e =>
    filteredIds.has(e.from) && filteredIds.has(e.to)
  );

  const getNodeById = (id) => conceptNodes.find(n => n.id === id);

  const connectedNodeIds = selectedNode
    ? new Set([
        selectedNode.id,
        ...conceptEdges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id)
          .flatMap(e => [e.from, e.to])
      ])
    : null;

  const isNodeDimmed = (node) => connectedNodeIds && !connectedNodeIds.has(node.id);

  return (
    <div className="concept-map-page">
      <div className="page-hero concept-hero">
        <h2>🗺️ Concept Map</h2>
        <p>See how data engineering concepts connect. Click any node to explore its relationships.</p>
      </div>

      {/* Controls */}
      <div className="concept-controls">
        <div className="concept-search">
          <input
            type="text"
            placeholder="Search concepts..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="concept-search-input"
          />
        </div>
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
              style={activeCategory === cat && cat !== 'All' ? { background: categoryColors[cat], color: '#fff', border: 'none' } : {}}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="concept-layout">
        {/* SVG Map */}
        <div className="map-container">
          {selectedNode && (
            <button className="clear-selection-btn" onClick={() => setSelectedNode(null)}>
              ✕ Clear Selection
            </button>
          )}
          <svg
            className="concept-svg"
            viewBox="0 0 100 100"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Edges */}
            {visibleEdges.map((edge, idx) => {
              const fromNode = getNodeById(edge.from);
              const toNode = getNodeById(edge.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted = selectedNode &&
                (edge.from === selectedNode.id || edge.to === selectedNode.id);

              return (
                <g key={idx}>
                  <line
                    x1={`${fromNode.x}%`} y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`} y2={`${toNode.y}%`}
                    stroke={isHighlighted ? '#6366f1' : '#cbd5e1'}
                    strokeWidth={isHighlighted ? '0.5' : '0.2'}
                    strokeDasharray={edge.style === 'dashed' ? '2,1' : 'none'}
                    markerEnd="url(#arrowhead)"
                    opacity={selectedNode && !isHighlighted ? 0.1 : 0.7}
                  />
                  {isHighlighted && (
                    <text
                      x={`${(fromNode.x + toNode.x) / 2}%`}
                      y={`${(fromNode.y + toNode.y) / 2}%`}
                      fontSize="1.8"
                      fill="#6366f1"
                      textAnchor="middle"
                      dy="-0.5"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {filteredNodes.map(node => {
              const isDimmed = isNodeDimmed(node);
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode === node.id;

              return (
                <g
                  key={node.id}
                  className="concept-node-group"
                  onClick={() => setSelectedNode(isSelected ? null : node)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer' }}
                  opacity={isDimmed ? 0.15 : 1}
                >
                  <circle
                    cx={`${node.x}%`} cy={`${node.y}%`}
                    r={isSelected ? '6' : isHovered ? '5.5' : '5'}
                    fill={node.color}
                    stroke={isSelected ? '#fff' : 'transparent'}
                    strokeWidth="0.8"
                    style={{ filter: isSelected ? `drop-shadow(0 0 3px ${node.color})` : 'none', transition: 'all 0.2s' }}
                  />
                  <text
                    x={`${node.x}%`} y={`${node.y}%`}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="3" fill="white" fontWeight="bold"
                  >
                    {node.icon}
                  </text>
                  <text
                    x={`${node.x}%`} y={`${node.y + 7}%`}
                    textAnchor="middle"
                    fontSize="2.2"
                    fill={isSelected ? node.color : '#334155'}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail Panel */}
        <div className="concept-detail-panel">
          {selectedNode ? (
            <div className="node-detail" style={{ borderTop: `4px solid ${selectedNode.color}` }}>
              <div className="node-detail-header">
                <span className="node-detail-icon" style={{ background: selectedNode.color }}>
                  {selectedNode.icon}
                </span>
                <div>
                  <h3>{selectedNode.label}</h3>
                  <span className="node-category-badge" style={{ background: categoryColors[selectedNode.category] }}>
                    {selectedNode.category}
                  </span>
                </div>
              </div>
              <p className="node-description">{selectedNode.description}</p>

              <div className="node-connections">
                <h4>Connections:</h4>
                {conceptEdges
                  .filter(e => e.from === selectedNode.id || e.to === selectedNode.id)
                  .map((edge, i) => {
                    const other = getNodeById(edge.from === selectedNode.id ? edge.to : edge.from);
                    if (!other || !filteredIds.has(other.id)) return null;
                    const isFrom = edge.from === selectedNode.id;
                    return (
                      <div
                        key={i}
                        className="connection-item"
                        onClick={() => setSelectedNode(other)}
                        style={{ cursor: 'pointer' }}
                      >
                        <span style={{ color: other.color }}>{other.icon} {other.label}</span>
                        <span className="connection-label">
                          {isFrom ? `→ ${edge.label}` : `← ${edge.label}`}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="node-placeholder">
              <div className="placeholder-icon">🗺️</div>
              <h3>Click a concept to explore</h3>
              <p>Select any node on the map to see its definition and connections to other concepts.</p>
              <div className="legend">
                <h4>Categories:</h4>
                {Object.entries(categoryColors).map(([cat, color]) => (
                  <div key={cat} className="legend-item">
                    <span className="legend-dot" style={{ background: color }}></span>
                    <span>{cat}</span>
                  </div>
                ))}
                <div className="legend-item">
                  <span className="legend-line solid"></span>
                  <span>Direct relationship</span>
                </div>
                <div className="legend-item">
                  <span className="legend-line dashed"></span>
                  <span>Conceptual relationship</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Term Cards Grid */}
      <div className="concepts-list-section">
        <h3>All Concepts ({filteredNodes.length})</h3>
        <div className="concepts-list-grid">
          {filteredNodes.map(node => (
            <div
              key={node.id}
              className={`concept-list-card ${selectedNode?.id === node.id ? 'selected' : ''}`}
              style={{ borderLeft: `4px solid ${node.color}` }}
              onClick={() => setSelectedNode(node)}
            >
              <div className="concept-list-header">
                <span>{node.icon}</span>
                <strong>{node.label}</strong>
                <span className="concept-list-category" style={{ color: node.color }}>{node.category}</span>
              </div>
              <p>{node.description.split('.')[0]}.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConceptMap;
