// API測試腳本
const http = require('http');
const querystring = require('querystring');

const SERVER_URL = 'http://localhost:3000';

// 測試用戶憑證
const testCredentials = {
    username: 'tku123',
    password: '123456',
    userType: 'student'
};

// 全域變數儲存Token
let authToken = null;

// 發送HTTP請求的輔助函式
function makeRequest(path, method = 'GET', data = null, headers = {}) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, SERVER_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const result = JSON.parse(body);
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        data: result
                    });
                } catch (error) {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        data: body
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

// 登入並取得Token
async function login() {
    console.log('🔑 開始登入測試...');
    try {
        const response = await makeRequest('/api/login', 'POST', testCredentials);
        
        if (response.statusCode === 200 && response.data.success) {
            authToken = response.data.token;
            console.log('✅ 登入成功');
            return true;
        } else {
            console.log('❌ 登入失敗:', response.data.message);
            return false;
        }
    } catch (error) {
        console.error('❌ 登入發生錯誤:', error.message);
        return false;
    }
}

// 測試學生資訊API
async function testStudentInfo() {
    console.log('\n📋 測試學生資訊API...');
    
    const tests = [
        { name: '查詢學生基本資料', path: '/api/student/info/basic' },
        { name: '查詢學生詳細資料', path: '/api/student/info/detailed' },
        { name: '查詢學生聯絡資料', path: '/api/student/info/contact' },
        { name: '查詢學生家庭資料', path: '/api/student/info/family' }
    ];

    for (const test of tests) {
        try {
            const response = await makeRequest(test.path, 'GET', null, {
                'Authorization': `Bearer ${authToken}`
            });
            
            if (response.statusCode === 200) {
                console.log(`✅ ${test.name}: 成功`);
            } else {
                console.log(`❌ ${test.name}: 失敗 (${response.statusCode})`);
            }
        } catch (error) {
            console.log(`❌ ${test.name}: 錯誤 - ${error.message}`);
        }
    }
}

// 測試課程表API
async function testSchedule() {
    console.log('\n📅 測試課程表API...');
    
    const tests = [
        { name: '查詢本週課程表', path: '/api/student/schedule/current' },
        { name: '查詢課程詳細資料', path: '/api/student/schedule/course/CS101' },
        { name: '查詢考試時間表', path: '/api/student/schedule/exams' },
        { name: '查詢今日課程', path: '/api/student/schedule/today' }
    ];

    for (const test of tests) {
        try {
            const response = await makeRequest(test.path, 'GET', null, {
                'Authorization': `Bearer ${authToken}`
            });
            
            if (response.statusCode === 200) {
                console.log(`✅ ${test.name}: 成功`);
            } else {
                console.log(`❌ ${test.name}: 失敗 (${response.statusCode})`);
            }
        } catch (error) {
            console.log(`❌ ${test.name}: 錯誤 - ${error.message}`);
        }
    }
}

// 測試成績API
async function testGrades() {
    console.log('\n📊 測試成績API...');
    
    const tests = [
        { name: '查詢學期成績', path: '/api/student/grades/semester/current' },
        { name: '查詢歷年成績', path: '/api/student/grades/history' },
        { name: '查詢課程成績', path: '/api/student/grades/course/CS101' },
        { name: '查詢成績統計', path: '/api/student/grades/statistics' }
    ];

    for (const test of tests) {
        try {
            const response = await makeRequest(test.path, 'GET', null, {
                'Authorization': `Bearer ${authToken}`
            });
            
            if (response.statusCode === 200) {
                console.log(`✅ ${test.name}: 成功`);
            } else {
                console.log(`❌ ${test.name}: 失敗 (${response.statusCode})`);
            }
        } catch (error) {
            console.log(`❌ ${test.name}: 錯誤 - ${error.message}`);
        }
    }
}

// 測試選課API
async function testEnrollment() {
    console.log('\n🎓 測試選課API...');
    
    const tests = [
        { name: '查詢可選課程', path: '/api/student/enrollment/available' },
        { name: '查詢已選課程', path: '/api/student/enrollment/enrolled' },
        { name: '查詢選課歷史', path: '/api/student/enrollment/history' },
        { name: '查詢選課衝突', path: '/api/student/enrollment/conflicts' }
    ];

    for (const test of tests) {
        try {
            const response = await makeRequest(test.path, 'GET', null, {
                'Authorization': `Bearer ${authToken}`
            });
            
            if (response.statusCode === 200) {
                console.log(`✅ ${test.name}: 成功`);
            } else {
                console.log(`❌ ${test.name}: 失敗 (${response.statusCode})`);
            }
        } catch (error) {
            console.log(`❌ ${test.name}: 錯誤 - ${error.message}`);
        }
    }
}

// 測試學雜費API
async function testFees() {
    console.log('\n💰 測試學雜費API...');
    
    const tests = [
        { name: '查詢學雜費總覽', path: '/api/student/fees/overview' },
        { name: '查詢繳費記錄', path: '/api/student/fees/payments' },
        { name: '查詢未繳費用', path: '/api/student/fees/unpaid' },
        { name: '查詢費用明細', path: '/api/student/fees/details/2024-1' }
    ];

    for (const test of tests) {
        try {
            const response = await makeRequest(test.path, 'GET', null, {
                'Authorization': `Bearer ${authToken}`
            });
            
            if (response.statusCode === 200) {
                console.log(`✅ ${test.name}: 成功`);
            } else {
                console.log(`❌ ${test.name}: 失敗 (${response.statusCode})`);
            }
        } catch (error) {
            console.log(`❌ ${test.name}: 錯誤 - ${error.message}`);
        }
    }
}

// 測試活動報名API
async function testActivities() {
    console.log('\n🎉 測試活動報名API...');
    
    const tests = [
        { name: '查詢可報名活動', path: '/api/student/activities/available' },
        { name: '查詢已報名活動', path: '/api/student/activities/registered' },
        { name: '查詢活動歷史', path: '/api/student/activities/history' },
        { name: '查詢活動詳情', path: '/api/student/activities/ACT001' }
    ];

    for (const test of tests) {
        try {
            const response = await makeRequest(test.path, 'GET', null, {
                'Authorization': `Bearer ${authToken}`
            });
            
            if (response.statusCode === 200) {
                console.log(`✅ ${test.name}: 成功`);
            } else {
                console.log(`❌ ${test.name}: 失敗 (${response.statusCode})`);
            }
        } catch (error) {
            console.log(`❌ ${test.name}: 錯誤 - ${error.message}`);
        }
    }
}

// 測試公告API
async function testAnnouncements() {
    console.log('\n📢 測試公告API...');
    
    const tests = [
        { name: '查詢公告列表', path: '/api/student/announcements' },
        { name: '查詢緊急公告', path: '/api/student/announcements/urgent' },
        { name: '查詢未讀公告數量', path: '/api/student/announcements/unread/count' },
        { name: '查詢公告詳情', path: '/api/student/announcements/ANN001' }
    ];

    for (const test of tests) {
        try {
            const response = await makeRequest(test.path, 'GET', null, {
                'Authorization': `Bearer ${authToken}`
            });
            
            if (response.statusCode === 200) {
                console.log(`✅ ${test.name}: 成功`);
            } else {
                console.log(`❌ ${test.name}: 失敗 (${response.statusCode})`);
            }
        } catch (error) {
            console.log(`❌ ${test.name}: 錯誤 - ${error.message}`);
        }
    }
}

// 主要測試函式
async function runAllTests() {
    console.log('🚀 開始執行API測試...\n');
    
    // 先登入
    const loginSuccess = await login();
    if (!loginSuccess) {
        console.log('❌ 登入失敗，無法進行後續測試');
        return;
    }
    
    // 執行各項測試
    await testStudentInfo();
    await testSchedule();
    await testGrades();
    await testEnrollment();
    await testFees();
    await testActivities();
    await testAnnouncements();
    
    console.log('\n🎯 所有測試執行完成！');
}

// 如果直接執行此腳本
if (require.main === module) {
    runAllTests().catch(console.error);
}

module.exports = {
    makeRequest,
    login,
    testStudentInfo,
    testSchedule,
    testGrades,
    testEnrollment,
    testFees,
    testActivities,
    testAnnouncements,
    runAllTests
};
