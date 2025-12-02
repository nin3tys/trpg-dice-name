// 共享骰子结果的工具函数

// 保存骰子结果到localStorage
export function saveDiceResult(result) {
    const diceData = {
        result: result,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('lastDiceResult', JSON.stringify(diceData));
}

// 获取最后一次骰子结果
export function getLastDiceResult() {
    const stored = localStorage.getItem('lastDiceResult');
    return stored ? JSON.parse(stored) : null;
}

// 监听骰子结果变化
export function listenForDiceResults(callback) {
    // 设置初始值
    let lastResult = getLastDiceResult() ? JSON.stringify(getLastDiceResult()) : null;
    
    // 定期检查变化
    return setInterval(() => {
        const currentResult = getLastDiceResult() ? JSON.stringify(getLastDiceResult()) : null;
        if (currentResult !== lastResult) {
            lastResult = currentResult;
            callback(getLastDiceResult());
        }
    }, 500); // 每500毫秒检查一次
}
