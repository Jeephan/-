/**
 * 应用程序入口文件
 */

// 加载环境变量
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
const { connectDB } = require('./config/database');
const { formatResponse } = require('./utils/utils');

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 路由
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);

// Swagger API文档
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// 测试路由
app.get('/', (req, res) => {
  res.json(formatResponse(true, '欢迎访问API服务器！'));
});

// 数据库连接
connectDB(); // 确保数据库连接在.env配置后初始化

// 新增环境变量校验（可选）
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Missing environment variable: ${varName}`);
    process.exit(1);
  }
});

// 只在直接运行时启动服务器，而不是在测试时
if (require.main === module) {
  app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
  });
}

// 404错误处理
app.use((req, res, next) => {
  res.status(404).json(formatResponse(false, '请求的资源不存在'));
});

// 全局错误处理中间件
app.use((err, req, res, next) => {
  console.error(`错误: ${err.message}\n${err.stack}`);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || '服务器内部错误';
  
  res.status(statusCode).json(formatResponse(false, message));
});

// 导出app对象供测试使用
module.exports = app;
