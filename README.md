# Smart Editing Tools

[![Version](https://img.shields.io/badge/version-0.0.5-blue.svg)](https://marketplace.visualstudio.com/items?itemName=plz.smart-backspace-empty-line)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.80+-green.svg)](https://code.visualstudio.com/)
[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)

智能编辑工具扩展，为VS Code和Cursor提供类似PhpStorm/IntelliJ的智能退格和自动保存功能。

## ✨ 功能特性

### 🚀 一键删除空白行
- **单键操作**：按一次退格键直接删除空白行，无需双击
- **智能定位**：根据前一行内容自动选择最佳光标位置
- **保持结构**：自动保持代码的缩进层次结构

### 💾 自动保存（新功能）
- **PHPStorm风格**：文件改动后自动保存，无需手动Ctrl+S
- **防抖设计**：停止输入后延迟触发，避免频繁保存
- **状态栏显示**：实时显示自动保存状态
- **一键切换**：点击状态栏图标即可启用/禁用

### 🎯 智能行为
- **空白行前是代码**：删除空白行，光标定位到上一行末尾
- **空白行前是空行**：删除空白行，光标定位到上一行缩进位置
- **非空白行**：保持默认退格行为

### 🛠️ 极简设计
- **零学习成本**：符合直觉的操作方式
- **高稳定性**：简化的逻辑，极低的出错概率
- **高性能**：无复杂条件判断，响应迅速

## 📸 效果展示

### 基本用法
```javascript
// 删除前
function example() {
    const message = "Hello";
    
    console.log(message);
}

// 按退格键后
function example() {
    const message = "Hello";
    console.log(message);
}
```

### 连续空行处理
```javascript
// 删除前
function example() {
    const message = "Hello";
    
    
    console.log(message);
}

// 按退格键后
function example() {
    const message = "Hello";
    
    console.log(message);
}
```

## 🚀 安装方法

### 方法1：VS Code/Cursor市场安装
1. 打开VS Code或Cursor
2. 按 `Cmd+Shift+P` 打开命令面板
3. 输入 "Extensions: Install Extensions"
4. 搜索 "Smart Editing Tools"
5. 点击安装

### 方法2：VSIX文件安装
1. 下载扩展的 `.vsix` 文件
2. 在VS Code中按 `Cmd+Shift+P`
3. 输入 "Extensions: Install from VSIX"
4. 选择下载的VSIX文件

### 方法3：开发模式运行
```bash
# 克隆或下载源代码
# 在扩展目录中运行
npm install
npm run compile
# 按F5在VS Code开发窗口中测试
```

## ⌨️ 使用说明

### 基本操作
1. 将光标放在空白行上
2. 按 `Backspace` 键
3. 空白行被自动删除，光标智能定位

### 适用场景
- **代码重构**：快速清理多余的空白行
- **代码整理**：保持良好的代码格式
- **文档编写**：在代码注释间高效编辑
- **日常开发**：提高代码编辑效率

## 🛠️ 技术特性

### 支持的编辑器
- **VS Code** 1.80.0+ 
- **Cursor** 编辑器（任意版本）
- **基于Electron的代码编辑器**（兼容性取决于具体实现）

### 支持的文件类型
- JavaScript/TypeScript
- Python
- HTML/CSS
- Markdown
- JSON
- 以及其他支持空行的文件类型

### 配置选项

#### 智能退格配置
扩展基于内置逻辑工作，无需额外配置：
- 自动检测空白行（仅包含空格、制表符或完全为空）
- 智能分析前一行内容
- 精准计算缩进级别（支持空格和制表符）

#### 自动保存配置
可以通过VS Code/Cursor的设置进行配置：

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `smartBackspace.autoSave.enabled` | 启用/禁用自动保存功能 | `true` |
| `smartBackspace.autoSave.delay` | 停止输入后延迟保存时间（毫秒） | `500` |
| `smartBackspace.autoSave.showNotification` | 保存时在状态栏显示通知 | `false` |

**配置方式：**
1. 打开设置：`Cmd+,`（Mac）或 `Ctrl+,`（Windows/Linux）
2. 搜索 "Smart Editing Tools"
3. 调整相关配置

**快捷切换：**
- 点击状态栏右下角的 "🔄 自动保存" 图标
- 或使用命令面板：`Cmd+Shift+P` → 输入 "Smart Editing Tools: 切换自动保存"

## 🔧 开发信息

### 系统要求
- VS Code 1.80.0 或更高版本
- Cursor 编辑器（任意版本）
- Node.js 16.x 或更高版本（开发环境）

### 本地开发
```bash
# 克隆项目
git clone <repository-url>
cd smart-backspace-empty-line

# 安装依赖
npm install

# 编译TypeScript
npm run compile

# 开发调试
npm run watch  # 实时编译
# 按F5启动调试窗口

# 打包扩展
npm run package  # 或直接使用 vsce package
```

### 项目结构
```
smart-backspace-empty-line/
├── src/
│   ├── extension.ts          # 主扩展逻辑
│   └── test/
│       └── extension.test.ts # 测试文件
├── out/                      # 编译输出目录
├── package.json              # 扩展配置
├── tsconfig.json             # TypeScript配置
├── webpack.config.js         # 打包配置
└── README.md                 # 说明文档
```

## 📋 更新日志

### 0.0.5 (当前版本)
- ✨ 新增自动保存功能，类似PHPStorm的autoSave
- ✅ 文件改动后自动触发保存，无需手动Ctrl+S
- ✅ 添加防抖机制，可配置延迟时间（默认500ms）
- ✅ 状态栏显示自动保存状态
- ✅ 支持一键切换启用/禁用自动保存
- ✅ 添加完整的配置选项

### 0.0.4
- ✅ 代码优化和性能改进

### 0.0.3
- ✅ 修复Cursor扩展市场兼容性问题
- ✅ 添加正确的cursor引擎配置 (">=0.1.0")
- ✅ 优化关键词包含"cursor"以提高搜索发现性
- ✅ 添加完整的作者和仓库元数据
- ✅ 解决旧扩展在Cursor中搜不到的问题

### 0.0.2
- ✅ 添加Cursor兼容性支持
- ✅ 更新引擎配置支持Cursor编辑器
- ✅ 优化扩展在Cursor中的可发现性

### 0.0.1
- ✅ 初始发布
- ✅ 实现单键删除空白行功能
- ✅ 智能光标定位
- ✅ 保持代码结构
- ✅ 支持多种文件类型
- ✅ 极简化用户界面

## 🤝 贡献指南

欢迎提交Issues和Pull Requests来改进这个扩展！

### 开发流程
1. Fork本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢 VS Code 团队提供的优秀开发平台
- 灵感来源于 PhpStorm/IntelliJ 的智能退格功能
- 参考了社区中优秀的扩展开发实践

## 💬 反馈与支持

如果你喜欢这个扩展：
- ⭐ 给我们一个星标
- 🐛 报告发现的bug
- 💡 提出功能建议
- 🤝 贡献代码

---

**享受更智能的代码编辑体验！** 🚀
