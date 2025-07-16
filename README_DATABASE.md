# 校務系統 MongoDB 資料庫設定

## 安裝說明

### 1. 安裝 MongoDB
請先安裝 MongoDB Community Server：
- Windows: https://www.mongodb.com/try/download/community
- 或使用 MongoDB Atlas 雲端服務

### 2. 安裝 Node.js 依賴
```bash
npm install
```

### 3. 初始化資料庫
```bash
npm run init-db
```

### 4. 啟動伺服器
```bash
npm start
```

## 預設帳號

### 系統管理員
- 帳號: admin
- 密碼: admin123
- 身份: admin

### 學生
- 帳號: student001
- 密碼: student123
- 身份: student

### 教職員
- 帳號: teacher001
- 密碼: teacher123
- 身份: staff

### 人事部
- 帳號: hr001
- 密碼: hr123
- 身份: hr

## 資料庫結構

### users 集合
```javascript
{
    _id: ObjectId,
    username: String,        // 使用者名稱 (唯一)
    password: String,        // 加密後的密碼
    email: String,           // 電子郵件 (唯一)
    userType: String,        // 使用者類型: admin/student/staff/hr
    name: String,            // 真實姓名
    studentId: String,       // 學號 (學生專用)
    staffId: String,         // 員工編號 (教職員專用)
    department: String,      // 系所/部門
    position: String,        // 職位 (教職員專用)
    grade: Number,           // 年級 (學生專用)
    status: String,          // 狀態: active/inactive/deleted
    createdAt: Date,         // 建立時間
    updatedAt: Date,         // 更新時間
    deletedAt: Date          // 刪除時間
}
```

## API 端點

### POST /api/login
登入驗證
```javascript
{
    "username": "admin",
    "password": "admin123",
    "userType": "admin"
}
```

### POST /api/register
註冊新使用者
```javascript
{
    "username": "newuser",
    "password": "password123",
    "email": "user@school.edu.tw",
    "userType": "student",
    "name": "新使用者",
    "department": "資訊工程系"
}
```

### GET /api/users/stats
取得使用者統計資料

### GET /api/users/:userType
取得特定類型的使用者列表

## 安全性功能

1. **密碼加密**: 使用 bcrypt 進行密碼雜湊
2. **唯一性約束**: 使用者名稱和電子郵件唯一
3. **軟刪除**: 使用者刪除採用軟刪除方式
4. **輸入驗證**: API 端點包含基本的輸入驗證

## 注意事項

1. 請確保 MongoDB 服務正在運行
2. 預設資料庫名稱為 `school_system`
3. 預設連接 URL 為 `mongodb://localhost:27017`
4. 生產環境請修改密碼並使用環境變數
