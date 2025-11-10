# 快速安装指南

## 🚀 **立即安装 Smart Backspace Empty Line**

### **VS Code 用户**
```bash
# 方法1：命令行安装
code --install-extension plz.smart-backspace-empty-line

# 方法2：扩展面板搜索
# 搜索词：@plz 或 "Smart Backspace Empty Line"
```

### **Cursor 用户**
```bash
# 方法1：命令行安装（推荐）
cursor --install-extension plz.smart-backspace-empty-line

# 方法2：扩展面板搜索
# 搜索词：@plz 或 "Smart Backspace Empty Line"
# 如果搜索不到，请稍后重试（需要市场同步时间）
```

### **方法3：手动下载安装**
1. 访问：https://marketplace.visualstudio.com/items?itemName=plz.smart-backspace-empty-line
2. 点击 "Download" 下载 VSIX 文件
3. 在编辑器中安装：
   ```bash
   # VS Code
   code --install-extension smart-backspace-empty-line-0.0.3.vsix
   
   # Cursor
   cursor --install-extension smart-backspace-empty-line-0.0.3.vsix
   ```

## 🧪 **功能测试**

安装后测试：
1. 打开任何文件
2. 创建一个空白行
3. 按 `Backspace` 键
4. 确认空白行被删除，光标智能定位

## 🔧 **问题排除**

### **Cursor 中搜索不到**
- 版本 0.0.3 已包含 Cursor 兼容性修复
- 等待 30 分钟-2 小时市场同步
- 或使用上述命令行安装方法

### **安装后无反应**
- 重新加载窗口：`Cmd+Shift+P` → "Developer: Reload Window"
- 检查扩展是否已启用

## 💡 **为什么这次能工作**

版本 0.0.3 的关键修复：
- ✅ 正确配置 `cursor` 引擎 (">=0.1.0")
- ✅ 添加 "cursor" 关键词提高搜索发现性
- ✅ 完整元数据满足 Cursor 扩展要求
- ✅ 使用标准 API 确保兼容性

现在你的扩展应该能在两个编辑器中正常工作！🎉
