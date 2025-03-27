/**
 * Swagger配置文件
 * 用于生成API文档
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '微信小程序API文档',
      version: '1.0.0',
      description: '微信小程序后端API接口文档',
      contact: {
        name: '开发者',
        email: 'developer@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '开发服务器'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nickname: { type: 'string' },
            avatar_url: { type: 'string' },
            member_level: { type: 'integer' },
            points: { type: 'integer' }
          }
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            image_url: { type: 'string' },
            sort_order: { type: 'integer' }
          }
        },
        MenuItem: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            category_id: { type: 'integer' },
            price: { type: 'number' },
            description: { type: 'string' },
            image_url: { type: 'string' },
            is_hot: { type: 'boolean' },
            stock: { type: 'integer' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // 指定API路由文件的位置
};

const specs = swaggerJsdoc(options);

module.exports = specs;