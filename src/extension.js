"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
// 存储上次退格键按下的时间和行号
let lastBackspaceTime = 0;
let lastBackspaceLine = -1;
const BACKSPACE_DELAY = 500; // 两次退格的间隔时间（毫秒）
function activate(context) {
    console.log('Smart Backspace extension is now active!');
    // 注册命令
    const disposable = vscode.commands.registerCommand('smartBackspace.smartBackspace', () => {
        handleSmartBackspace();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function handleSmartBackspace() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const document = editor.document;
    const selection = editor.selection;
    const currentLine = selection.active.line;
    const currentLineText = document.lineAt(currentLine).text;
    const currentTime = Date.now();
    // 检查当前行是否为空白行（只有空格、制表符或完全为空）
    const isEmptyLine = currentLineText.trim().length === 0;
    // 如果不是空白行，使用默认退格行为
    if (!isEmptyLine) {
        // 执行默认退格行为
        vscode.commands.executeCommand('deleteLeft');
        return;
    }
    // 如果是空白行
    if (isEmptyLine) {
        // 检查是否在短时间内连续按了两次退格（在同一行）
        const isDoubleBackspace = currentTime - lastBackspaceTime < BACKSPACE_DELAY &&
            lastBackspaceLine === currentLine;
        if (isDoubleBackspace) {
            // 第二次退格：删除整行
            editor.edit(editBuilder => {
                const lineRange = new vscode.Range(currentLine, 0, currentLine + 1, 0);
                editBuilder.delete(lineRange);
            }).then(() => {
                // 将光标移动到上一行的行末（保持对齐）
                if (currentLine > 0) {
                    const prevLine = currentLine - 1;
                    const prevLineText = document.lineAt(prevLine).text;
                    const prevLineEnd = new vscode.Position(prevLine, prevLineText.length);
                    editor.selection = new vscode.Selection(prevLineEnd, prevLineEnd);
                }
            });
            // 重置状态
            lastBackspaceTime = 0;
            lastBackspaceLine = -1;
        }
        else {
            // 第一次退格：移动光标到上一行的行末
            if (currentLine > 0) {
                const prevLine = currentLine - 1;
                const prevLineText = document.lineAt(prevLine).text;
                // 移动到上一行的行末
                const prevLineEnd = new vscode.Position(prevLine, prevLineText.length);
                editor.selection = new vscode.Selection(prevLineEnd, prevLineEnd);
            }
            else {
                // 如果是第一行，执行默认退格
                vscode.commands.executeCommand('deleteLeft');
            }
            // 记录这次退格的时间和行号
            lastBackspaceTime = currentTime;
            lastBackspaceLine = currentLine;
        }
    }
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map