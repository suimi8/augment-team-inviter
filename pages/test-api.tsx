import { useState } from 'react';
import Head from 'next/head';

export default function TestAPI() {
  const [cookieValue, setCookieValue] = useState('');
  const [currentCookie, setCurrentCookie] = useState('');
  const [updateResult, setUpdateResult] = useState('');
  const [getResult, setGetResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testUpdateCookie = async () => {
    if (!cookieValue.trim()) {
      setUpdateResult('请输入 Cookie 值');
      return;
    }

    setLoading(true);
    setUpdateResult('正在更新...');

    try {
      const response = await fetch('/api/update-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cookie: cookieValue
        })
      });

      const result = await response.json();
      
      setUpdateResult(`
        状态码: ${response.status}
        响应: ${JSON.stringify(result, null, 2)}
      `);
    } catch (error) {
      setUpdateResult(`错误: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testGetCookie = async () => {
    setLoading(true);
    setGetResult('正在获取...');

    try {
      const response = await fetch('/api/get-cookie');
      const result = await response.json();
      
      setGetResult(`
        状态码: ${response.status}
        响应: ${JSON.stringify(result, null, 2)}
      `);
      
      if (result.success && result.cookie) {
        setCurrentCookie(result.cookie);
      }
    } catch (error) {
      setGetResult(`错误: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Head>
        <title>API 测试页面</title>
      </Head>

      <h1>Cookie API 测试页面</h1>

      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>测试更新 Cookie</h2>
        <div style={{ marginBottom: '10px' }}>
          <label>Cookie 值:</label>
          <br />
          <textarea
            value={cookieValue}
            onChange={(e) => setCookieValue(e.target.value)}
            placeholder="输入新的 Cookie 值"
            style={{ width: '100%', height: '100px', marginTop: '5px' }}
          />
        </div>
        <button 
          onClick={testUpdateCookie} 
          disabled={loading}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px' }}
        >
          {loading ? '处理中...' : '更新 Cookie'}
        </button>
        
        {updateResult && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '3px' }}>
            <strong>更新结果:</strong>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>{updateResult}</pre>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2>测试获取 Cookie</h2>
        <button 
          onClick={testGetCookie} 
          disabled={loading}
          style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px' }}
        >
          {loading ? '处理中...' : '获取 Cookie'}
        </button>
        
        {getResult && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '3px' }}>
            <strong>获取结果:</strong>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>{getResult}</pre>
          </div>
        )}
      </div>

      {currentCookie && (
        <div style={{ padding: '20px', border: '1px solid #28a745', borderRadius: '5px', backgroundColor: '#d4edda' }}>
          <h3>当前 Cookie 值:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px', wordBreak: 'break-all' }}>
            {currentCookie}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h3>使用说明:</h3>
        <ol>
          <li>在上面的文本框中输入您的 Cookie 值</li>
          <li>点击"更新 Cookie"按钮测试更新功能</li>
          <li>点击"获取 Cookie"按钮测试获取功能</li>
          <li>查看响应结果，确认 API 是否正常工作</li>
        </ol>
      </div>
    </div>
  );
}
