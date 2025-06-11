import { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentCookie } from '../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许GET请求
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: '只支持GET请求' });
  }

  try {
    console.log('收到获取Cookie请求');

    // 获取当前Cookie值
    const cookie = getCurrentCookie();
    console.log('获取到Cookie:', cookie ? '***已设置***' : '未设置');

    // 返回成功响应
    return res.status(200).json({
      success: true,
      cookie: cookie
    });
  } catch (error) {
    console.error('获取Cookie时出错:', error);
    return res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}