export const scenarios = [
  {
    id: 1,
    title: 'Build Your First ETL Pipeline',
    icon: '🔧',
    difficulty: 'Beginner',
    duration: '15 min',
    category: 'ETL',
    description: 'You\'re a junior data engineer at a retail company. Build an ETL pipeline to load daily sales data from CSV files into a data warehouse.',
    story: 'It\'s Monday morning. Your manager drops by: "Hey, the analytics team needs yesterday\'s sales data in the warehouse by 9 AM every day. Can you build a pipeline?" This is your moment.',
    steps: [
      {
        id: 1,
        title: 'Extract: Connect to the Source',
        description: 'Your CSV files land in an S3 bucket every night at midnight. Write code to read them.',
        task: 'Which extraction approach should you use?',
        options: [
          { id: 'a', text: 'Manually copy files each morning', correct: false, feedback: 'This doesn\'t scale and you\'d need to be up at midnight every day!' },
          { id: 'b', text: 'Schedule a script to read from S3 automatically', correct: true, feedback: 'Correct! Automated extraction triggered by a schedule (or file arrival event) is the right approach.' },
          { id: 'c', text: 'Ask the team to email you the CSV files', correct: false, feedback: 'Never rely on manual human steps in a data pipeline — they\'re unreliable.' },
          { id: 'd', text: 'Connect directly to the cash register database', correct: false, feedback: 'Connecting directly to source systems risks overloading them and bypassing proper extraction patterns.' }
        ]
      },
      {
        id: 2,
        title: 'Transform: Clean the Data',
        description: 'The CSV files have inconsistent date formats, missing values, and duplicate rows. What do you handle first?',
        task: 'Select the correct transformation order:',
        options: [
          { id: 'a', text: 'Load first, transform later in the warehouse', correct: false, feedback: 'This is ELT and can work, but for data quality issues like duplicates, filtering early is better.' },
          { id: 'b', text: 'Deduplicate → standardize dates → handle nulls → validate', correct: true, feedback: 'Correct! Remove duplicates first so you\'re not doing extra work. Then standardize formats, handle nulls, and validate.' },
          { id: 'c', text: 'Handle nulls → load → deduplicate in the warehouse', correct: false, feedback: 'Deduplication in the warehouse is expensive. Do it before loading when possible.' },
          { id: 'd', text: 'Skip transformation — the data is probably fine', correct: false, feedback: 'Raw data is almost never clean enough for analytics. Always transform!' }
        ]
      },
      {
        id: 3,
        title: 'Load: Write to the Warehouse',
        description: 'You\'re loading daily incremental data. The warehouse already has previous days\' data.',
        task: 'Which load strategy is correct?',
        options: [
          { id: 'a', text: 'Truncate the entire table and reload all data daily', correct: false, feedback: 'This is a full refresh. It works but is inefficient for large historical datasets.' },
          { id: 'b', text: 'Append-only: add new rows without checking for duplicates', correct: false, feedback: 'If the pipeline re-runs (e.g., after a failure), you\'ll get duplicate data.' },
          { id: 'c', text: 'Upsert (INSERT or UPDATE) based on a unique key', correct: true, feedback: 'Correct! Upsert ensures idempotency — running the pipeline twice doesn\'t cause duplicates.' },
          { id: 'd', text: 'Write to a completely new table each day', correct: false, feedback: 'This creates table sprawl and makes historical queries very difficult.' }
        ]
      }
    ],
    completionMessage: 'You built your first ETL pipeline! You extracted from S3, transformed messy data, and loaded it idempotently. The analytics team can now access yesterday\'s sales data every morning at 9 AM.',
    xpReward: 150
  },
  {
    id: 2,
    title: 'Design a Star Schema',
    icon: '⭐',
    difficulty: 'Intermediate',
    duration: '20 min',
    category: 'Data Modeling',
    description: 'The analytics team keeps asking slow questions. Your fact tables are unmaintained. Design a proper star schema for an e-commerce business.',
    story: 'Your analysts complain: "Queries take forever and I can\'t figure out which table has the real revenue numbers." You diagnose the problem: no data model. Time to design a star schema.',
    steps: [
      {
        id: 1,
        title: 'Identify the Grain',
        description: 'Before designing tables, you must define the grain — the level of detail stored in your fact table.',
        task: 'For an order analytics system, what is the best grain for the fact table?',
        options: [
          { id: 'a', text: 'One row per customer', correct: false, feedback: 'Too coarse — you\'d lose individual transaction details.' },
          { id: 'b', text: 'One row per order line item (product within an order)', correct: true, feedback: 'Correct! Order line items are the atomic grain — you can always aggregate up but never disaggregate down.' },
          { id: 'c', text: 'One row per month of revenue', correct: false, feedback: 'Pre-aggregating at the grain level removes flexibility for drill-down analysis.' },
          { id: 'd', text: 'One row per product', correct: false, feedback: 'Products are a dimension, not the grain of transactional facts.' }
        ]
      },
      {
        id: 2,
        title: 'Identify the Dimensions',
        description: 'You have: order date, customer name, customer email, product name, product category, product price, store location, and payment method.',
        task: 'Which set of dimensions is correct?',
        options: [
          { id: 'a', text: 'dim_customer, dim_product, dim_date, dim_store, dim_payment', correct: true, feedback: 'Correct! Each dimension captures a "who, what, when, where, how" context for the fact.' },
          { id: 'b', text: 'dim_customer_email, dim_product_name, dim_price', correct: false, feedback: 'These are attributes within dimensions, not separate dimension tables.' },
          { id: 'c', text: 'Just one big dimension table with everything', correct: false, feedback: 'This creates a "one big table" anti-pattern — it\'s difficult to maintain and wastes space.' },
          { id: 'd', text: 'dim_customer, dim_date — the rest goes in the fact table', correct: false, feedback: 'Product and store details belong in their own dimensions, not mixed into the fact table.' }
        ]
      },
      {
        id: 3,
        title: 'Design the Fact Table',
        description: 'Your fact_order_line table needs the right columns.',
        task: 'Which fact table design is correct?',
        options: [
          { id: 'a', text: 'order_line_id, customer_name, product_name, revenue, quantity', correct: false, feedback: 'Names (customer_name, product_name) belong in dimension tables, not the fact table.' },
          { id: 'b', text: 'order_line_id, customer_id(FK), product_id(FK), date_id(FK), quantity, revenue, discount', correct: true, feedback: 'Correct! Fact tables have foreign keys to dimensions plus numeric measures.' },
          { id: 'c', text: 'Just store all the raw CSV data here', correct: false, feedback: 'Raw data without proper modeling won\'t support efficient analytics.' },
          { id: 'd', text: 'order_line_id, all_customer_data, all_product_data, revenue', correct: false, feedback: 'Embedding all customer and product data defeats the purpose of a star schema.' }
        ]
      }
    ],
    completionMessage: 'Excellent data modeling! You defined the grain, identified 5 clean dimensions, and designed a fact table with proper foreign keys and measures. Your analysts can now write fast, intuitive queries.',
    xpReward: 200
  },
  {
    id: 3,
    title: 'Debug a Broken Data Pipeline',
    icon: '🐛',
    difficulty: 'Advanced',
    duration: '25 min',
    category: 'Troubleshooting',
    description: 'It\'s 8 AM. The morning pipeline failed. Dashboards are showing yesterday\'s data. Your phone is buzzing. Debug and fix it.',
    story: 'You get a Slack message: "The daily dashboard hasn\'t updated. Revenue numbers look wrong." You check the pipeline scheduler — it shows a red X. Incident response mode: on.',
    steps: [
      {
        id: 1,
        title: 'Triage: Find the Failure',
        description: 'The Airflow DAG shows a red task called "transform_sales". What do you check first?',
        task: 'What\'s your first debugging step?',
        options: [
          { id: 'a', text: 'Restart the entire pipeline immediately', correct: false, feedback: 'Never restart without understanding the root cause — you might make it worse.' },
          { id: 'b', text: 'Read the task logs to find the error message', correct: true, feedback: 'Correct! Always read the logs first. The error message tells you exactly what failed.' },
          { id: 'c', text: 'Email the data source team that their data is bad', correct: false, feedback: 'Blame comes after investigation. Check your own logs first.' },
          { id: 'd', text: 'Roll back to yesterday\'s data and tell stakeholders it\'s fine', correct: false, feedback: 'Hiding a failure isn\'t fixing it. You need to understand and resolve the root cause.' }
        ]
      },
      {
        id: 2,
        title: 'Diagnose: Read the Error',
        description: 'The log shows: "KeyError: \'sale_amount\' — column not found in source DataFrame". What caused this?',
        task: 'What most likely happened?',
        options: [
          { id: 'a', text: 'Your code has a bug that was always there', correct: false, feedback: 'The pipeline was working yesterday, so the bug is new — likely a schema change.' },
          { id: 'b', text: 'The source system changed the column name (e.g., sale_amount → amount)', correct: true, feedback: 'Correct! Schema drift is the #1 cause of pipeline failures. Always monitor upstream schema changes.' },
          { id: 'c', text: 'The server ran out of memory', correct: false, feedback: 'An OOM error would show a memory exception, not a KeyError.' },
          { id: 'd', text: 'The database credentials expired', correct: false, feedback: 'Credential issues show authentication errors, not missing column errors.' }
        ]
      },
      {
        id: 3,
        title: 'Fix and Prevent',
        description: 'You\'ve confirmed the source renamed "sale_amount" to "amount". You fix the mapping. How do you prevent this next time?',
        task: 'What\'s the best preventive measure?',
        options: [
          { id: 'a', text: 'Add a schema validation step at ingestion that alerts if columns are missing or renamed', correct: true, feedback: 'Correct! Schema validation (with tools like Great Expectations or dbt tests) catches changes before they crash production.' },
          { id: 'b', text: 'Ask the source team to never change their schema', correct: false, feedback: 'You can\'t control upstream systems. Design your pipeline to detect and handle changes.' },
          { id: 'c', text: 'Use SELECT * to avoid hardcoding column names', correct: false, feedback: 'SELECT * is a trap — your transforms still reference specific columns, and you lose visibility into what\'s changing.' },
          { id: 'd', text: 'Run the pipeline manually every day to catch issues early', correct: false, feedback: 'Manual monitoring defeats the purpose of automation and doesn\'t scale.' }
        ]
      }
    ],
    completionMessage: 'Incident resolved! You diagnosed a schema drift bug, fixed the column mapping, and implemented schema validation to prevent recurrence. The dashboards are back online and stakeholders are happy.',
    xpReward: 250
  }
];

export const dragDropExercises = [
  {
    id: 1,
    title: 'Build an ETL Pipeline',
    description: 'Drag the stages into the correct order to build a complete ETL pipeline',
    category: 'ETL',
    stages: [
      { id: 'extract', label: 'Extract', icon: '📥', color: '#4ecdc4', correctPosition: 1, description: 'Pull data from source systems' },
      { id: 'validate', label: 'Validate', icon: '✅', color: '#45b7d1', correctPosition: 2, description: 'Check data quality' },
      { id: 'transform', label: 'Transform', icon: '⚙️', color: '#96ceb4', correctPosition: 3, description: 'Clean and reshape data' },
      { id: 'load', label: 'Load', icon: '📤', color: '#ffd166', correctPosition: 4, description: 'Write to destination' },
      { id: 'monitor', label: 'Monitor', icon: '📊', color: '#ff6b6b', correctPosition: 5, description: 'Track pipeline health' }
    ]
  },
  {
    id: 2,
    title: 'Medallion Architecture Layers',
    description: 'Arrange the data lake layers from raw to refined',
    category: 'Data Lake',
    stages: [
      { id: 'bronze', label: 'Bronze (Raw)', icon: '🥉', color: '#cd7f32', correctPosition: 1, description: 'Raw, unmodified data as-is' },
      { id: 'silver', label: 'Silver (Curated)', icon: '🥈', color: '#c0c0c0', correctPosition: 2, description: 'Cleaned, deduped, conformed' },
      { id: 'gold', label: 'Gold (Business)', icon: '🥇', color: '#ffd700', correctPosition: 3, description: 'Aggregated, business-ready' }
    ]
  }
];
