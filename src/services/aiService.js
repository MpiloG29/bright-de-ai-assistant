class AIService {
  constructor() {
    this.termDatabase = {
      'etl': {
        explanation: "ETL (Extract, Transform, Load) is a data integration process that combines data from multiple sources into a single, consistent data store.",
        howToUse: "Use Python with pandas, Apache Airflow, or Talend. Create extraction scripts, transformation logic, and loading procedures.",
        whenToUse: "When moving data from operational databases to data warehouses, or preparing data for analytics.",
        examples: ["Extracting sales data from PostgreSQL", "Transforming JSON to CSV format", "Loading cleaned data to Redshift"]
      },
      'data lake': {
        explanation: "A Data Lake is a centralized repository that stores all your structured and unstructured data at any scale.",
        howToUse: "Use AWS S3, Azure Data Lake, or Google Cloud Storage. Organize with folders and metadata tags.",
        whenToUse: "When storing raw data for future analysis, or when schema-on-read flexibility is needed.",
        examples: ["Storing IoT sensor data", "Archiving social media feeds", "Keeping clickstream logs"]
      },
      'spark': {
        explanation: "Apache Spark is a unified analytics engine for large-scale data processing with built-in modules for SQL, streaming, and machine learning.",
        howToUse: "Write code in Python (PySpark), Scala, or R. Use DataFrames API for structured data.",
        whenToUse: "When processing terabytes of data, performing complex transformations, or real-time streaming.",
        examples: ["Processing log files", "Running ML algorithms", "Streaming analytics"]
      },
      'sql': {
        explanation: "Structured Query Language is used to communicate with databases, allowing you to query, insert, update, and delete data.",
        howToUse: "Write SELECT statements with JOINs, WHERE clauses, and GROUP BY aggregations.",
        whenToUse: "Whenever working with relational databases or structured data stores.",
        examples: ["Customer data analysis", "Sales reporting", "Inventory management"]
      }
    };
  }

  async askQuestion(question) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerQuestion = question.toLowerCase();
        let answer = '';
        let matchedTerm = null;
        
        // Find matching term
        for (const [term, data] of Object.entries(this.termDatabase)) {
          if (lowerQuestion.includes(term)) {
            matchedTerm = data;
            answer = `📚 **${term.toUpperCase()}**: ${data.explanation}\n\n`;
            answer += `🔧 **How to use**: ${data.howToUse}\n\n`;
            answer += `⏰ **When to use**: ${data.whenToUse}\n\n`;
            answer += `📋 **Examples**:\n`;
            data.examples.forEach((ex, i) => {
              answer += `  ${i+1}. ${ex}\n`;
            });
            break;
          }
        }
        
        if (!matchedTerm) {
          answer = `I don't have specific information about "${question}" yet. Try asking about:\n`;
          answer += `- ETL (Extract, Transform, Load)\n`;
          answer += `- Data Lake\n`;
          answer += `- Apache Spark\n`;
          answer += `- SQL\n`;
          answer += `- Data Warehouse\n`;
          answer += `- Big Data\n`;
        }
        
        resolve({
          answer: answer,
          confidence: matchedTerm ? 95 : 50,
          timestamp: new Date().toLocaleTimeString()
        });
      }, 500);
    });
  }

  async generateQuiz(topic = 'general') {
    const quizzes = {
      'etl': [
        {
          question: "What does ETL stand for?",
          options: ["Extract, Transform, Load", "Extract, Transfer, Load", "Export, Transform, Link", "Execute, Transfer, Load"],
          correct: 0,
          explanation: "ETL stands for Extract, Transform, Load - the three phases of data integration."
        },
        {
          question: "Which tool is commonly used for ETL?",
          options: ["Apache Airflow", "Microsoft Word", "Photoshop", "Slack"],
          correct: 0,
          explanation: "Apache Airflow is a popular workflow orchestration tool for ETL pipelines."
        },
        {
          question: "What's the first step in ETL?",
          options: ["Extract", "Transform", "Load", "Delete"],
          correct: 0,
          explanation: "Extraction is the first step, where data is pulled from source systems."
        }
      ],
      'data lake': [
        {
          question: "What is a Data Lake?",
          options: [
            "A repository for raw, unprocessed data",
            "A swimming pool filled with data",
            "A type of database",
            "A visualization tool"
          ],
          correct: 0,
          explanation: "A Data Lake stores raw data in its native format until needed."
        },
        {
          question: "Which cloud service is used for Data Lakes?",
          options: ["AWS S3", "EC2", "Lambda", "Route 53"],
          correct: 0,
          explanation: "Amazon S3 is commonly used as a Data Lake storage solution."
        }
      ],
      'general': [
        {
          question: "What is a primary key in databases?",
          options: [
            "A unique identifier for each row",
            "A password for the database",
            "The first column in a table",
            "A type of index"
          ],
          correct: 0,
          explanation: "A primary key uniquely identifies each record in a table."
        },
        {
          question: "What does SQL stand for?",
          options: [
            "Structured Query Language",
            "Simple Question Language",
            "Standard Query Logic",
            "System Query Language"
          ],
          correct: 0,
          explanation: "SQL is the standard language for relational database management."
        }
      ]
    };

    const normalizedTopic = topic.toLowerCase();
    const quizQuestions = quizzes[normalizedTopic] || quizzes.general;
    
    return {
      topic: topic,
      questions: quizQuestions,
      totalQuestions: quizQuestions.length,
      difficulty: normalizedTopic === 'general' ? 'Beginner' : 'Intermediate'
    };
  }
}

const aiService = new AIService();
export default aiService;