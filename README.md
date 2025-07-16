# 校務系統網站 - 開發環境建置說明

## 專案概述
這是一個基於 Node.js 和 Express 的校務系統網站，支援學生、教職員、人事部和系統管理員四種使用者角色。

## 技術棧
- **前端**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5
- **後端**: Node.js, Express.js
- **資料庫**: MongoDB
- **認證**: JWT (JSON Web Token)
- **密碼加密**: bcrypt
- **開發工具**: nodemon

## 環境要求
- Node.js >= 14.0.0
- MongoDB >= 4.0
- npm >= 6.0.0

## 安裝步驟

### 1. 檢查環境
```bash
# 檢查 Node.js 版本
node --version

# 檢查 npm 版本
npm --version

# 檢查 MongoDB 是否安裝
mongod --version
```

### 2. 安裝依賴
```bash
npm install
```

### 3. 啟動 MongoDB 服務
```bash
# Windows (以管理員身份執行)
net start MongoDB

# 或者手動啟動
mongod
```

### 4. 初始化資料庫
```bash
npm run init-db
```

### 5. 啟動開發伺服器
```bash
# 開發模式 (自動重啟)
npm run dev

# 或者一般模式
npm start
```

### 6. 存取應用程式
開啟瀏覽器並前往: `http://localhost:3000`

## 測試帳號
| 身份 | 帳號 | 密碼 | 說明 |
|------|------|------|------|
| 系統管理員 | admin | 123456 | 系統管理權限 |
| 人事主管 | hr | 123456 | 人事管理權限 |
| 教職員 | staff | 123456 | 教職員權限 |
| 學生 | student | 123456 | 學生權限 |

## 專案結構
```
final/
├── index.html          # 主頁面
├── server.js           # Express 伺服器
├── package.json        # 專案配置
├── .env               # 環境變數
├── style.css          # 樣式表
├── database/          # 資料庫相關
│   ├── db_setup.js    # 資料庫初始化
│   └── user_db.js     # 使用者資料庫操作
├── test-api.js        # API 測試
├── test-server.js     # 伺服器測試
└── README.md          # 說明文件
```

## 可用的 npm 指令
- `npm start` - 啟動生產環境伺服器
- `npm run dev` - 啟動開發環境伺服器 (自動重啟)
- `npm run init-db` - 初始化資料庫
- `npm test` - 執行測試 (目前未實作)

## 開發說明

### API 端點
- `POST /api/login` - 使用者登入
- `GET /api/user/:id` - 獲取使用者資訊
- `PUT /api/user/:id` - 更新使用者資訊
- `DELETE /api/user/:id` - 刪除使用者

### 前端功能
- 響應式設計 (Bootstrap 5)
- 使用者認證與授權
- 角色權限管理
- 動態頁面切換
- Toast 通知系統
- 可愛的恐龍動畫

### 資料庫結構
MongoDB 集合:
- `users` - 使用者資料
- `students` - 學生資料
- `staff` - 教職員資料
- `courses` - 課程資料
- `grades` - 成績資料

## 故障排除

### 常見問題
1. **MongoDB 連接失敗**
   - 確認 MongoDB 服務已啟動
   - 檢查連接字串是否正確

2. **依賴安裝失敗**
   - 清除 npm 快取: `npm cache clean --force`
   - 刪除 `node_modules` 重新安裝

3. **連接埠衝突**
   - 修改 `.env` 檔案中的 `PORT` 設定
   - 或者終止佔用 3000 連接埠的程序

### 日誌查看
開發模式下會在控制台輸出詳細的日誌資訊，包括：
- 伺服器啟動資訊
- 資料庫連接狀態
- API 請求記錄
- 錯誤訊息

## 部署說明
生產環境部署時請：
1. 設定正確的環境變數
2. 使用 PM2 或類似工具管理程序
3. 配置 Nginx 反向代理
4. 啟用 HTTPS
5. 定期備份資料庫

## 貢獻指南
1. Fork 專案
2. 建立功能分支
3. 提交變更
4. 發起 Pull Request

## 授權
MIT License
