// 系統管理員功能測試
console.log('開始測試系統管理員功能...');

// 測試登入
async function testAdminLogin() {
    console.log('\n=== 測試管理員登入 ===');
    
    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'admin',
            password: '123456',
            userType: 'admin'
        })
    });
    
    const result = await response.json();
    console.log('登入結果:', result);
    
    if (result.success) {
        console.log('✅ 管理員登入成功');
        return result.user;
    } else {
        console.log('❌ 管理員登入失敗');
        return null;
    }
}

// 測試獲取使用者列表
async function testGetUsers() {
    console.log('\n=== 測試獲取使用者列表 ===');
    
    const response = await fetch('http://localhost:3000/api/admin/users');
    const result = await response.json();
    
    if (result.success) {
        console.log('✅ 成功獲取使用者列表');
        console.log('使用者數量:', result.data.length);
        result.data.forEach(user => {
            console.log(`- ${user.name} (${user.username}) - ${user.userType}`);
        });
    } else {
        console.log('❌ 獲取使用者列表失敗');
    }
}

// 測試獲取系統統計
async function testGetStats() {
    console.log('\n=== 測試獲取系統統計 ===');
    
    const response = await fetch('http://localhost:3000/api/admin/stats');
    const result = await response.json();
    
    if (result.success) {
        console.log('✅ 成功獲取系統統計');
        console.log('統計資料:', result.data);
    } else {
        console.log('❌ 獲取系統統計失敗');
    }
}

// 測試獲取系統日誌
async function testGetLogs() {
    console.log('\n=== 測試獲取系統日誌 ===');
    
    const response = await fetch('http://localhost:3000/api/admin/logs');
    const result = await response.json();
    
    if (result.success) {
        console.log('✅ 成功獲取系統日誌');
        console.log('日誌數量:', result.data.length);
        result.data.forEach(log => {
            console.log(`- ${log.timestamp} [${log.level}] ${log.user}: ${log.action}`);
        });
    } else {
        console.log('❌ 獲取系統日誌失敗');
    }
}

// 執行所有測試
async function runTests() {
    try {
        const user = await testAdminLogin();
        if (user) {
            await testGetUsers();
            await testGetStats();
            await testGetLogs();
        }
        console.log('\n🎉 所有測試完成！');
    } catch (error) {
        console.error('測試過程中發生錯誤:', error);
    }
}

// 檢查伺服器是否運行
async function checkServer() {
    try {
        const response = await fetch('http://localhost:3000');
        if (response.ok) {
            console.log('✅ 伺服器運行正常');
            return true;
        } else {
            console.log('❌ 伺服器回應異常');
            return false;
        }
    } catch (error) {
        console.log('❌ 無法連接伺服器:', error.message);
        return false;
    }
}

// 主程式
async function main() {
    console.log('校務系統管理員功能測試');
    console.log('========================');
    
    const serverOk = await checkServer();
    if (serverOk) {
        await runTests();
    } else {
        console.log('請先啟動伺服器 (npm start)');
    }
}

main();
