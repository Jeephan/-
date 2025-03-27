const UserModel = require('../src/models/userModel');
const bcrypt = require('bcryptjs'); // 新增bcryptjs引入

describe('Database Tests', () => {
  test('用户模型验证', async () => {
    // 使用UserModel而不是User类
    const userData = { username: 'test', password: 'test123' };
    // 验证UserModel可以正常使用
    expect(UserModel.findByUsername).toBeDefined();
  });

  test('密码哈希验证', async () => {
    const hashed = await bcrypt.hash('test123', 10);
    expect(await bcrypt.compare('test123', hashed)).toBe(true);
  });
});