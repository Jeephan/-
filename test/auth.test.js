const request = require('supertest');
const app = require('../src/app');

describe('Authentication Tests', () => {
  test('成功注册', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ username: 'test', password: 'test123' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  test('失败登录（错误密码）', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'test', password: 'wrong' });
    expect(res.statusCode).toBe(401);
  });
});