# 📚 扩展发布文档索引

## 📋 **文档列表**

| 文档名称 | 用途 | 适用场景 |
|----------|------|----------|
| **[COMPLETE_PUBLISHING_GUIDE.md](COMPLETE_PUBLISHING_GUIDE.md)** | 详细完整指南 | 首次发布、遇到问题、深度学习 |
| **[QUICK_PUBLISHING_REFERENCE.md](QUICK_PUBLISHING_REFERENCE.md)** | 快速参考手册 | 日常发布、快速查阅、问题排查 |
| **[PUBLISH_TO_OPEN_VSX.md](PUBLISH_TO_OPEN_VSX.md)** | Open VSX 专项指南 | Cursor 市场发布、Open VSX 平台 |
| **[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)** | 安装使用指南 | 用户安装、测试功能 |
| **[CURSOR_COMPATIBILITY.md](CURSOR_COMPATIBILITY.md)** | Cursor 兼容性指南 | 解决 Cursor 兼容性问题 |
| **[QUICK_SETUP.md](QUICK_SETUP.md)** | 5分钟快速开始 | 立即开始发布流程 |

---

## 🎯 **使用场景指南**

### **首次发布扩展**
1. **阅读**：[COMPLETE_PUBLISHING_GUIDE.md](COMPLETE_PUBLISHING_GUIDE.md)
2. **参考**：[QUICK_PUBLISHING_REFERENCE.md](QUICK_PUBLISHING_REFERENCE.md)
3. **执行**：按照步骤操作

### **发布到 VS Code 市场**
- **详细步骤**：[COMPLETE_PUBLISHING_GUIDE.md - VS Code 市场发布](COMPLETE_PUBLISHING_GUIDE.md#vs-code-市场发布)
- **快速操作**：[QUICK_PUBLISHING_REFERENCE.md - VS Code 快速发布](QUICK_PUBLISHING_REFERENCE.md#vs-code-快速发布)

### **发布到 Cursor 市场**
- **详细指南**：[PUBLISH_TO_OPEN_VSX.md](PUBLISH_TO_OPEN_VSX.md)
- **兼容性解决**：[CURSOR_COMPATIBILITY.md](CURSOR_COMPATIBILITY.md)
- **快速操作**：[QUICK_PUBLISHING_REFERENCE.md - Cursor 快速发布](QUICK_PUBLISHING_REFERENCE.md#cursor-快速发布)

### **遇到发布问题**
1. **错误排查**：[QUICK_PUBLISHING_REFERENCE.md - 紧急问题解决](QUICK_PUBLISHING_REFERENCE.md#紧急问题解决)
2. **详细解决方案**：[COMPLETE_PUBLISHING_GUIDE.md - 常见问题解决](COMPLETE_PUBLISHING_GUIDE.md#常见问题解决)
3. **兼容性专项**：[CURSOR_COMPATIBILITY.md](CURSOR_COMPATIBILITY.md)

### **用户安装扩展**
- **提供链接**：[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)
- **快速安装**：[QUICK_SETUP.md](QUICK_SETUP.md)

---

## 🔍 **问题快速定位**

### **扩展在 Cursor 中搜不到**
- [CURSOR_COMPATIBILITY.md](CURSOR_COMPATIBILITY.md)
- [PUBLISH_TO_OPEN_VSX.md](PUBLISH_TO_OPEN_VSX.md)
- [QUICK_PUBLISHING_REFERENCE.md - Cursor 快速发布](QUICK_PUBLISHING_REFERENCE.md#cursor-快速发布)

### **VS Code 发布失败**
- [QUICK_PUBLISHING_REFERENCE.md - VS Code 快速发布](QUICK_PUBLISHING_REFERENCE.md#vs-code-快速发布)
- [COMPLETE_PUBLISHING_GUIDE.md - VS Code 发布问题](COMPLETE_PUBLISHING_GUIDE.md#vs-code-发布问题)

### **配置不兼容**
- [CURSOR_COMPATIBILITY.md](CURSOR_COMPATIBILITY.md)
- [COMPLETE_PUBLISHING_GUIDE.md - Cursor 兼容性配置](COMPLETE_PUBLISHING_GUIDE.md#cursor-市场发布)

### **版本管理**
- [COMPLETE_PUBLISHING_GUIDE.md - 版本管理策略](COMPLETE_PUBLISHING_GUIDE.md#版本管理策略)

---

## 📱 **移动端快速参考**

### **VS Code 发布命令**
```bash
npm run compile && vsce login your-name && vsce publish
```

### **Cursor 发布命令**
```bash
ovsx login your-name && ovsx publish
```

### **关键配置**
```json
{
  "engines": {
    "vscode": "^1.80.0",
    "cursor": ">=0.1.0"
  },
  "keywords": ["cursor", "vscode"]
}
```

---

## 🔗 **外部链接快速访问**

| 服务 | 直接链接 |
|------|----------|
| **VS Code 市场** | https://marketplace.visualstudio.com/ |
| **Open VSX** | https://open-vsx.org/ |
| **VS Code 发布** | https://marketplace.visualstudio.com/manage/publishers/ |
| **Open VSX 账号** | https://open-vsx.org/account |
| **VS Code API 文档** | https://code.visualstudio.com/api |

---

## 💡 **使用建议**

### **开发阶段**
- 关注：[CURSOR_COMPATIBILITY.md](CURSOR_COMPATIBILITY.md) - 确保兼容性
- 参考：[COMPLETE_PUBLISHING_GUIDE.md](COMPLETE_PUBLISHING_GUIDE.md) - 了解最佳实践

### **发布阶段**
- 使用：[QUICK_PUBLISHING_REFERENCE.md](QUICK_PUBLISHING_REFERENCE.md) - 快速操作
- 遇到问题：查看对应问题解决章节

### **维护阶段**
- 版本更新：[QUICK_PUBLISHING_REFERENCE.md - 发布检查清单](QUICK_PUBLISHING_REFERENCE.md#发布前必检清单)
- 用户支持：[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)

---

## 📞 **获取帮助**

### **文档问题**
- 检查对应文档的疑难解答章节
- 查看 [COMPLETE_PUBLISHING_GUIDE.md](COMPLETE_PUBLISHING_GUIDE.md) 的相关链接

### **技术问题**
- 访问官方文档：[VS Code 扩展 API](https://code.visualstudio.com/api)
- Open VSX 文档：[发布指南](https://github.com/eclipse/openvsx/wiki)

### **社区支持**
- [VS Code 扩展社区](https://github.com/microsoft/vscode)
- [Open VSX 社区](https://github.com/eclipse/openvsx)

**祝发布顺利！** 🚀
