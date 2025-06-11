import { NextApiRequest, NextApiResponse } from 'next';
import { updateCookie } from '../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '只支持POST请求' });
  }

  try {
    console.log('收到更新Cookie请求:', req.body);

    const { cookie } = req.body;

    // 验证请求体中是否包含cookie
    if (!cookie || typeof cookie !== 'string') {
      console.log('Cookie参数验证失败:', { cookie, type: typeof cookie });
      return res.status(400).json({ success: false, message: 'cookie参数缺失或格式不正确' });
    }

    // 更新Cookie
    console.log('正在更新Cookie...');
    updateCookie(cookie);
    console.log('Cookie更新完成');

    // 返回成功响应
    return res.status(200).json({
      success: true,
      message: 'Cookie更新成功'
    });
  } catch (error) {
    console.error('更新Cookie时出错:', error);
    return res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}