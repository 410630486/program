// 校務系統伺服器
const express = require('express');
const path = require('path');
const SimpleDatabase = require('./database/simple_db');

const app = express();
const PORT = 3000;

// 中介軟體
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 靜態檔案服務
app.use(express.static(path.join(__dirname)));

// 資料庫實例
const db = new SimpleDatabase();

// 登入 API
app.post('/api/login', async (req, res) => {
    const { username, password, userType } = req.body;
    
    try {
        // 從資料庫獲取使用者
        const user = await db.getUserByUsername(username);
        
        if (user && user.password === password && user.userType === userType) {
            // 更新最後登入時間
            await db.updateUser(user.id, { lastLogin: new Date().toISOString() });
            
            res.json({
                success: true,
                message: '登入成功',
                user: {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    userType: user.userType,
                    department: user.department
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: '帳號或密碼錯誤'
            });
        }
    } catch (error) {
        console.error('登入錯誤:', error);
        res.status(500).json({
            success: false,
            message: '伺服器錯誤'
        });
    }
});

// 學生資料 API
app.get('/api/student/info', (req, res) => {
    // 模擬學生資料
    res.json({
        success: true,
        data: {
            name: '張三',
            studentId: 'S001',
            department: '資訊工程系',
            grade: '二年級'
        }
    });
});

// 學生課表 API
app.get('/api/student/schedule', (req, res) => {
    res.json({
        success: true,
        data: {
            schedule: [
                { period: '第1節', time: '08:10-09:00', monday: '程式設計', tuesday: '', wednesday: '資料結構', thursday: '', friday: '微積分' },
                { period: '第2節', time: '09:10-10:00', monday: '程式設計', tuesday: '', wednesday: '資料結構', thursday: '', friday: '微積分' }
            ]
        }
    });
});

// 學生成績 API
app.get('/api/student/grades', (req, res) => {
    res.json({
        success: true,
        data: {
            grades: [
                { subject: '程式設計基礎', credits: 3, score: 85, grade: 'A' },
                { subject: '資料結構', credits: 3, score: 78, grade: 'B+' },
                { subject: '微積分', credits: 4, score: 92, grade: 'A+' }
            ]
        }
    });
});

// 管理員 API - 獲取所有使用者
app.get('/api/admin/users', async (req, res) => {
    try {
        const users = await db.getAllUsers();
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('獲取使用者資料錯誤:', error);
        res.status(500).json({
            success: false,
            message: '伺服器錯誤'
        });
    }
});

// 管理員 API - 獲取系統統計
app.get('/api/admin/stats', async (req, res) => {
    try {
        const users = await db.getAllUsers();
        const students = await db.getAllStudents();
        const staff = await db.getAllStaff();
        const courses = await db.getAllCourses();
        
        const stats = {
            totalUsers: users.length,
            totalStudents: students.length,
            totalStaff: staff.length,
            totalCourses: courses.length,
            usersByType: {
                student: users.filter(u => u.userType === 'student').length,
                staff: users.filter(u => u.userType === 'staff').length,
                hr: users.filter(u => u.userType === 'hr').length,
                admin: users.filter(u => u.userType === 'admin').length
            }
        };
        
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('獲取統計資料錯誤:', error);
        res.status(500).json({
            success: false,
            message: '伺服器錯誤'
        });
    }
});

// 管理員 API - 獲取系統日誌
app.get('/api/admin/logs', (req, res) => {
    const mockLogs = [
        {
            id: 1,
            timestamp: new Date().toISOString(),
            level: 'info',
            user: 'admin',
            action: '登入系統',
            ip: '192.168.1.100',
            details: '管理員登入成功'
        },
        {
            id: 2,
            timestamp: new Date(Date.now() - 300000).toISOString(),
            level: 'warning',
            user: 'student',
            action: '登入失敗',
            ip: '192.168.1.101',
            details: '密碼錯誤'
        },
        {
            id: 3,
            timestamp: new Date(Date.now() - 600000).toISOString(),
            level: 'info',
            user: 'staff',
            action: '查看成績',
            ip: '192.168.1.102',
            details: '查看課程 CS101 成績'
        }
    ];
    
    res.json({
        success: true,
        data: mockLogs
    });
});

// 主頁路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`校務系統伺服器運行在 http://localhost:${PORT}`);
});
