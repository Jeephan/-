const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../src/utils/utils');

jest.mock('jsonwebtoken'); // 新增mock声明，确保正确隔离JWT模块

describe('Authentication Middleware', () => {
  test('验证有效Token', async () => {
    const req = httpMocks.createMocks().req;
    req.headers = { authorization: 'Bearer valid_token' };
    const res = httpMocks.createMocks().res;
    const next = jest.fn(); // 使用jest.fn()创建mock函数
    
    // 需要mock用户验证逻辑
    jest.spyOn(jwt, 'verify').mockReturnValue({ id: 1 }); // 修改为返回id字段
    
    await authMiddleware(req, res, next);
    expect(req.userId).toBeDefined(); // 修改为检查userId而不是user
    expect(next).toHaveBeenCalled();
  });
});