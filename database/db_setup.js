// MongoDB 資料庫設定和初始化
const { MongoClient } = require('mongodb');

// 連接設定
const url = 'mongodb://localhost:27017';
const dbName = 'school_system';

// 建立連接
async function connectDB() {
    const client = new MongoClient(url);
    await client.connect();
    console.log('已連接到 MongoDB');
    
    const db = client.db(dbName);
    return { client, db };
}

// 初始化資料庫集合
async function initializeDatabase() {
    const { client, db } = await connectDB();
    
    try {
        // 建立使用者集合
        const usersCollection = db.collection('users');
        
        // 建立索引 (確保帳號唯一性)
        await usersCollection.createIndex({ username: 1 }, { unique: true });
        await usersCollection.createIndex({ email: 1 }, { unique: true });
        
        // 插入初始測試資料
        const initialUsers = [
            {
                username: 'admin',
                password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: admin123
                email: 'admin@school.edu.tw',
                userType: 'admin',
                name: '系統管理員',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: 'student001',
                password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: student123
                email: 'student001@school.edu.tw',
                userType: 'student',
                name: '王小明',
                studentId: 'S001',
                department: '資訊工程系',
                grade: 2,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: 'teacher001',
                password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: teacher123
                email: 'teacher001@school.edu.tw',
                userType: 'staff',
                name: '陳老師',
                staffId: 'T001',
                department: '資訊工程系',
                position: '副教授',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: 'hr001',
                password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: hr123
                email: 'hr001@school.edu.tw',
                userType: 'hr',
                name: '李人事',
                staffId: 'H001',
                department: '人事室',
                position: '人事專員',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: 'tku123',
                password: '$2b$10$Ku8tNPGrNYRXcQCWMYt0B.UvhZvklhHlJP/8LjkNZrjgKOyWK3BgO', // password: 123456
                email: 'tku123@school.edu.tw',
                userType: 'student',
                name: '新學生',
                studentId: 'S123',
                department: '資訊工程系',
                grade: 1,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        
        // 清空現有資料 (如果需要重新初始化)
        await usersCollection.deleteMany({});
        
        // 插入初始資料
        const result = await usersCollection.insertMany(initialUsers);
        console.log(`成功插入 ${result.insertedCount} 筆使用者資料`);
        
        console.log('資料庫初始化完成');
        
    } catch (error) {
        console.error('資料庫初始化錯誤:', error);
    } finally {
        await client.close();
    }
}

// 匯出函數
module.exports = {
    connectDB,
    initializeDatabase
};

// 如果直接執行此檔案，則進行初始化
if (require.main === module) {
    initializeDatabase();
}
