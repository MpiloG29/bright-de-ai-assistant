export const dataEngineeringTerms = [
  {
    id: 1,
    term: "ETL",
    definition: "Extract, Transform, Load - process of extracting data from sources, transforming it, and loading into a destination.",
    howToUse: "Used to move data from transactional databases to data warehouses. Implement using tools like Apache Airflow, Talend, or custom Python scripts.",
    whenToUse: "When migrating data between systems, creating data pipelines, or preparing data for analytics.",
    category: "Data Processing",
    difficulty: "Beginner",
    relatedTerms: ["ELT", "Data Pipeline", "Data Warehouse", "Data Integration", "Apache Airflow"]
  },
  {
    id: 2,
    term: "Data Lake",
    definition: "A centralized repository that allows you to store all your structured and unstructured data at any scale.",
    howToUse: "Implement using cloud services like AWS S3, Azure Data Lake, or Hadoop HDFS. Store raw data in its native format.",
    whenToUse: "When you need to store vast amounts of raw data for future processing or when schema-on-read is required.",
    category: "Storage",
    difficulty: "Intermediate",
    relatedTerms: ["Data Warehouse", "Data Mart", "Big Data", "Schema-on-Read", "AWS S3"]
  },
  {
    id: 3,
    term: "Data Warehouse",
    definition: "A large store of data collected from a wide range of sources used to guide business decisions through reporting and analysis.",
    howToUse: "Design using star or snowflake schemas. Use SQL for querying and tools like Redshift, BigQuery, or Snowflake for implementation.",
    whenToUse: "When you need structured, historical data for business intelligence, reporting, and analytics.",
    category: "Storage",
    difficulty: "Beginner",
    relatedTerms: ["Data Mart", "OLAP", "Business Intelligence", "Star Schema", "Snowflake Schema"]
  },
  {
    id: 4,
    term: "Apache Spark",
    definition: "A unified analytics engine for large-scale data processing with built-in modules for SQL, streaming, machine learning, and graph processing.",
    howToUse: "Write code in Python, Scala, Java, or R. Use Spark SQL for queries, Spark Streaming for real-time, and MLlib for machine learning.",
    whenToUse: "When processing large datasets (TB/PB scale), real-time streaming, or when you need in-memory processing for iterative algorithms.",
    category: "Processing",
    difficulty: "Intermediate",
    relatedTerms: ["Hadoop", "MapReduce", "DataFrames", "RDD", "Spark Streaming"]
  },
  {
    id: 5,
    term: "SQL",
    definition: "Structured Query Language - a domain-specific language used for managing and manipulating relational databases.",
    howToUse: "Write queries to SELECT, INSERT, UPDATE, DELETE data. Use JOINs to combine tables, GROUP BY for aggregation.",
    whenToUse: "When working with relational databases, performing data analysis, or extracting insights from structured data.",
    category: "Language",
    difficulty: "Beginner",
    relatedTerms: ["NoSQL", "PostgreSQL", "MySQL", "Query Optimization", "Indexing"]
  },
  {
    id: 6,
    term: "NoSQL",
    definition: "Non-relational databases that provide a mechanism for storage and retrieval of data modeled in means other than tabular relations.",
    howToUse: "Choose between document (MongoDB), key-value (Redis), column-family (Cassandra), or graph (Neo4j) databases based on use case.",
    whenToUse: "When dealing with unstructured/semi-structured data, need horizontal scaling, or require flexible schema.",
    category: "Database",
    difficulty: "Intermediate",
    relatedTerms: ["MongoDB", "Cassandra", "Redis", "Document Database", "Graph Database"]
  },
  {
    id: 7,
    term: "Data Pipeline",
    definition: "A set of data processing elements connected in series, where the output of one element is the input of the next one.",
    howToUse: "Design using tools like Apache Airflow, Luigi, or Prefect. Implement data validation, error handling, and monitoring.",
    whenToUse: "When automating data workflows, ensuring data quality, or moving data between systems on a schedule.",
    category: "Processing",
    difficulty: "Intermediate",
    relatedTerms: ["ETL", "Workflow Orchestration", "Apache Airflow", "Data Quality", "Monitoring"]
  },
  {
    id: 8,
    term: "Big Data",
    definition: "Extremely large data sets that may be analyzed computationally to reveal patterns, trends, and associations.",
    howToUse: "Use distributed computing frameworks like Hadoop, Spark. Process data across clusters of computers.",
    whenToUse: "When traditional databases can't handle the volume, velocity, or variety of your data (the 3 Vs of Big Data).",
    category: "Concept",
    difficulty: "Beginner",
    relatedTerms: ["Hadoop", "Spark", "Distributed Computing", "Volume Velocity Variety", "Data Lake"]
  },
  {
    id: 9,
    term: "Data Modeling",
    definition: "The process of creating a data model for the data to be stored in a database, defining relationships between data elements.",
    howToUse: "Create entity-relationship diagrams (ERDs), define tables, columns, keys, and relationships. Use normalization techniques.",
    whenToUse: "When designing new databases, optimizing existing schemas, or planning data integration between systems.",
    category: "Design",
    difficulty: "Intermediate",
    relatedTerms: ["ER Diagram", "Normalization", "Star Schema", "Snowflake Schema", "Database Design"]
  },
  {
    id: 10,
    term: "Apache Kafka",
    definition: "A distributed event streaming platform capable of handling trillions of events a day, used for building real-time streaming data pipelines.",
    howToUse: "Set up producers to publish messages to topics, consumers to subscribe to topics. Use brokers for distribution.",
    whenToUse: "When building real-time streaming applications, log aggregation, or event-driven architectures.",
    category: "Streaming",
    difficulty: "Advanced",
    relatedTerms: ["Event Streaming", "Message Queue", "Real-time Processing", "Pub/Sub", "Stream Processing"]
  },
  {
    id: 11,
    term: "Data Governance",
    definition: "The overall management of the availability, usability, integrity, and security of data used in an organization.",
    howToUse: "Implement data catalogs, establish data ownership, define data quality rules, and create data lineage documentation.",
    whenToUse: "When ensuring data quality, compliance with regulations (GDPR, HIPAA), or establishing data ownership in organizations.",
    category: "Management",
    difficulty: "Intermediate",
    relatedTerms: ["Data Quality", "Data Catalog", "Data Lineage", "GDPR Compliance", "Master Data Management"]
  },
  {
    id: 12,
    term: "Machine Learning",
    definition: "A subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.",
    howToUse: "Use libraries like scikit-learn, TensorFlow, PyTorch. Follow CRISP-DM process: business understanding to deployment.",
    whenToUse: "When you need predictive analytics, pattern recognition, or automated decision-making based on historical data.",
    category: "Analytics",
    difficulty: "Advanced",
    relatedTerms: ["AI", "Deep Learning", "Model Training", "Feature Engineering", "MLOps"]
  },
  {
    id: 13,
    term: "Cloud Computing",
    definition: "The delivery of computing services—including servers, storage, databases, networking—over the Internet ('the cloud').",
    howToUse: "Use AWS, Azure, or Google Cloud services. Implement Infrastructure as Code (IaC) using Terraform or CloudFormation.",
    whenToUse: "When you need scalability, cost-effectiveness, or don't want to manage physical hardware.",
    category: "Infrastructure",
    difficulty: "Beginner",
    relatedTerms: ["AWS", "Azure", "Google Cloud", "IaaS", "PaaS", "SaaS"]
  },
  {
    id: 14,
    term: "Data Quality",
    definition: "The measure of how well data fits its intended purpose, considering accuracy, completeness, consistency, and timeliness.",
    howToUse: "Implement data validation rules, use data profiling tools, establish data quality metrics, and monitor regularly.",
    whenToUse: "When data accuracy is critical for decision-making, reporting, or regulatory compliance.",
    category: "Management",
    difficulty: "Intermediate",
    relatedTerms: ["Data Validation", "Data Cleansing", "Data Profiling", "Accuracy Completeness Consistency", "DQ Metrics"]
  },
  {
    id: 15,
    term: "Real-time Processing",
    definition: "The processing of data as soon as it's produced or received, with minimal delay between input and output.",
    howToUse: "Use streaming frameworks like Apache Flink, Spark Streaming, or Kafka Streams. Implement windowing and state management.",
    whenToUse: "When you need immediate insights, live dashboards, fraud detection, or IoT data processing.",
    category: "Processing",
    difficulty: "Advanced",
    relatedTerms: ["Stream Processing", "Apache Flink", "Kafka Streams", "Event Time Processing", "Windowing"]
  },
  {
    id: 16,
    term: "Data Visualization",
    definition: "The graphical representation of information and data using visual elements like charts, graphs, and maps.",
    howToUse: "Use tools like Tableau, Power BI, or libraries like Matplotlib, Plotly. Follow design principles for effective communication.",
    whenToUse: "When you need to communicate insights, identify patterns, or make data accessible to non-technical stakeholders.",
    category: "Analytics",
    difficulty: "Beginner",
    relatedTerms: ["Dashboard", "Business Intelligence", "Chart Types", "Tableau", "Power BI"]
  },
  {
    id: 17,
    term: "Database Indexing",
    definition: "A data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes.",
    howToUse: "Create indexes on frequently queried columns, avoid over-indexing, and maintain indexes regularly.",
    whenToUse: "When you need to speed up SELECT queries, especially on large tables with WHERE, JOIN, or ORDER BY clauses.",
    category: "Database",
    difficulty: "Intermediate",
    relatedTerms: ["B-Tree", "Primary Key", "Composite Index", "Query Optimization", "Full-text Search"]
  },
  {
    id: 18,
    term: "Containerization",
    definition: "A lightweight alternative to full machine virtualization that involves encapsulating an application in a container with its own operating environment.",
    howToUse: "Use Docker to create container images, Kubernetes for orchestration, and Docker Compose for local development.",
    whenToUse: "When you need consistent environments across development, testing, and production, or microservices architecture.",
    category: "Infrastructure",
    difficulty: "Intermediate",
    relatedTerms: ["Docker", "Kubernetes", "Microservices", "DevOps", "CI/CD"]
  },
  {
    id: 19,
    term: "Data Mining",
    definition: "The process of discovering patterns and knowledge from large amounts of data using methods at the intersection of machine learning, statistics, and database systems.",
    howToUse: "Apply algorithms for classification, clustering, regression, association rule mining using tools like RapidMiner or Python libraries.",
    whenToUse: "When you need to discover hidden patterns, predict future trends, or segment customers from large datasets.",
    category: "Analytics",
    difficulty: "Advanced",
    relatedTerms: ["Pattern Recognition", "Clustering", "Classification", "Association Rules", "Predictive Analytics"]
  },
  {
    id: 20,
    term: "API",
    definition: "Application Programming Interface - a set of rules and protocols for building and interacting with software applications.",
    howToUse: "Design RESTful APIs with proper endpoints, HTTP methods, and status codes. Document using OpenAPI/Swagger.",
    whenToUse: "When integrating different systems, building microservices, or exposing data/services to other applications.",
    category: "Integration",
    difficulty: "Beginner",
    relatedTerms: ["REST", "GraphQL", "Web Services", "Microservices", "API Gateway"]
  },
  {
    id: 21,
    term: "Data Security",
    definition: "The practice of protecting digital information from unauthorized access, corruption, or theft throughout its entire lifecycle.",
    howToUse: "Implement encryption (at rest and in transit), access controls, auditing, and follow security best practices.",
    whenToUse: "Always, but especially when handling sensitive data like PII, financial information, or healthcare records.",
    category: "Security",
    difficulty: "Intermediate",
    relatedTerms: ["Encryption", "Access Control", "GDPR", "HIPAA", "Data Masking"]
  },
  {
    id: 22,
    term: "Workflow Orchestration",
    definition: "The automated arrangement, coordination, and management of complex computer systems, middleware, and services.",
    howToUse: "Use tools like Apache Airflow, Prefect, or Dagster to define DAGs (Directed Acyclic Graphs) for workflow management.",
    whenToUse: "When you need to schedule, monitor, and manage complex data pipelines with dependencies between tasks.",
    category: "Processing",
    difficulty: "Intermediate",
    relatedTerms: ["Apache Airflow", "DAG", "Task Scheduling", "Pipeline Monitoring", "Prefect"]
  },
  {
    id: 23,
    term: "Data Replication",
    definition: "The process of copying data from one database to another to ensure consistency between redundant resources.",
    howToUse: "Set up master-slave replication, multi-master replication, or use change data capture (CDC) techniques.",
    whenToUse: "When you need high availability, disaster recovery, load balancing, or geographical distribution of data.",
    category: "Database",
    difficulty: "Advanced",
    relatedTerms: ["High Availability", "Disaster Recovery", "CDC", "Master-Slave", "Multi-Master"]
  },
  {
    id: 24,
    term: "Natural Language Processing",
    definition: "A subfield of AI that gives computers the ability to understand, interpret, and manipulate human language.",
    howToUse: "Use libraries like NLTK, spaCy, or Hugging Face Transformers for tasks like sentiment analysis, NER, or text classification.",
    whenToUse: "When processing text data, building chatbots, analyzing customer feedback, or extracting information from documents.",
    category: "Analytics",
    difficulty: "Advanced",
    relatedTerms: ["Text Mining", "Sentiment Analysis", "NER", "Chatbots", "Transformers"]
  },
  {
    id: 25,
    term: "DataOps",
    definition: "A set of practices, processes, and technologies that combines Data Engineering with DevOps principles to improve quality and reduce cycle time.",
    howToUse: "Implement CI/CD for data pipelines, version control for data transformations, testing, and monitoring.",
    whenToUse: "When you need to accelerate data pipeline development, improve reliability, and enable collaboration between teams.",
    category: "Methodology",
    difficulty: "Advanced",
    relatedTerms: ["DevOps", "CI/CD", "Data Pipeline", "Version Control", "Testing"]
  }
];