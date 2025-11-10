# 发布扩展到 Open VSX (Cursor 市场)

## 🆚 **问题说明**

你的发现完全正确！VS Code 和 Cursor 使用完全不同的扩展市场：

| 编辑器 | 市场名称 | 网址 | 管理平台 |
|--------|----------|------|----------|
| VS Code | VS Code MarketPlace | https://marketplace.visualstudio.com/ | 微软官方 |
| Cursor | Open VSX Registry | https://open-vsx.org/ | Eclipse Foundation |

## 🔍 **为什么你的扩展在 Cursor 中搜不到**

- ✅ **VS Code**: 你发布到了 `marketplace.visualstudio.com`
- ❌ **Cursor**: 它从 `open-vsx.org` 获取扩展数据
- **结果**: VS Code 市场的扩展不会自动同步到 Open VSX

## 🛠️ **发布到 Open VSX 的方法**

### 方法 1：使用 vsce 命令（推荐）

```bash
# 1. 安装 Open VSX CLI 工具
npm install -g @ovsx/cli

# 2. 登录 Open VSX（需要先注册）
# 访问 https://open-vsx.org/account
# 创建账号并设置 Personal Access Token

# 3. 登录
ovsx login your-publisher-name

# 4. 发布扩展
ovsx publish
```

### 方法 2：使用 VSCode 命令

```bash
# 直接使用 vsce 发布到 Open VSX
npx @open-vsx/vsce-ovsx publish
```

### 方法 3：手动上传

1. **注册 Open VSX 账号**：
   - 访问：https://open-vsx.org/account
   - 使用 GitHub/Google 账号登录

2. **创建 Publisher**：
   - 在 https://open-vsx.org/publishers 页面
   - 创建名为 "plz" 的 publisher

3. **上传 VSIX 文件**：
   - 在 publisher 页面选择 "New Extension"
   - 上传你生成的 `smart-backspace-empty-line-0.0.3.vsix`

## 📋 **详细步骤指南**

### 步骤 1：注册 Open VSX 账号

1. 访问 https://open-vsx.org/account
2. 点击 "Login" 或 "Register"
3. 选择登录方式（推荐使用 GitHub）
4. 完成账号设置

### 步骤 2：创建 Publisher

1. 访问 https://open-vsx.org/publishers
2. 点击 "Create Publisher"
3. 填写信息：
   - **Name**: `plz` (与 VS Code 市场保持一致)
   - **Email**: 你的邮箱
   - **Website**: 可选，建议填写 GitHub 页面

### 步骤 3：发布扩展

#### 方式 A：使用网页上传
1. 访问 https://open-vsx.org/publishers/plz/extensions
2. 点击 "New Extension"
3. 上传文件：选择 `smart-backspace-empty-line-0.0.3.vsix`
4. 填写扩展信息：
   - **Name**: smart-backspace-empty-line
   - **Version**: 0.0.3
   - **Description**: Smart backspace for empty lines - like PhpStorm/IntelliJ behavior
5. 点击 "Publish"

#### 方式 B：使用命令行
```bash
# 安装 CLI 工具
npm install -g ovsx

# 登录
ovsx login plz

# 发布
ovsx publish smart-backspace-empty-line-0.0.3.vsix
```

## ⏱️ **发布后等待时间**

- **Open VSX 同步**: 10-30 分钟
- **Cursor 市场同步**: 1-2 小时
- **搜索索引更新**: 2-4 小时

## 🔍 **验证发布结果**

### 检查 Open VSX
1. 访问：https://open-vsx.org/extension/plz/smart-backspace-empty-line
2. 确认扩展已发布

### 检查 Cursor
1. 打开 Cursor
2. 扩展面板搜索："@plz" 或 "Smart Backspace Empty Line"
3. 确认扩展可见并可安装

## 📊 **对比表**

| 特性 | VS Code Market | Open VSX (Cursor) |
|------|----------------|-------------------|
| 网址 | marketplace.visualstudio.com | open-vsx.org |
| 管理 | 微软官方 | Eclipse Foundation |
| 发布要求 | Microsoft 账号 | Open VSX 账号 |
| API 兼容性 | VS Code 专用 | 跨平台兼容 |
| 审核时间 | 5-30 分钟 | 10-30 分钟 |
| 搜索延迟 | 即时 | 1-2 小时 |

## 🚨 **重要提醒**

### 账号独立性
- VS Code 市场的 Publisher 账号和 Open VSX 是独立的
- 你需要分别管理两个市场
- 建议使用相同的 Publisher 名称 "plz"

### 版本同步
- 两个市场不会自动同步
- 需要分别发布每个版本
- 建议保持版本号一致

## 💡 **最佳实践**

1. **首先发布到 VS Code 市场**（你已经完成）
2. **然后发布到 Open VSX**（当前任务）
3. **保持两个市场的版本同步**
4. **使用相同的 Publisher 名称**
5. **测试兼容性**

## 🔗 **相关链接**

- [Open VSX 官网](https://open-vsx.org/)
- [Open VSX 发布指南](https://github.com/eclipse/openvsx/wiki)
- [vsce CLI 文档](https://github.com/microsoft/vscode-vsce)
- [扩展兼容性检查](https://code.visualstudio.com/api/references/extension-guidelines)

## 🎯 **下一步行动**

1. 注册 Open VSX 账号
2. 创建 "plz" Publisher
3. 上传扩展 VSIX 文件
4. 等待 Cursor 市场同步
5. 测试安装和功能

你的扩展很快就能在 Cursor 中正常工作了！🚀
