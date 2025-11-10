# 🚀 VS Code 和 Cursor 扩展发布快速参考

## ⚡ **核心信息速查表**

| 平台 | 市场网址 | CLI 工具 | 关键配置 |
|------|----------|----------|----------|
| **VS Code** | https://marketplace.visualstudio.com/ | `vsce` | `"engines": { "vscode": "^1.80.0" }` |
| **Cursor** | https://open-vsx.org/ | `ovsx` | `"cursor": ">=0.1.0"` + "cursor" 关键词 |

---

## 🔧 **VS Code 快速发布**

### **一键命令**
```bash
# 1. 编译
npm run compile

# 2. 登录
vsce login your-publisher-name

# 3. 发布
vsce publish
```

### **必要配置**
```json
{
  "publisher": "your-name",
  "engines": {
    "vscode": "^1.80.0"
  }
}
```

### **常见错误**
- `README.md 未编辑` → 替换默认内容
- `Missing publisher` → 添加 `"publisher": "your-name"`
- `Token 权限不足` → 重新创建 PAT，选择 "All scopes"

---

## 🎯 **Cursor 快速发布**

### **一键命令**
```bash
# 1. 登录
ovsx login your-publisher-name

# 2. 发布
ovsx publish
```

### **必要配置**
```json
{
  "engines": {
    "vscode": "^1.80.0",
    "cursor": ">=0.1.0"
  },
  "keywords": [
    "cursor",     // 必须！
    "vscode"      // 必须！
  ]
}
```

### **网页上传备选方案**
1. 访问：https://open-vsx.org/account
2. 创建账号并创建 Publisher "your-name"
3. 上传 VSIX 文件

---

## 📦 **打包命令**

```bash
# 打包 VSIX 文件
vsce package

# 文件位置
smart-backspace-empty-line-0.0.3.vsix
```

---

## 🔍 **验证发布结果**

### **VS Code**
- 访问：https://marketplace.visualstudio.com/items?itemName=your-publisher.your-extension
- 扩展面板搜索：`@your-publisher`

### **Cursor**
- 访问：https://open-vsx.org/extension/your-publisher/your-extension
- 等待 1-2 小时后，Cursor 扩展面板搜索：`@your-publisher`

---

## ⚠️ **关键注意事项**

### **版本同步**
- 保持两个市场版本号一致
- 建议使用相同的更新日志

### **兼容性检查**
- 使用标准 VS Code API
- 避免实验性功能
- 在两个平台测试功能

### **关键词优化**
- 必须包含 "cursor" 和 "vscode"
- 添加相关功能关键词
- 提高搜索发现性

---

## 🆘 **紧急问题解决**

### **发布失败**
```bash
# 检查登录状态
vsce whoami
ovsx whoami

# 重新登录
vsce login --pat <your-token>
ovsx login --pat <your-token>
```

### **扩展搜不到**
- VS Code: 等待 5-30 分钟
- Cursor: 等待 1-2 小时，或手动安装 VSIX

### **功能异常**
- 检查引擎配置
- 重新编译：`npm run compile`
- 清除缓存重新安装

---

## 📋 **发布前必检清单**

- [ ] 代码编译无错误
- [ ] README.md 已编辑
- [ ] 引擎配置正确
- [ ] 关键词包含 "cursor" 和 "vscode"
- [ ] VSIX 文件生成成功
- [ ] 两个市场的 publisher 名称一致

---

## 🔗 **常用链接**

| 用途 | 链接 |
|------|------|
| VS Code 市场 | https://marketplace.visualstudio.com/ |
| Open VSX | https://open-vsx.org/ |
| VS Code 发布指南 | https://code.visualstudio.com/api/working-with-extensions/publishing-extension |
| Open VSX 发布指南 | https://github.com/eclipse/openvsx/wiki |

**保存此文档作为发布时的快速参考！** 📌
