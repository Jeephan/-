const axios = require('axios');

// 基础URL
const baseURL = 'http://localhost:3000/api';

// 测试用户API
async function testUserAPI() {
  console.log('开始测试用户API...');
  let token = null;
  
  // 测试微信登录API
  try {
    console.log('\n测试微信登录API...');
    const loginData = {
      openid: 'test_openid_' + Date.now(),
      userInfo: {
        nickName: '测试用户',
        avatarUrl: 'https://example.com/avatar.jpg'
      }
    };
    
    const response = await axios.post(`${baseURL}/users/wxlogin`, loginData);
    console.log('✅ 微信登录API测试成功');
    console.log('响应状态码:', response.status);
    console.log('响应数据:', response.data);
    
    // 保存token用于后续测试
    if (response.data && response.data.token) {
      token = response.data.token;
      console.log('获取到token:', token);
    }
  } catch (error) {
    console.error('❌ 微信登录API测试失败:', error.message);
    if (error.response) {
      console.error('响应状态码:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
  }
  
  // 测试获取用户信息API
  if (token) {
    try {
      console.log('\n测试获取用户信息API...');
      const response = await axios.get(`${baseURL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('✅ 获取用户信息API测试成功');
      console.log('响应状态码:', response.status);
      console.log('响应数据:', response.data);
    } catch (error) {
      console.error('❌ 获取用户信息API测试失败:', error.message);
      if (error.response) {
        console.error('响应状态码:', error.response.status);
        console.error('响应数据:', error.response.data);
      }
    }
  } else {
    console.log('⚠️ 由于未获取到token，跳过获取用户信息API测试');
  }
}

// 执行测试
testUserAPI();