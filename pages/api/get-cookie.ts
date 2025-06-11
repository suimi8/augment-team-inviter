import { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentCookie } from '../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 只允许GET请求
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: '只支持GET请求' });
  }

  try {
    // 获取当前Cookie值
    const cookie = getCurrentCookie();

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