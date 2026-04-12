export const caseStudies = [
  {
    id: 1,
    industry: 'Finance',
    company: 'FinServe Analytics',
    title: 'Real-Time Fraud Detection Pipeline',
    icon: '🏦',
    difficulty: 'Advanced',
    duration: '25 min read',
    tags: ['Streaming', 'Kafka', 'Spark', 'ML'],
    summary: 'How a mid-sized bank built a real-time fraud detection system processing 2M transactions/day using Apache Kafka and Spark Streaming.',
    challenge: 'The bank was losing $4M/year to fraud because their batch-processing system only detected fraud 24–48 hours after transactions occurred. By then, funds were long gone.',
    solution: 'They rebuilt their pipeline using Apache Kafka for event streaming, Spark Streaming for real-time processing, and a feature store to serve ML models in under 200ms.',
    architecture: [
      { step: 1, label: 'Transaction Event', tool: 'Kafka', description: 'Each transaction publishes an event to a Kafka topic in real time.' },
      { step: 2, label: 'Feature Extraction', tool: 'Spark Streaming', description: 'Spark reads the stream and extracts 60+ features (location, device, velocity).' },
      { step: 3, label: 'Feature Store', tool: 'Redis', description: 'Historical features (avg spend, known devices) fetched from Redis in <5ms.' },
      { step: 4, label: 'ML Inference', tool: 'TensorFlow Serving', description: 'Model scores the transaction with a fraud probability.' },
      { step: 5, label: 'Decision & Alert', tool: 'Rule Engine', description: 'High-risk transactions are blocked; alerts sent to customers and analysts.' },
    ],
    results: ['97.3% fraud detection rate', '0.02% false positive rate', '$3.8M saved in year one', 'Detection latency reduced from 36 hours to 180ms'],
    deTermsUsed: ['Kafka', 'Spark Streaming', 'Feature Store', 'ETL', 'Data Pipeline'],
    lessons: 'Batch processing is often the wrong tool for time-sensitive decisions. Real-time pipelines add complexity but unlock outcomes that are simply impossible with batch.',
    storytelling: 'Imagine you\'re shopping online at midnight when your phone buzzes: "Suspicious transaction blocked." That instant protection came from a data pipeline running millions of checks in milliseconds — all orchestrated by the data engineering patterns you\'re learning here.'
  },
  {
    id: 2,
    industry: 'Healthcare',
    company: 'MedDataCo',
    title: 'Unified Patient Data Lake',
    icon: '🏥',
    difficulty: 'Intermediate',
    duration: '20 min read',
    tags: ['Data Lake', 'Delta Lake', 'EHR', 'HIPAA'],
    summary: 'A regional hospital network eliminated data silos across 12 facilities by building a HIPAA-compliant data lake on Azure.',
    challenge: 'Doctors could not see a patient\'s full history because records were scattered across 12 different EMR systems. This led to duplicate tests, missed allergies, and avoidable readmissions.',
    solution: 'Built a centralized data lake on Azure Data Lake Storage Gen2 using Delta Lake for ACID transactions, with strict row-level security for HIPAA compliance.',
    architecture: [
      { step: 1, label: 'Source Systems', tool: 'Multiple EMRs', description: '12 EHR systems (Epic, Cerner, etc.) send HL7 FHIR messages via API.' },
      { step: 2, label: 'Ingestion', tool: 'Azure Data Factory', description: 'ADF pipelines normalize and land raw data into the Bronze layer.' },
      { step: 3, label: 'Transformation', tool: 'Azure Databricks', description: 'Spark jobs clean, deduplicate, and create Silver (curated) tables.' },
      { step: 4, label: 'Gold Layer', tool: 'Delta Lake', description: 'Patient 360 views, cohort analytics, and readmission risk scores.' },
      { step: 5, label: 'Access', tool: 'Power BI + APIs', description: 'Clinicians see unified patient history; data scientists run cohort studies.' },
    ],
    results: ['40% reduction in duplicate lab tests', '28% decrease in 30-day readmissions', 'Unified records across 2.1M patients', 'Full HIPAA audit trail maintained'],
    deTermsUsed: ['Data Lake', 'Delta Lake', 'ETL', 'Data Lakehouse', 'Medallion Architecture'],
    lessons: 'Healthcare data is messy, siloed, and regulated. The medallion architecture (Bronze/Silver/Gold) is ideal because it preserves raw data for compliance while serving clean data to consumers.',
    storytelling: 'Picture a doctor in the ER at 2 AM with an unconscious patient. In seconds, they pull up a unified history — allergies, surgeries, medications from all 12 facilities — all made possible by a data lake that stitches records together invisibly.'
  },
  {
    id: 3,
    industry: 'E-Commerce',
    company: 'ShopStream',
    title: 'Personalization at Scale with Snowflake',
    icon: '🛒',
    difficulty: 'Intermediate',
    duration: '18 min read',
    tags: ['Snowflake', 'dbt', 'Recommendation Engine', 'Data Warehouse'],
    summary: 'An e-commerce platform boosted revenue by 22% by rebuilding their recommendation engine on Snowflake + dbt, replacing a brittle legacy system.',
    challenge: 'Their old recommendation system was a monolithic SQL monster with 15,000 lines running every night on an aging Oracle database. It took 14 hours to run, crashed weekly, and was understood by only one engineer.',
    solution: 'Migrated to Snowflake as the cloud data warehouse, rewrote all transformations in dbt with proper testing and documentation, and added near-real-time personalization signals.',
    architecture: [
      { step: 1, label: 'Event Collection', tool: 'Segment', description: 'User clicks, views, purchases captured as events and sent to Snowflake via Segment.' },
      { step: 2, label: 'Staging Models', tool: 'dbt', description: 'Raw event tables cleaned and typed in staging dbt models.' },
      { step: 3, label: 'Feature Engineering', tool: 'dbt + Python', description: 'User affinity scores, category preferences, recency-frequency-monetization (RFM) models.' },
      { step: 4, label: 'Recommendation Scores', tool: 'Snowflake ML Functions', description: 'Collaborative filtering run inside Snowflake using ML functions.' },
      { step: 5, label: 'Serving', tool: 'REST API', description: 'Recommendations exposed via a low-latency API consumed by the website.' },
    ],
    results: ['22% revenue lift from personalization', 'Pipeline runtime reduced from 14 hours to 45 minutes', '100% test coverage on critical dbt models', '3x engineer productivity — any team member can now modify models'],
    deTermsUsed: ['Data Warehouse', 'dbt', 'ELT', 'Snowflake', 'Data Modeling', 'Star Schema'],
    lessons: 'Legacy SQL spaghetti is a massive engineering risk. dbt\'s modular, testable approach transforms a brittle data pipeline into something the whole team can own and iterate on.',
    storytelling: 'You browse a sneaker site for 30 seconds and the "You might also like" section already knows you want running gear, not basketball shoes. That instant intuition is powered by a data pipeline that processed your last 50 interactions in under a minute.'
  },
  {
    id: 4,
    industry: 'Logistics',
    company: 'FleetOps Global',
    title: 'IoT Pipeline for Fleet Telemetry',
    icon: '🚛',
    difficulty: 'Advanced',
    duration: '22 min read',
    tags: ['IoT', 'Kafka', 'Time-Series', 'AWS'],
    summary: 'A logistics company processes 500M sensor events/day from 50,000 trucks to predict maintenance needs 2 weeks before breakdowns occur.',
    challenge: 'Unplanned truck breakdowns cost $8,000–$15,000 per incident in downtime, emergency repairs, and missed deliveries. With 50,000 trucks, even a 1% breakdown rate is catastrophic.',
    solution: 'Built an IoT data pipeline on AWS using Kinesis for ingestion, TimescaleDB for time-series storage, and ML models to predict component failures from telemetry patterns.',
    architecture: [
      { step: 1, label: 'Sensor Data', tool: 'IoT Devices', description: 'Engine temp, oil pressure, brake wear — 50+ sensors per truck emit events every 30 seconds.' },
      { step: 2, label: 'Edge Processing', tool: 'AWS IoT Core', description: 'Data pre-processed on the truck\'s edge device before transmission to reduce bandwidth.' },
      { step: 3, label: 'Stream Ingestion', tool: 'AWS Kinesis', description: 'Millions of events/minute ingested into Kinesis Data Streams.' },
      { step: 4, label: 'Time-Series Storage', tool: 'TimescaleDB', description: 'Sensor readings stored in TimescaleDB with automatic partitioning by time.' },
      { step: 5, label: 'Predictive Analytics', tool: 'SageMaker', description: 'ML models trained on historical failure data score each truck daily for risk.' },
    ],
    results: ['76% reduction in unplanned breakdowns', '$12M saved annually', 'Maintenance windows planned 12 days in advance on average', 'Fuel efficiency improved 8% via route and speed recommendations'],
    deTermsUsed: ['Data Pipeline', 'Streaming', 'IoT', 'Time-Series', 'ETL', 'Data Lake'],
    lessons: 'IoT data engineering is 80% about data quality. Sensors fail, networks drop, and clocks drift. Build your pipeline to handle gaps, duplicates, and out-of-order events from day one.',
    storytelling: 'A truck on the highway at 65mph has an engine sensor quietly reporting slightly elevated temperatures. A data pipeline catches the pattern, alerts the fleet manager, and the truck is rerouted to a service center — avoiding a breakdown that would have stranded 40,000 lbs of cargo on the interstate.'
  },
  {
    id: 5,
    industry: 'Media & Entertainment',
    company: 'StreamFlix',
    title: 'Content Analytics Data Warehouse',
    icon: '🎬',
    difficulty: 'Beginner',
    duration: '15 min read',
    tags: ['Data Warehouse', 'BigQuery', 'Dashboard', 'A/B Testing'],
    summary: 'A streaming platform built a self-service analytics warehouse on BigQuery so product teams could answer their own questions without waiting on the data team.',
    challenge: 'The data team was a bottleneck — every time product managers wanted to know "which thumbnail gets more clicks?" or "what makes users churn?", they had to file a ticket and wait 2 weeks.',
    solution: 'Built a well-modeled data warehouse on BigQuery with a semantic layer, so product teams could drag-and-drop their own analyses in Looker without writing SQL.',
    architecture: [
      { step: 1, label: 'Event Tracking', tool: 'Snowplow', description: 'Every click, play, pause, and skip tracked as structured events.' },
      { step: 2, label: 'Data Warehouse', tool: 'BigQuery', description: 'Events loaded into BigQuery daily via batch ETL.' },
      { step: 3, label: 'Transformation', tool: 'dbt', description: 'dbt models build clean, business-friendly tables from raw events.' },
      { step: 4, label: 'Semantic Layer', tool: 'Looker LookML', description: 'Business metrics (retention, engagement score) defined once and reused everywhere.' },
      { step: 5, label: 'Self-Service', tool: 'Looker Dashboards', description: 'Product teams explore data, build charts, and run A/B tests independently.' },
    ],
    results: ['Data team ticket backlog reduced by 80%', 'Time-to-insight for product teams: 2 weeks → 20 minutes', '60 self-service dashboards created by non-engineers', 'Thumbnail A/B test discovered 34% CTR improvement'],
    deTermsUsed: ['Data Warehouse', 'ETL', 'Semantic Layer', 'Star Schema', 'Fact Table', 'Dimension Table'],
    lessons: 'The goal of a data warehouse isn\'t just to store data — it\'s to democratize access. When non-engineers can answer their own questions, your whole organization moves faster.',
    storytelling: 'A product manager at a streaming company wonders: "Do users who watch documentaries churn faster than those who watch dramas?" In the old world, that\'s a 2-week ticket. With a well-built warehouse and semantic layer, it\'s a 10-minute Looker question.'
  }
];

export const toolDemos = [
  {
    id: 'snowflake',
    name: 'Snowflake',
    icon: '❄️',
    category: 'Data Warehouse',
    description: 'Cloud-native data warehouse with auto-scaling compute',
    keyFeatures: ['Separation of storage and compute', 'Zero-copy cloning', 'Time travel (up to 90 days)', 'Multi-cluster warehouses'],
    sampleQuery: `-- Snowflake: Find top 10 products by revenue this month
SELECT
  p.product_name,
  SUM(o.revenue) AS total_revenue,
  COUNT(DISTINCT o.customer_id) AS unique_customers
FROM orders o
JOIN products p ON o.product_id = p.product_id
WHERE DATE_TRUNC('month', o.order_date) = DATE_TRUNC('month', CURRENT_DATE())
GROUP BY p.product_name
ORDER BY total_revenue DESC
LIMIT 10;`,
    useCases: ['Enterprise analytics', 'Data sharing', 'Multi-cloud deployments'],
    pricing: 'Pay-per-query (credits)',
    color: '#29b5e8'
  },
  {
    id: 'databricks',
    name: 'Databricks',
    icon: '🧱',
    category: 'Lakehouse Platform',
    description: 'Unified analytics platform built on Apache Spark and Delta Lake',
    keyFeatures: ['Delta Lake (ACID transactions)', 'MLflow for ML tracking', 'Collaborative notebooks', 'Auto-scaling Spark clusters'],
    sampleQuery: `# Databricks: Process events with PySpark
from pyspark.sql import functions as F

df = spark.read.format("delta").load("/data/events")

result = (df
  .filter(F.col("event_type") == "purchase")
  .groupBy("user_id", F.date_trunc("day", "timestamp").alias("day"))
  .agg(
    F.count("*").alias("purchases"),
    F.sum("amount").alias("total_spend")
  )
  .orderBy("day", "total_spend", ascending=[True, False])
)

result.write.format("delta").mode("overwrite").save("/data/daily_purchases")`,
    useCases: ['Large-scale ETL', 'ML feature engineering', 'Streaming analytics'],
    pricing: 'DBU (Databricks Units) per cluster type',
    color: '#ff3621'
  },
  {
    id: 'awsglue',
    name: 'AWS Glue',
    icon: '☁️',
    category: 'Managed ETL',
    description: 'Serverless ETL service that auto-discovers and transforms data on AWS',
    keyFeatures: ['Serverless — no infrastructure to manage', 'Auto-discovers schema (Glue Crawlers)', 'Visual ETL editor', 'Integrates with entire AWS ecosystem'],
    sampleQuery: `# AWS Glue: ETL job to transform S3 data
import sys
from awsglue.transforms import *
from awsglue.context import GlueContext
from pyspark.context import SparkContext

sc = SparkContext()
glueContext = GlueContext(sc)

# Read from S3 via Glue Data Catalog
source = glueContext.create_dynamic_frame.from_catalog(
    database="sales_db",
    table_name="raw_orders"
)

# Apply mapping/transformation
mapped = ApplyMapping.apply(frame=source, mappings=[
    ("order_id", "string", "order_id", "string"),
    ("amount", "double", "revenue", "double"),
    ("ts", "string", "event_date", "date")
])

# Write to target S3
glueContext.write_dynamic_frame.from_options(
    frame=mapped,
    connection_type="s3",
    connection_options={"path": "s3://my-bucket/processed/"}
)`,
    useCases: ['Serverless data transformation', 'S3 data lake ETL', 'Schema cataloging'],
    pricing: 'DPU-hours consumed',
    color: '#ff9900'
  }
];
