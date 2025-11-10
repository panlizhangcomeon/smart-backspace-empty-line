// 优化后的智能退格功能测试
// 现在与PhpStorm行为完全一致！

class SmartBackspaceTest {
    constructor() {
        this.message = "Hello World";
    }
    
    // 在下面的空白行测试退格功能：
    // 将光标放在空白行上，然后按Backspace键
    
    testEmptyLine() {
        console.log(this.message);
        
        // ← 第一次退格：光标跳到上一行末尾
        // ← 第二次退格：删除空白行
        
        return true;
    }
    
    testMultipleEmptyLines() {
        console.log("First line");
        // ← 测试：光标在这里
        
        // ← 多个空白行的测试
        
        console.log("Last line");
    }
    
    testFirstLine() {
        // ← 第一行空白的情况
        
        console.log("Actual code");
    }
    
    // 测试说明：
    // 1. 空白行第一次退格：光标跳到上一行末尾
    // 2. 空白行第二次退格：删除整个空白行
    // 3. 非空白行：使用默认退格行为
    // 4. 防止递归调用和装饰器冲突
    // 5. 更好的边界情况处理
}
