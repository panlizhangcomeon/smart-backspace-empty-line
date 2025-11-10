import * as vscode from 'vscode';

// 不再需要跟踪双击退格的变量
// let lastBackspaceTime: number = 0;
// let lastBackspaceLine: number = -1;
let isProcessingBackspace: boolean = false; // 防止递归调用

export function activate(context: vscode.ExtensionContext) {
    // 立即显示信息
    vscode.window.showInformationMessage('🚀 Smart Backspace扩展已激活！');
    console.log('🚀 Smart Backspace extension is now active!');
    
    // 创建状态栏项目
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(keyboard) Smart Backspace';
    statusBarItem.tooltip = 'Smart Backspace is active - Empty lines will be deleted with Backspace';
    statusBarItem.show();
    
    // 注册命令
    const disposable = vscode.commands.registerCommand('smartBackspace.smartBackspace', () => {
        console.log('🎯 Smart Backspace command called!');
        handleSmartBackspace();
    });
    
    context.subscriptions.push(disposable);
    context.subscriptions.push(statusBarItem);
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

export function deactivate() {}