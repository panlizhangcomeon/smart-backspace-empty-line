# Change Log

All notable changes to the "smart-backspace-empty-line" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.5] - 2025-11-12

### Added
- ✨ **自动保存功能**：类似PHPStorm的autoSave，文件改动后自动保存
- ✅ 防抖机制，可配置延迟时间（默认500ms）
- ✅ 状态栏显示自动保存状态
- ✅ 一键切换启用/禁用自动保存功能
- ✅ 新增配置项：
  - `smartBackspace.autoSave.enabled` - 启用/禁用自动保存
  - `smartBackspace.autoSave.delay` - 保存延迟时间
  - `smartBackspace.autoSave.showNotification` - 显示保存通知
- ✅ 新增命令：`Smart Editing Tools: 切换自动保存`

### Changed
- 优化扩展激活提示信息
- 改进状态栏UI设计

## [0.0.4] - 2024

### Changed
- 代码优化和性能改进

## [0.0.3] - 2024

### Fixed
- 修复Cursor扩展市场兼容性问题
- 解决旧扩展在Cursor中搜不到的问题

### Changed
- 添加正确的cursor引擎配置 (">=0.1.0")
- 优化关键词包含"cursor"以提高搜索发现性
- 添加完整的作者和仓库元数据

## [0.0.2] - 2024

### Added
- 添加Cursor兼容性支持
- 更新引擎配置支持Cursor编辑器
- 优化扩展在Cursor中的可发现性

## [0.0.1] - 2024

### Added
- 初始发布
- 实现单键删除空白行功能
- 智能光标定位
- 保持代码结构
- 支持多种文件类型
- 极简化用户界面