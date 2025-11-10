# VS Code 和 Cursor 扩展发布完整指南

## 📋 **目录**
1. [市场差异概述](#市场差异概述)
2. [VS Code 市场发布](#vs-code-市场发布)
3. [Cursor 市场发布](#cursor-市场发布)
4. [版本管理策略](#版本管理策略)
5. [常见问题解决](#常见问题解决)
6. [最佳实践](#最佳实践)
7. [发布检查清单](#发布检查清单)

---

## 🏪 **市场差异概述**

### **主要市场对比**

| 特性 | VS Code 市场 | Cursor 市场 |
|------|-------------|-------------|
| **网址** | https://marketplace.visualstudio.com/ | https://open-vsx.org/ |
| **管理方** | 微软官方 | Eclipse Foundation |
| **目标用户** | VS Code 用户 | Cursor 用户 |
| **扩展格式** | VSIX | VSIX |
| **API 兼容性** | VS Code 专用 | 跨平台兼容 |
| **审核流程** | 自动化 + 人工审核 | 自动化审核 |
| **同步时间** | 5-30 分钟 | 10-30 分钟 |

### **为什么需要两个市场**
- **VS Code**: 微软生态系统，为 VS Code 优化
- **Cursor**: 基于 Open VSX，支持多种编辑器（Cursor、VSCodium 等）
- **独立发展**: 两个平台并行发展，各有特色

---

## 🚀 **VS Code 市场发布**

### **准备工作**
```bash
# 确保代码编译无错误
npm run compile

# 运行测试（可选但推荐）
npm test

# 代码质量检查
npm run lint
```

### **1. 配置 package.json**
```json
{
  "name": "your-extension-name",
  "displayName": "Your Extension Display Name",
  "description": "Extension description",
  "version": "0.0.1",
  "publisher": "your-publisher-name",
  "author": {
    "name": "Your Name"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/username/extension-repo.git"
  },
  "engines": {
    "vscode": "^1.80.0"
  },
  "categories": ["Other"],
  "keywords": [
    "keyword1",
    "keyword2",
    "vscode"
  ],
  "activationEvents": [
    "onCommand:yourCommand"
  ],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "yourCommand",
        "title": "Your Command Title"
      }
    ]
  }
}
```

### **2. 创建 README.md**
- 必须包含详细的功能介绍
- 添加安装和使用说明
- 包含截图（可选）
- 添加更新日志

### **3. 配置 .vscodeignore**
```gitignore
.vscode/**
.vscode-test/**
out/test/**
node_modules/**
src/**
.gitignore
.yarnrc
webpack.config.js
vsc-extension-quickstart.md
**/tsconfig.json
**/eslint.config.mjs
**/*.map
**/*.ts
```

### **4. 登录和发布**

#### **安装 vsce CLI**
```bash
# 全局安装
npm install -g @vscode/vsce

# 或使用 npx
npx vsce --version
```

#### **创建 Personal Access Token**
1. 访问：https://dev.azure.com/
2. 登录你的 Microsoft 账号
3. 右上角 → Personal Access Tokens
4. 点击 "+ New Token"
5. 填写信息：
   - **Name**: VSCode Marketplace Token
   - **Scopes**: All scopes (或选择 Marketplace: Manage)
   - **Expiration**: 根据需要设置

#### **发布命令**
```bash
# 登录
vsce login your-publisher-name

# 发布新版本
vsce publish

# 打包为 VSIX 文件
vsce package
```

### **5. 发布选项**

#### **立即发布**
```bash
# 发布当前版本
vsce publish
```

#### **发布指定版本**
```bash
# 发布特定版本
vsce publish 0.1.0
```

#### **发布到特定市场**
```bash
# VS Code 市场（默认）
vsce publish

# 如果需要发布到其他市场，使用 --target
vsce publish --target "default"
```

---

## 🎯 **Cursor 市场发布**

### **Cursor 市场的特殊性**
- **技术基础**: Open VSX Registry
- **兼容性**: 支持 VS Code 扩展格式
- **要求**: 需要明确的引擎配置

### **1. 配置 Cursor 兼容性**

#### **package.json 引擎配置**
```json
{
  "engines": {
    "vscode": "^1.80.0",
    "cursor": ">=0.1.0"  // 重要！声明 Cursor 兼容性
  },
  "keywords": [
    "cursor",     // 重要！包含 "cursor" 关键词
    "vscode",
    "your-feature"
  ]
}
```

#### **完整的兼容性配置**
```json
{
  "name": "your-extension-name",
  "displayName": "Your Extension Display Name",
  "description": "Extension description for both VS Code and Cursor",
  "version": "0.0.1",
  "publisher": "your-publisher-name",
  "author": {
    "name": "Your Name"
  },
  "engines": {
    "vscode": "^1.80.0",
    "cursor": ">=0.1.0"
  },
  "categories": ["Other"],
  "keywords": [
    "cursor",           // 必须包含
    "vscode",           // 必须包含
    "smart",
    "backspace",
    "empty",
    "line"
  ]
}
```

### **2. Open VSX 发布方法**

#### **方法 A：网页上传（推荐新手）**

1. **注册 Open VSX 账号**
   ```
   https://open-vsx.org/account
   ```
   - 使用 GitHub 账号登录
   - 完成账号验证

2. **创建 Publisher**
   ```
   https://open-vsx.org/publishers
   ```
   - 点击 "Create Publisher"
   - 填写信息：
     ```
     Name: your-publisher-name (与 VS Code 保持一致)
     Email: your-email@example.com
     Website: https://github.com/username/extension-repo
     ```

3. **上传扩展**
   ```
   https://open-vsx.org/publishers/your-publisher-name/extensions
   ```
   - 点击 "New Extension"
   - 拖拽上传 VSIX 文件
   - 确认发布信息
   - 点击 "Publish"

#### **方法 B：命令行发布（推荐）**

1. **安装 Open VSX CLI**
   ```bash
   # 全局安装
   npm install -g ovsx
   
   # 或使用 npx
   npx ovsx --version
   ```

2. **创建 Personal Access Token**
   - 访问：https://open-vsx.org/account
   - 进入 Personal Access Tokens 页面
   - 点击 "Create Token"
   - 设置权限：All scopes
   - 保存生成的 token

3. **登录和发布**
   ```bash
   # 登录
   ovsx login your-publisher-name
   
   # 发布
   ovsx publish
   
   # 或发布指定文件
   ovsx publish your-extension-0.0.1.vsix
   ```

### **3. 验证发布**

#### **检查 Open VSX**
```
https://open-vsx.org/extension/your-publisher-name/your-extension-name
```

#### **检查 Cursor 市场同步**
- 打开 Cursor 编辑器
- 扩展面板搜索：`@your-publisher-name` 或 "Your Extension Name"
- 等待 1-2 小时进行市场同步

---

## 🔄 **版本管理策略**

### **版本号规范**
- **主版本号**: 重大功能变更
- **次版本号**: 新功能添加
- **修订版本号**: Bug 修复和小改进

### **发布策略**

#### **并行发布**
```bash
# 同时发布到两个市场
# 1. VS Code
vsce publish 0.1.0

# 2. Open VSX
ovsx publish 0.1.0
```

#### **顺序发布**
1. **首先发布到 VS Code**（更快的审核）
2. **验证功能正常**
3. **然后发布到 Open VSX**
4. **测试两个平台兼容性**

### **版本同步建议**
- 保持两个市场的版本号一致
- 使用相同的更新日志
- 同时发布修复和改进

---

## ⚠️ **常见问题解决**

### **VS Code 发布问题**

#### **问题 1: README.md 未编辑**
```
ERROR: Make sure to edit the README.md file before you package or publish your extension.
```
**解决**: 替换默认 README.md 内容

#### **问题 2: 缺少 publisher 字段**
```
ERROR: Missing publisher name.
```
**解决**: 在 package.json 中添加 `"publisher": "your-name"`

#### **问题 3: Personal Access Token 权限不足**
```
ERROR: The Personal Access Token verification has failed.
```
**解决**: 
- 重新创建 token，确保勾选 "Marketplace: Manage"
- 或选择 "All scopes"

#### **问题 4: .vscodeignore 排除必要文件**
```
ERROR: Extension entrypoint(s) missing.
```
**解决**: 移除 `.vscodeignore` 中的 `out/**` 排除规则

### **Cursor 发布问题**

#### **问题 1: 扩展在 Cursor 中搜不到**
**原因**: 未发布到 Open VSX
**解决**: 按照上述方法发布到 Open VSX

#### **问题 2: Open VSX 同步延迟**
**现象**: 发布成功但搜索不到
**解决**: 等待 1-2 小时，或使用直接链接安装

#### **问题 3: 兼容性错误**
**现象**: 安装后功能异常
**解决**: 
- 检查引擎配置
- 确保使用标准 VS Code API
- 添加 `cursor` 关键词

### **通用问题**

#### **问题 1: 编译错误**
```bash
# 解决: 修复代码错误后重新编译
npm run compile
```

#### **问题 2: 权限问题**
```bash
# 解决: 清理缓存重新安装
rm -rf node_modules package-lock.json
npm install
npm run compile
```

#### **问题 3: 发布失败**
```bash
# 解决: 检查网络和凭据
vsce login --help
ovsx login --help
```

---

## 💡 **最佳实践**

### **开发阶段**
1. **使用模板**: 基于官方的 Yo Code 生成器
2. **测试驱动**: 在发布前进行充分测试
3. **代码质量**: 使用 ESLint 和 Prettier
4. **文档完善**: 详细的 README 和使用说明

### **发布阶段**
1. **版本控制**: 使用 Git 标签管理版本
2. **测试发布**: 先发布 beta 版本
3. **监控系统**: 关注错误报告和用户反馈
4. **快速响应**: 及时修复关键问题

### **维护阶段**
1. **定期更新**: 保持与新版本 VS Code/Cursor 兼容
2. **用户反馈**: 积极回应 Issues 和评论
3. **功能改进**: 根据用户需求持续优化
4. **安全更新**: 及时修复安全漏洞

---

## 📝 **发布检查清单**

### **发布前检查**
- [ ] 代码编译无错误
- [ ] 测试通过
- [ ] README.md 已编辑
- [ ] LICENSE 文件已添加
- [ ] package.json 配置正确
- [ ] .vscodeignore 配置正确
- [ ] 版本号已更新

### **VS Code 发布检查**
- [ ] Personal Access Token 已创建
- [ ] vsce CLI 已安装
- [ ] 登录验证成功
- [ ] 扩展已发布到 marketplace.visualstudio.com
- [ ] 市场页面显示正常

### **Cursor 发布检查**
- [ ] Open VSX 账号已注册
- [ ] Publisher 已创建
- [ ] 引擎配置包含 cursor 字段
- [ ] 关键词包含 "cursor"
- [ ] 扩展已发布到 open-vsx.org
- [ ] 扩展页面显示正常

### **发布后验证**
- [ ] VS Code 市场可搜索
- [ ] Cursor 市场可搜索
- [ ] 扩展安装测试通过
- [ ] 基本功能测试通过
- [ ] 错误监控已设置

---

## 🔗 **相关链接**

### **官方资源**
- [VS Code 扩展开发文档](https://code.visualstudio.com/api)
- [VS Code 扩展发布指南](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Open VSX 发布指南](https://github.com/eclipse/openvsx/wiki)
- [vsce CLI 文档](https://github.com/microsoft/vscode-vsce)

### **工具和资源**
- [VS Code Extension Generator](https://github.com/microsoft/vscode-extension-generator)
- [Open VSX CLI 工具](https://www.npmjs.com/package/ovsx)
- [VSIX 格式说明](https://code.visualstudio.com/api/references/extension-manifest)

### **社区资源**
- [VS Code 扩展市场](https://marketplace.visualstudio.com/)
- [Open VSX 注册表](https://open-vsx.org/)
- [Extension Test Runner](https://github.com/microsoft/vscode-test)

---

## 🎯 **总结**

发布扩展到 VS Code 和 Cursor 需要：

1. **理解两个市场的差异**
2. **配置正确的兼容性设置**
3. **分别进行发布操作**
4. **保持版本同步更新**

遵循这个指南，你应该能够成功将扩展发布到两个平台，并为用户提供一致的体验！

**开始你的扩展发布之旅吧！** 🚀
