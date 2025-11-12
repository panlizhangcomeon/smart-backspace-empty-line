import * as vscode from 'vscode';

// 不再需要跟踪双击退格的变量
// let lastBackspaceTime: number = 0;
// let lastBackspaceLine: number = -1;
let isProcessingBackspace: boolean = false; // 防止递归调用

// 自动保存相关变量
let autoSaveTimeout: NodeJS.Timeout | undefined;
let isSaving: boolean = false; // 防止保存时触发自己

export function activate(context: vscode.ExtensionContext) {
    // 立即显示信息
    vscode.window.showInformationMessage('🚀 Smart Editing Tools扩展已激活！智能退格 + 自动保存！');
    console.log('🚀 Smart Editing Tools extension is now active with Smart Backspace & Auto Save!');
    
    // 创建状态栏项目
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(keyboard) Smart Editing';
    statusBarItem.tooltip = 'Smart Editing Tools - Smart backspace for empty lines';
    statusBarItem.show();
    
    // 创建自动保存状态栏项目
    const autoSaveStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 99);
    updateAutoSaveStatus(autoSaveStatusBarItem);
    autoSaveStatusBarItem.show();
    
    // 注册命令
    const disposable = vscode.commands.registerCommand('smartBackspace.smartBackspace', () => {
        console.log('🎯 Smart Backspace command called!');
        handleSmartBackspace();
    });
    
    // 注册切换自动保存命令
    const toggleAutoSaveCommand = vscode.commands.registerCommand('smartBackspace.toggleAutoSave', () => {
        toggleAutoSave(autoSaveStatusBarItem);
    });
    
    // 监听文档变化事件
    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((event) => {
        handleDocumentChange(event);
    });
    
    // 监听配置变化
    const configChangeSubscription = vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('smartBackspace.autoSave')) {
            updateAutoSaveStatus(autoSaveStatusBarItem);
        }
    });
    
    context.subscriptions.push(disposable);
    context.subscriptions.push(toggleAutoSaveCommand);
    context.subscriptions.push(statusBarItem);
    context.subscriptions.push(autoSaveStatusBarItem);
    context.subscriptions.push(changeDocumentSubscription);
    context.subscriptions.push(configChangeSubscription);
}

function handleSmartBackspace() {
    console.log('💡 Smart Backspace handler called!');
    
    // 防止递归调用
    if (isProcessingBackspace) {
        console.log('⚠️ Already processing backspace, skipping');
        return;
    }
    
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        console.log('⚠️ No active editor');
        return;
    }

    const document = editor.document;
    const selection = editor.selection;
    const currentLine = selection.active.line;
    const currentLineText = document.lineAt(currentLine).text;
    // const currentTime = Date.now(); // 不再需要时间戳

    // 检查当前行是否为空白行（只有空格、制表符或完全为空）
    const isEmptyLine = currentLineText.trim().length === 0;

    console.log(`📝 Current line ${currentLine}: "${currentLineText}", Empty: ${isEmptyLine}`);

    // 如果不是空白行，使用默认退格行为
    if (!isEmptyLine) {
        console.log('🔄 Non-empty line, using default backspace');
        isProcessingBackspace = true;
        vscode.commands.executeCommand('deleteLeft').then(() => {
            isProcessingBackspace = false;
        });
        return;
    }

    // 如果是空白行：直接删除这一行
    if (isEmptyLine) {
        console.log('🗑️ Empty line detected, deleting directly');
        deleteEmptyLineSimple(editor, currentLine, document);
    }
}

function deleteEmptyLineSimple(editor: vscode.TextEditor, lineToDelete: number, document: vscode.TextDocument) {
    if (lineToDelete >= document.lineCount - 1) {
        // 如果是最后一行，不能删除
        console.log('⚠️ Cannot delete the last line');
        return;
    }
    
    isProcessingBackspace = true;
    
    const prevLine = lineToDelete - 1;
    let targetPosition: vscode.Position | null = null;
    
    if (prevLine >= 0) {
        const prevLineText = document.lineAt(prevLine).text;
        const prevLineIsEmpty = prevLineText.trim().length === 0;
        
        if (prevLineIsEmpty) {
            // 前一行是空白行：回到前一行的缩进开始位置
            const prevIndentation = getIndentationLevel(prevLineText);
            targetPosition = new vscode.Position(prevLine, prevIndentation);
            console.log(`🏠 Previous line is empty, moving to indentation at column ${prevIndentation}`);
        } else {
            // 前一行不是空白行：回到前一行的末尾
            targetPosition = new vscode.Position(prevLine, prevLineText.length);
            console.log(`📍 Previous line is not empty, moving to end at column ${prevLineText.length}`);
        }
    }
    
    // 删除整行
    const editPromise = editor.edit(editBuilder => {
        const lineRange = new vscode.Range(
            lineToDelete,
            0,
            lineToDelete + 1,
            0
        );
        editBuilder.delete(lineRange);
    });
    
    editPromise.then(() => {
        // 删除完成后，移动光标到目标位置
        setTimeout(() => {
            if (targetPosition) {
                editor.selection = new vscode.Selection(targetPosition, targetPosition);
            }
            isProcessingBackspace = false;
        }, 5);
    });
}

function getIndentationLevel(line: string): number {
    // 计算行的缩进级别（制表符和空格的组合）
    let indentLevel = 0;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === ' ' || char === '\t') {
            if (char === ' ') {
                indentLevel += 1;
            } else if (char === '\t') {
                indentLevel += 4; // 假设制表符等于4个空格
            }
        } else {
            break;
        }
    }
    return indentLevel;
}

// ============ 自动保存功能 ============

function handleDocumentChange(event: vscode.TextDocumentChangeEvent) {
    // 如果正在保存，忽略此次变化（避免循环）
    if (isSaving) {
        return;
    }
    
    // 获取配置
    const config = vscode.workspace.getConfiguration('smartBackspace.autoSave');
    const enabled = config.get<boolean>('enabled', true);
    
    if (!enabled) {
        return;
    }
    
    const document = event.document;
    
    // 只处理文件（不处理输出面板、调试控制台等）
    if (document.uri.scheme !== 'file') {
        return;
    }
    
    // 如果文档没有变化，不保存
    if (event.contentChanges.length === 0) {
        return;
    }
    
    // 获取延迟时间配置
    const delay = config.get<number>('delay', 500);
    
    // 清除之前的计时器
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }
    
    // 设置新的计时器
    autoSaveTimeout = setTimeout(() => {
        saveDocument(document);
    }, delay);
}

async function saveDocument(document: vscode.TextDocument) {
    // 如果文档未修改，不需要保存
    if (!document.isDirty) {
        return;
    }
    
    try {
        isSaving = true;
        const success = await document.save();
        if (success) {
            console.log(`💾 Auto-saved: ${document.fileName}`);
            // 可选：显示保存通知
            const config = vscode.workspace.getConfiguration('smartBackspace.autoSave');
            const showNotification = config.get<boolean>('showNotification', false);
            if (showNotification) {
                vscode.window.setStatusBarMessage('$(check) 文件已自动保存', 2000);
            }
        }
    } catch (error) {
        console.error('Failed to auto-save document:', error);
        vscode.window.showErrorMessage(`自动保存失败: ${error}`);
    } finally {
        isSaving = false;
    }
}

function updateAutoSaveStatus(statusBarItem: vscode.StatusBarItem) {
    const config = vscode.workspace.getConfiguration('smartBackspace.autoSave');
    const enabled = config.get<boolean>('enabled', true);
    const delay = config.get<number>('delay', 500);
    
    if (enabled) {
        statusBarItem.text = '$(sync) 自动保存';
        statusBarItem.tooltip = `自动保存已启用 (延迟: ${delay}ms)\n点击切换`;
        statusBarItem.command = 'smartBackspace.toggleAutoSave';
        statusBarItem.backgroundColor = undefined;
    } else {
        statusBarItem.text = '$(circle-slash) 自动保存';
        statusBarItem.tooltip = '自动保存已禁用\n点击切换';
        statusBarItem.command = 'smartBackspace.toggleAutoSave';
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    }
}

async function toggleAutoSave(statusBarItem: vscode.StatusBarItem) {
    const config = vscode.workspace.getConfiguration('smartBackspace.autoSave');
    const currentValue = config.get<boolean>('enabled', true);
    
    await config.update('enabled', !currentValue, vscode.ConfigurationTarget.Global);
    
    updateAutoSaveStatus(statusBarItem);
    
    const message = !currentValue ? '✅ 自动保存已启用' : '❌ 自动保存已禁用';
    vscode.window.showInformationMessage(message);
}

export function deactivate() {
    // 清除计时器
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }
}