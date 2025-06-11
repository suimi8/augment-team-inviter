# AugmentCode Team Inviter Web Application

这是一个用于管理AugmentCode团队邀请的Web应用程序。它允许您发送邀请给团队成员并管理待处理的邀请。

## 功能特性

- 一次性向多个电子邮件地址发送邀请
- 查看和管理待处理的邀请
- 删除邀请
- 响应式设计
- 通过API动态更新认证Cookie

## 技术栈

- Next.js (React框架)
- TypeScript
- Axios用于API请求
- React Toastify用于通知
- Vercel用于部署

## 快速开始

### 前提条件

- Node.js 14.x或更高版本
- npm或yarn

### 安装

1. 克隆仓库
   ```
   git clone https://github.com/yourusername/augment-team-manage.git
   cd augment-team-manage/vercel
   ```

2. 安装依赖:
   ```
   npm install
   ```
   或
   ```
   yarn
   ```

3. 更新`/lib/api.ts`中的默认Cookie值:
   ```typescript
   // 替换为您的实际Cookie值
   const DEFAULT_COOKIE = 'YOUR_ACTUAL_COOKIE_VALUE_HERE';
   ```

### 开发

运行开发服务器:

```
npm run dev
```
或
```
yarn dev
```

在浏览器中打开[http://localhost:3000](http://localhost:3000)查看应用程序。

### 构建生产版本

构建应用程序:

```
npm run build
```
或
```
yarn build
```

## 部署到GitHub和Vercel

### GitHub部署

1. 在GitHub上创建一个新的仓库

2. 初始化本地Git仓库并推送到GitHub:
   ```
   git init
   git add .
   git commit -m "初始提交"
   git branch -M main
   git remote add origin https://github.com/yourusername/augment-team-manage.git
   git push -u origin main
   ```

### Vercel部署

1. 登录[Vercel](https://vercel.com/)

2. 点击"New Project"

3. 导入您的GitHub仓库

4. 配置项目:
   - 框架预设: Next.js
   - 根目录: `vercel`
   - 构建命令: `npm run build`
   - 输出目录: `.next`

5. 点击"Deploy"

6. 部署完成后，您可以通过分配的域名访问您的应用程序

## Cookie管理

本应用程序提供了API端点来动态管理认证Cookie:

### API端点

- `/api/update-cookie` - POST: 更新认证Cookie
  ```javascript
  // 使用示例
  fetch('/api/update-cookie', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cookie: '新的Cookie值' })
  });
  ```

- `/api/get-cookie` - GET: 获取当前认证Cookie
  ```javascript
  // 使用示例
  fetch('/api/get-cookie')
    .then(response => response.json())
    .then(data => console.log(data.cookie));
  ```

- `/api/team` - GET: 获取团队数据和待处理的邀请
- `/api/invite` - POST: 向新团队成员发送邀请
- `/api/delete-invite` - DELETE: 删除待处理的邀请

## Cookie持久化

- 在客户端，Cookie存储在localStorage中
- 在服务器端，Cookie存储在内存中，对于每个服务器实例保持一致
- 通过API端点可以在客户端和服务器端之间同步Cookie值

## 许可证

该项目采用MIT许可证。 