# 自动保存功能使用指南

## 📖 功能简介

Smart Editing Tools扩展现在包含**自动保存功能**，类似PHPStorm/IntelliJ的autoSave特性。当你编辑文件时，扩展会自动在停止输入后保存文件，无需手动按Ctrl+S。

## ✨ 主要特性

### 1. 自动触发保存
- 当文件内容改变时，自动在停止输入后触发保存
- 使用防抖机制，避免频繁保存影响性能
- 只保存实际有改动的文件

### 2. 状态栏显示
在VS Code/Cursor右下角会显示自动保存状态：
- **🔄 自动保存**：表示功能已启用
- **🚫 自动保存**：表示功能已禁用（带警告背景色）

### 3. 一键切换
点击状态栏的自动保存图标即可快速启用/禁用功能

## ⚙️ 配置选项

### 打开设置
1. 按 `Cmd+,`（Mac）或 `Ctrl+,`（Windows/Linux）
2. 搜索 "Smart Editing Tools"
3. 找到自动保存相关配置

### 配置项说明

#### `smartBackspace.autoSave.enabled`
- **类型**：Boolean
- **默认值**：`true`
- **说明**：启用或禁用自动保存功能

#### `smartBackspace.autoSave.delay`
- **类型**：Number（毫秒）
- **默认值**：`500`
- **范围**：100 - 5000
- **说明**：停止输入后延迟多久触发保存
- **建议值**：
  - 快速保存：200-300ms
  - 平衡模式：500ms（默认）
  - 延迟保存：1000-2000ms

#### `smartBackspace.autoSave.showNotification`
- **类型**：Boolean
- **默认值**：`false`
- **说明**：保存时在状态栏显示通知
- **注意**：启用后会在每次保存时显示提示，可能干扰工作流

## 🎯 使用方法

### 方法1：通过状态栏切换
1. 找到右下角的"🔄 自动保存"图标
2. 点击图标切换启用/禁用状态
3. 会弹出确认消息

### 方法2：通过命令面板
1. 按 `Cmd+Shift+P`（Mac）或 `Ctrl+Shift+P`（Windows/Linux）
2. 输入 "Smart Editing Tools: 切换自动保存"
3. 按回车执行

### 方法3：通过设置文件
在 `settings.json` 中添加：
```json
{
  "smartBackspace.autoSave.enabled": true,
  "smartBackspace.autoSave.delay": 500,
  "smartBackspace.autoSave.showNotification": false
}
```

## 🔧 工作原理

1. **监听文档变化**：扩展监听所有文档的内容变化事件
2. **防抖处理**：使用计时器实现防抖，避免频繁保存
3. **智能判断**：
   - 只处理实际文件（忽略输出面板、调试控制台等）
   - 只保存有改动的文件（isDirty状态）
   - 保存时暂停监听，避免循环触发
4. **执行保存**：调用VS Code的save() API保存文件

## 📊 配置示例

### 快速保存模式
适合需要频繁保存的场景（如前端开发配合热重载）：
```json
{
  "smartBackspace.autoSave.enabled": true,
  "smartBackspace.autoSave.delay": 200,
  "smartBackspace.autoSave.showNotification": false
}
```

### 标准模式（推荐）
平衡保存频率和性能：
```json
{
  "smartBackspace.autoSave.enabled": true,
  "smartBackspace.autoSave.delay": 500,
  "smartBackspace.autoSave.showNotification": false
}
```

### 延迟保存模式
适合大文件或需要更多思考时间的场景：
```json
{
  "smartBackspace.autoSave.enabled": true,
  "smartBackspace.autoSave.delay": 1500,
  "smartBackspace.autoSave.showNotification": false
}
```

### 带通知模式
如果想看到保存反馈：
```json
{
  "smartBackspace.autoSave.enabled": true,
  "smartBackspace.autoSave.delay": 500,
  "smartBackspace.autoSave.showNotification": true
}
```

## ❓ 常见问题

### Q: 为什么我看不到保存效果？
A: 检查以下几点：
1. 确认扩展已激活（看状态栏是否有"🔄 自动保存"图标）
2. 确认功能已启用（图标没有警告背景色）
3. 确认延迟时间设置合理（建议500ms）
4. 检查文件是否真的有改动（标题栏是否有未保存标记）

### Q: 会影响性能吗？
A: 不会。自动保存使用防抖机制，只在停止输入后才触发。而且：
- 只处理实际文件，不处理虚拟文档
- 保存时会暂停监听，避免循环
- 只保存有改动的文件

### Q: 与VS Code原生autoSave有什么区别？
A: 
- **VS Code原生autoSave**：基于时间间隔或焦点变化
- **本扩展autoSave**：基于输入停止检测，更像PHPStorm的行为

两者可以共存，但建议只启用一个以避免混淆。

### Q: 如何完全禁用？
A: 有两种方式：
1. 点击状态栏图标切换为禁用状态
2. 在设置中将 `smartBackspace.autoSave.enabled` 设为 `false`

### Q: 支持哪些文件类型？
A: 支持所有文本文件类型，包括但不限于：
- 代码文件（.js, .ts, .py, .java, .go, .php等）
- 配置文件（.json, .yaml, .xml等）
- 文档文件（.md, .txt等）
- 样式文件（.css, .scss等）

## 🚀 最佳实践

### 1. 根据工作场景调整延迟
- **Web开发**：200-500ms，配合热重载快速看到效果
- **后端开发**：500-1000ms，留出更多思考时间
- **文档编写**：1000-2000ms，避免过于频繁的保存

### 2. 禁用通知（推荐）
保存通知会打断工作流，建议保持默认的 `false` 设置

### 3. 与Git配合
自动保存不会自动提交Git，你仍需要手动控制版本管理

### 4. 配合Live Server使用
如果使用Live Server等工具，建议设置较短的延迟时间（200-300ms），以快速看到页面更新

## 📝 反馈与建议

如果你在使用过程中遇到任何问题或有改进建议，欢迎通过以下方式反馈：
- 在GitHub仓库提交Issue
- 在扩展市场留言
- 通过邮件联系作者

---

**享受无需手动保存的编码体验！** 💾✨

