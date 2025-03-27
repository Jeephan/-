const mysql = require('mysql2/promise');

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345678',
  database: process.env.DB_NAME || 'wechat_order',
  charset: 'utf8mb4',
  // 添加连接配置以解决编码问题
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  // 添加认证插件配置解决AUTH_SWITCH_PLUGIN_ERROR
  authPlugins: {
    mysql_native_password: () => () => Buffer.from([0])
  }
};

// 创建连接池
const pool = mysql.createPool(dbConfig);

// 连接数据库
async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log('数据库连接成功！');
    connection.release();
  } catch (error) {
    console.error('数据库连接失败：', error);
    process.exit(1);
  }
}

// 导出连接池和连接函数
module.exports = {
  pool,
  connectDB
};
