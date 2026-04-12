import React, { useState } from 'react';
import '../styles/components.css';

const SNIPPETS = {
  sql: {
    label: 'SQL',
    icon: '🗄️',
    examples: [
      {
        title: 'Aggregate Sales by Month',
        code: `-- Monthly revenue aggregation
SELECT
  DATE_TRUNC('month', order_date) AS month,
  COUNT(DISTINCT order_id)        AS total_orders,
  SUM(revenue)                    AS total_revenue,
  AVG(revenue)                    AS avg_order_value
FROM fact_orders
WHERE order_date >= '2024-01-01'
GROUP BY 1
ORDER BY 1 DESC;`
      },
      {
        title: 'Window Function: Running Total',
        code: `-- Running total of daily revenue
SELECT
  order_date,
  daily_revenue,
  SUM(daily_revenue) OVER (
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM (
  SELECT
    DATE(order_date) AS order_date,
    SUM(revenue)     AS daily_revenue
  FROM fact_orders
  GROUP BY 1
) daily_agg
ORDER BY order_date;`
      },
      {
        title: 'Slowly Changing Dimension (SCD Type 2)',
        code: `-- SCD Type 2: detect changed customer records
SELECT
  s.customer_id,
  s.name,
  s.email,
  s.address,
  CURRENT_TIMESTAMP AS valid_from,
  NULL              AS valid_to,
  TRUE              AS is_current
FROM staging_customers s
LEFT JOIN dim_customers d
  ON  s.customer_id = d.customer_id
  AND d.is_current = TRUE
WHERE d.customer_id IS NULL          -- new customers
   OR s.name    <> d.name            -- changed name
   OR s.email   <> d.email           -- changed email
   OR s.address <> d.address;        -- changed address`
      }
    ],
    simulatedOutput: {
      'Aggregate Sales by Month': `month       | total_orders | total_revenue | avg_order_value
------------|--------------|---------------|----------------
2024-12-01  |        1,842 |   $184,200.00 |         $99.95
2024-11-01  |        1,654 |   $165,400.00 |        $100.12
2024-10-01  |        1,521 |   $152,100.00 |         $99.99
2024-09-01  |        1,389 |   $138,900.00 |        $100.05
(4 rows in 0.12s)`,
      'default': `Query executed successfully.
(n rows returned in 0.08s)`
    }
  },
  python: {
    label: 'Python',
    icon: '🐍',
    examples: [
      {
        title: 'pandas ETL Transform',
        code: `import pandas as pd
from datetime import datetime

# Simulate reading raw CSV data
data = {
    'order_id':   [101, 102, 102, 103, 104],
    'customer':   ['Alice', 'Bob', 'Bob', 'Charlie', None],
    'amount':     [99.99, 149.00, 149.00, 75.50, 200.00],
    'order_date': ['2024-01-15', '2024-01-16', '2024-01-16', '2024-01-17', '2024-01-18']
}
df = pd.DataFrame(data)
print(f"Raw rows: {len(df)}")
print(df)
print()

# --- TRANSFORM STEPS ---
# 1. Drop duplicates
df = df.drop_duplicates(subset=['order_id'])
print(f"After dedup: {len(df)} rows")

# 2. Handle nulls
df['customer'] = df['customer'].fillna('Unknown')

# 3. Parse dates
df['order_date'] = pd.to_datetime(df['order_date'])

# 4. Add derived columns
df['order_month'] = df['order_date'].dt.to_period('M')

print()
print("Cleaned DataFrame:")
print(df)
print()
print("Monthly summary:")
print(df.groupby('order_month')['amount'].agg(['sum','count','mean']).round(2))`
      },
      {
        title: 'PySpark: Read and Aggregate',
        code: `from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder \\
    .appName("SalesAggregation") \\
    .getOrCreate()

# Read from data lake (Delta format)
df = spark.read.format("delta") \\
    .load("s3://my-bucket/data/orders/")

# Filter, transform, aggregate
result = (
    df
    .filter(F.col("status") == "COMPLETED")
    .withColumn("revenue_usd", F.col("amount") * F.col("exchange_rate"))
    .groupBy(
        F.date_trunc("month", "order_date").alias("month"),
        "region"
    )
    .agg(
        F.sum("revenue_usd").alias("total_revenue"),
        F.countDistinct("customer_id").alias("unique_customers"),
        F.avg("revenue_usd").alias("avg_order_value")
    )
    .orderBy("month", "total_revenue", ascending=[True, False])
)

result.show(20, truncate=False)
result.write.format("delta").mode("overwrite") \\
    .save("s3://my-bucket/data/monthly_revenue/")`
      },
      {
        title: 'Data Quality Check with Great Expectations',
        code: `import great_expectations as ge
import pandas as pd

# Load data
df = ge.from_pandas(pd.read_csv("orders.csv"))

# --- DATA QUALITY EXPECTATIONS ---

# 1. order_id must be unique and not null
df.expect_column_values_to_be_unique("order_id")
df.expect_column_values_to_not_be_null("order_id")

# 2. amount must be positive
df.expect_column_values_to_be_between("amount", min_value=0)

# 3. status must be from a known set
df.expect_column_values_to_be_in_set(
    "status",
    ["PENDING", "COMPLETED", "CANCELLED", "REFUNDED"]
)

# 4. order_date must be within reasonable range
df.expect_column_values_to_be_between(
    "order_date",
    min_value="2020-01-01",
    max_value="2030-12-31"
)

# Validate and print results
results = df.validate()
print(f"Overall success: {results['success']}")
for r in results["results"]:
    status = "✅" if r["success"] else "❌"
    print(f"  {status} {r['expectation_config']['expectation_type']}: {r['expectation_config']['kwargs']}")`
      }
    ],
    simulatedOutput: {
      'pandas ETL Transform': `Raw rows: 5
   order_id customer   amount order_date
0       101    Alice    99.99 2024-01-15
1       102      Bob   149.00 2024-01-16
2       102      Bob   149.00 2024-01-16
3       103  Charlie    75.50 2024-01-17
4       104     None   200.00 2024-01-18

After dedup: 4 rows

Cleaned DataFrame:
   order_id  customer   amount  order_date order_month
0       101     Alice    99.99  2024-01-15     2024-01
1       102       Bob   149.00  2024-01-16     2024-01
3       103   Charlie    75.50  2024-01-17     2024-01
4       104   Unknown   200.00  2024-01-18     2024-01

Monthly summary:
              sum  count    mean
order_month
2024-01    524.49      4  131.12`,
      'default': `Script executed successfully.
Output printed above.`
    }
  },
  spark: {
    label: 'Spark SQL',
    icon: '⚡',
    examples: [
      {
        title: 'Streaming Word Count',
        code: `-- Spark SQL: Streaming aggregation
-- (Run in Databricks or Spark session)

-- Create a streaming table from Kafka source
CREATE OR REPLACE STREAMING TABLE kafka_events
AS SELECT
  CAST(value AS STRING) AS event_json,
  timestamp,
  partition,
  offset
FROM stream(read_kafka(
  bootstrapServers => 'kafka:9092',
  subscribe        => 'user_events'
));

-- Aggregate stream with a 5-minute tumbling window
CREATE OR REPLACE STREAMING TABLE event_counts_5min
AS SELECT
  window(timestamp, '5 minutes').start AS window_start,
  event_type,
  COUNT(*) AS event_count,
  COUNT(DISTINCT user_id) AS unique_users
FROM stream(kafka_events)
GROUP BY window(timestamp, '5 minutes'), event_type;`
      }
    ],
    simulatedOutput: {
      'default': `Streaming query started.
Batch 0: 0 rows processed
Batch 1: 1,284 rows processed (window: 10:00–10:05)
Batch 2: 1,551 rows processed (window: 10:05–10:10)
Query running... (streaming)`
    }
  }
};

const CodePlayground = () => {
  const [lang, setLang] = useState('sql');
  const [code, setCode] = useState(SNIPPETS.sql.examples[0].code);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedExample, setSelectedExample] = useState(SNIPPETS.sql.examples[0].title);
  const [activeTab, setActiveTab] = useState('editor');
  const [fontSize, setFontSize] = useState(14);

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    const firstExample = SNIPPETS[newLang].examples[0];
    setCode(firstExample.code);
    setSelectedExample(firstExample.title);
    setOutput('');
  };

  const handleExampleSelect = (example) => {
    setCode(example.code);
    setSelectedExample(example.title);
    setOutput('');
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('');
    setTimeout(() => {
      const outputs = SNIPPETS[lang].simulatedOutput;
      const result = outputs[selectedExample] || outputs['default'];
      setOutput(result);
      setIsRunning(false);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    });
  };

  const handleClear = () => {
    setCode('');
    setOutput('');
  };

  return (
    <div className="code-playground">
      <div className="playground-header">
        <div>
          <h2>💻 Code Playground</h2>
          <p>Write and run SQL, Python, and Spark code in a safe, simulated environment. Learn by doing.</p>
        </div>
        <div className="playground-meta">
          <span className="playground-badge">Simulated Runtime</span>
          <span className="playground-badge safe">Safe Environment</span>
        </div>
      </div>

      {/* Language Selector */}
      <div className="lang-tabs">
        {Object.entries(SNIPPETS).map(([key, val]) => (
          <button
            key={key}
            className={`lang-tab ${lang === key ? 'active' : ''}`}
            onClick={() => handleLanguageChange(key)}
          >
            {val.icon} {val.label}
          </button>
        ))}
      </div>

      <div className="playground-layout">
        {/* Sidebar: Examples */}
        <div className="playground-sidebar">
          <h4>📋 Examples</h4>
          {SNIPPETS[lang].examples.map((ex) => (
            <button
              key={ex.title}
              className={`example-btn ${selectedExample === ex.title ? 'active' : ''}`}
              onClick={() => handleExampleSelect(ex)}
            >
              {ex.title}
            </button>
          ))}

          <div className="playground-tips">
            <h4>💡 Tips</h4>
            {lang === 'sql' && (
              <ul>
                <li>Use <code>DATE_TRUNC</code> for time bucketing</li>
                <li>Window functions never reduce rows</li>
                <li>Always alias aggregations for readability</li>
                <li><code>EXPLAIN</code> shows query execution plan</li>
              </ul>
            )}
            {lang === 'python' && (
              <ul>
                <li>Always check <code>df.shape</code> before and after transforms</li>
                <li>Use <code>pd.read_csv(dtype=...)</code> to enforce types early</li>
                <li>Prefer <code>assign()</code> over direct column assignment</li>
                <li>Profile memory with <code>df.memory_usage()</code></li>
              </ul>
            )}
            {lang === 'spark' && (
              <ul>
                <li>Prefer <code>filter()</code> early to reduce shuffle</li>
                <li>Use <code>cache()</code> for DataFrames used multiple times</li>
                <li>Avoid Python UDFs — they break JVM optimization</li>
                <li><code>explain()</code> shows the physical plan</li>
              </ul>
            )}
          </div>
        </div>

        {/* Main Editor + Output */}
        <div className="playground-main">
          <div className="editor-tabs">
            <button
              className={`editor-tab ${activeTab === 'editor' ? 'active' : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              ✏️ Editor
            </button>
            {output && (
              <button
                className={`editor-tab ${activeTab === 'output' ? 'active' : ''}`}
                onClick={() => setActiveTab('output')}
              >
                📤 Output
              </button>
            )}
          </div>

          {activeTab === 'editor' && (
            <div className="editor-area">
              <div className="editor-toolbar">
                <div className="toolbar-left">
                  <button className="toolbar-btn" onClick={handleRun} disabled={isRunning}>
                    {isRunning ? '⏳ Running...' : '▶ Run'}
                  </button>
                  <button className="toolbar-btn secondary" onClick={handleCopy}>📋 Copy</button>
                  <button className="toolbar-btn secondary" onClick={handleClear}>🗑 Clear</button>
                </div>
                <div className="toolbar-right">
                  <label>Font: </label>
                  <button className="font-btn" onClick={() => setFontSize(f => Math.max(10, f - 2))}>A-</button>
                  <span className="font-size-display">{fontSize}px</span>
                  <button className="font-btn" onClick={() => setFontSize(f => Math.min(22, f + 2))}>A+</button>
                </div>
              </div>
              <textarea
                className="code-editor"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ fontSize: `${fontSize}px` }}
                spellCheck={false}
                placeholder={`Write your ${SNIPPETS[lang].label} code here...`}
              />
            </div>
          )}

          {activeTab === 'output' && output && (
            <div className="output-area">
              <div className="output-header">
                <span>Query Output</span>
                <button className="toolbar-btn secondary" onClick={() => setActiveTab('editor')}>Back to Editor</button>
              </div>
              <pre className="output-display">{output}</pre>
            </div>
          )}

          {isRunning && (
            <div className="running-indicator">
              <div className="loading-dots">
                <span></span><span></span><span></span>
              </div>
              <span>Executing {SNIPPETS[lang].label}...</span>
            </div>
          )}

          {output && activeTab === 'editor' && (
            <div className="output-peek" onClick={() => setActiveTab('output')}>
              ✅ Execution complete — <strong>click to view output</strong>
            </div>
          )}
        </div>
      </div>

      {/* Learning Panel */}
      <div className="learning-panel">
        <h3>🎓 What You're Practicing</h3>
        <div className="concept-tags">
          {lang === 'sql' && ['SELECT', 'GROUP BY', 'Window Functions', 'JOINs', 'Date Functions', 'CTEs', 'SCD Type 2'].map(t => (
            <span key={t} className="concept-tag sql-tag">{t}</span>
          ))}
          {lang === 'python' && ['pandas', 'DataFrames', 'ETL Patterns', 'Data Cleaning', 'PySpark', 'Data Quality', 'Great Expectations'].map(t => (
            <span key={t} className="concept-tag python-tag">{t}</span>
          ))}
          {lang === 'spark' && ['Spark SQL', 'Structured Streaming', 'Delta Lake', 'Kafka Integration', 'Window Functions'].map(t => (
            <span key={t} className="concept-tag spark-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
