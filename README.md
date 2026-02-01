<<<<<<< HEAD
# myblog
A  simple website for me . After my kidney was hurt
=======
# 我的博客 - 个人数字花园

一个采用苹果风格设计的个人博客项目，用于记录生活点滴、分享思考感悟。

## ✨ 特性

- 🎨 **苹果风格设计** - 简洁优雅的界面，玻璃拟态效果
- 🌓 **深色/浅色模式** - 支持系统主题自动切换
- 📱 **响应式设计** - 完美适配移动端、平板和桌面
- ⚡ **性能优化** - 基于 Vite 构建，快速加载
- 🎭 **流畅动画** - 使用 Framer Motion 实现丝滑交互
- ♿ **无障碍支持** - 语义化 HTML，键盘导航支持

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: TailwindCSS
- **动画库**: Framer Motion
- **路由**: React Router
- **图标**: Lucide React

## 📁 项目结构

```
src/
├── components/          # 组件
│   ├── ui/             # 基础 UI 组件
│   ├── layout/         # 布局组件
│   ├── cards/          # 卡片组件
│   └── common/         # 通用组件
├── pages/              # 页面组件
├── hooks/              # 自定义 Hooks
├── services/           # API 服务层
├── types/              # TypeScript 类型定义
├── utils/              # 工具函数
├── data/               # 模拟数据
└── mocks/              # Mock 服务
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📄 页面说明

### 🏠 首页 (/)
- 卡片式仪表板设计
- 展示最新文章、照片预览、统计信息
- 最近动态时间线

### 📝 日记页面 (/journal)
- 文章列表展示
- 分类筛选功能
- 心情标签和阅读时间

### 📸 相册页面 (/gallery)
- 瀑布流照片展示
- 相册分类筛选
- 照片详情模态框

### 👤 关于页面 (/about)
- 个人介绍和技能展示
- 兴趣爱好标签
- 个人时间线

## 🎨 设计系统

### 颜色方案
- **主色调**: 蓝色系 (primary-500: #0ea5e9)
- **中性色**: 灰色系，支持深色模式
- **玻璃效果**: 半透明背景 + 模糊效果

### 字体
- **无衬线字体**: -apple-system, SF Pro Display
- **等宽字体**: SF Mono, Monaco

### 动画
- **缓动函数**: ease-out, spring
- **持续时间**: 200-600ms
- **交互反馈**: hover, tap, focus 状态

## 🔧 扩展指南

### 添加新页面

1. 在 `src/pages/` 创建新的页面组件
2. 在 `src/App.tsx` 中添加路由
3. 在导航组件中添加菜单项

### 添加新的内容模块

1. 在 `src/types/` 中定义数据类型
2. 在 `src/components/cards/` 创建对应的卡片组件
3. 在首页仪表板中集成新模块

### 替换 Mock API

1. 在 `src/services/` 中创建真实的 API 服务
2. 替换组件中的 mock 数据调用
3. 更新 TypeScript 类型定义

## 📱 响应式断点

- **移动端**: < 768px
- **平板**: 768px - 1024px
- **桌面**: > 1024px

## 🌐 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 📝 开发规范

### 组件命名
- 使用 PascalCase
- 文件名与组件名保持一致

### 样式规范
- 优先使用 TailwindCSS 类名
- 自定义样式放在 `@layer components`
- 响应式优先的设计方法

### TypeScript
- 严格模式开启
- 为所有 props 定义接口
- 使用类型推导减少冗余

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**享受编码，记录生活！** ✨
>>>>>>> ab8c759 (feat: 初始化苹果风格个人博客项目)
