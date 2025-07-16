# 校務系統 - 學生API功能說明

## 概述
本系統完整實現了校務系統的學生功能模組，包含學生資訊管理、課程表查詢、成績查詢、選課系統、學雜費管理、活動報名和公告系統等七大功能。

## 系統架構

### 技術棧
- **後端**: Node.js + Express.js
- **前端**: HTML5 + CSS3 + JavaScript + Bootstrap 5
- **資料庫**: MongoDB (目前使用模擬資料)
- **驗證**: JWT Token
- **API設計**: RESTful API

### 目錄結構
```
program/
├── api/                    # API路由
│   └── student/           # 學生相關API
│       ├── info.js        # 學生資訊管理
│       ├── schedule.js    # 課程表查詢
│       ├── grades.js      # 成績查詢
│       ├── enrollment.js  # 選課系統
│       ├── fees.js        # 學雜費管理
│       ├── activities.js  # 活動報名
│       └── announcements.js # 公告系統
├── middleware/            # 中介軟體
│   ├── auth.js           # JWT驗證
│   └── errorHandler.js   # 錯誤處理
├── models/               # 資料模型
│   ├── Student.js        # 學生資料模型
│   ├── Course.js         # 課程資料模型
│   ├── Grade.js          # 成績資料模型
│   ├── Enrollment.js     # 選課資料模型
│   ├── Fee.js            # 費用資料模型
│   ├── Activity.js       # 活動資料模型
│   └── Announcement.js   # 公告資料模型
├── database/             # 資料庫設定
├── index.html           # 前端主頁面
├── server.js            # 主伺服器
├── test-api.js          # API測試腳本
└── package.json         # 專案設定
```

## 學生API功能詳細說明

### 1. 學生資訊管理 (`/api/student/info`)

#### 功能特色
- 完整的學生資料查詢與更新
- 支援基本資料、詳細資料、聯絡資料、家庭資料
- 資料驗證與權限控制

#### 主要端點
- `GET /api/student/info/basic` - 查詢基本資料
- `GET /api/student/info/detailed` - 查詢詳細資料
- `GET /api/student/info/contact` - 查詢聯絡資料
- `GET /api/student/info/family` - 查詢家庭資料
- `PUT /api/student/info/contact` - 更新聯絡資料
- `PUT /api/student/info/password` - 修改密碼

### 2. 課程表查詢 (`/api/student/schedule`)

#### 功能特色
- 多種課程表查詢方式
- 支援考試時間查詢
- 課程詳細資訊展示
- 時間衝突檢查

#### 主要端點
- `GET /api/student/schedule/current` - 查詢當前學期課程表
- `GET /api/student/schedule/today` - 查詢今日課程
- `GET /api/student/schedule/week` - 查詢指定週課程
- `GET /api/student/schedule/course/:courseId` - 查詢課程詳情
- `GET /api/student/schedule/exams` - 查詢考試時間表

### 3. 成績查詢 (`/api/student/grades`)

#### 功能特色
- 多維度成績查詢
- GPA計算與統計
- 成績趨勢分析
- 排名資訊

#### 主要端點
- `GET /api/student/grades/semester/:semester` - 查詢學期成績
- `GET /api/student/grades/history` - 查詢歷年成績
- `GET /api/student/grades/course/:courseId` - 查詢課程成績
- `GET /api/student/grades/statistics` - 查詢成績統計
- `GET /api/student/grades/transcript` - 查詢成績單

### 4. 選課系統 (`/api/student/enrollment`)

#### 功能特色
- 智能選課推薦
- 時間衝突檢查
- 選課歷史記錄
- 加退選管理

#### 主要端點
- `GET /api/student/enrollment/available` - 查詢可選課程
- `GET /api/student/enrollment/enrolled` - 查詢已選課程
- `POST /api/student/enrollment/enroll` - 加選課程
- `DELETE /api/student/enrollment/drop/:courseId` - 退選課程
- `GET /api/student/enrollment/conflicts` - 查詢選課衝突

### 5. 學雜費管理 (`/api/student/fees`)

#### 功能特色
- 完整的費用管理系統
- 支援多種繳費方式
- 繳費記錄查詢
- 欠費提醒

#### 主要端點
- `GET /api/student/fees/overview` - 查詢費用總覽
- `GET /api/student/fees/unpaid` - 查詢未繳費用
- `GET /api/student/fees/payments` - 查詢繳費記錄
- `POST /api/student/fees/pay` - 繳費處理
- `GET /api/student/fees/receipt/:paymentId` - 查詢繳費收據

### 6. 活動報名 (`/api/student/activities`)

#### 功能特色
- 豐富的校園活動管理
- 線上報名系統
- 活動歷史記錄
- 報名狀態追蹤

#### 主要端點
- `GET /api/student/activities/available` - 查詢可報名活動
- `GET /api/student/activities/registered` - 查詢已報名活動
- `POST /api/student/activities/register` - 報名活動
- `DELETE /api/student/activities/cancel/:activityId` - 取消報名
- `GET /api/student/activities/history` - 查詢活動歷史

### 7. 公告系統 (`/api/student/announcements`)

#### 功能特色
- 多類別公告管理
- 優先級區分
- 已讀/未讀狀態
- 公告搜尋功能

#### 主要端點
- `GET /api/student/announcements` - 查詢公告列表
- `GET /api/student/announcements/:id` - 查詢公告詳情
- `POST /api/student/announcements/:id/read` - 標記已讀
- `GET /api/student/announcements/urgent` - 查詢緊急公告
- `GET /api/student/announcements/unread/count` - 查詢未讀數量

## 驗證與權限

### JWT Token驗證
所有API都需要有效的JWT Token進行身份驗證：
```javascript
Authorization: Bearer <token>
```

### 權限控制
- 所有學生API僅允許學生角色存取
- 支援細粒度的權限控制
- 資料安全性保護

## 錯誤處理

### 統一錯誤格式
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "錯誤訊息",
    "details": "詳細錯誤資訊"
  }
}
```

### 常見錯誤碼
- `401` - 未授權 (Token無效或過期)
- `403` - 禁止存取 (權限不足)
- `404` - 資源不存在
- `400` - 請求參數錯誤
- `500` - 伺服器內部錯誤

## 測試與部署

### 本地測試
```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 執行API測試
node test-api.js
```

### API測試工具
專案包含完整的API測試腳本 (`test-api.js`)，支援：
- 自動登入取得Token
- 全面的API功能測試
- 詳細的測試報告

### 部署設定
```bash
# 生產環境啟動
npm start

# 環境變數設定
PORT=3000
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb://localhost:27017/school_system
```

## 開發規範

### API設計原則
1. **RESTful設計** - 遵循REST API設計規範
2. **統一回應格式** - 所有API使用統一的回應格式
3. **錯誤處理** - 完整的錯誤處理機制
4. **安全性** - JWT驗證與權限控制
5. **擴展性** - 模組化設計，易於擴展

### 程式碼規範
- 使用ES6+語法
- 遵循Express.js最佳實踐
- 完整的註釋與文件
- 錯誤處理與日誌記錄

## 系統特色

### 1. 完整性
- 覆蓋所有學生相關功能
- 從基本資訊到複雜業務邏輯
- 支援多種查詢與操作方式

### 2. 可靠性
- 完善的錯誤處理機制
- 資料驗證與安全控制
- 權限管理與存取控制

### 3. 易用性
- 直觀的API設計
- 清晰的文件說明
- 完整的測試工具

### 4. 可擴展性
- 模組化的系統架構
- 易於添加新功能
- 支援多種資料庫後端

## 未來規劃

### 短期目標
1. 完成教師/職員API (T-019 to T-026)
2. 實現後端管理功能 (T-027 to T-034)
3. 完成人事管理系統 (T-035 to T-041)
4. 實現系統管理功能 (T-042 to T-048)

### 長期目標
1. 整合真實資料庫
2. 實現即時通知系統
3. 支援移動端應用
4. 進階數據分析功能

## 技術支援

如需技術支援或有問題回報，請聯繫開發團隊。

---

**注意**: 本系統目前使用模擬資料進行開發和測試，實際部署時需要連接真實的MongoDB資料庫。
