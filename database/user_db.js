// 使用者資料庫操作模組
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const url = 'mongodb://localhost:27017';
const dbName = 'school_system';

class UserDatabase {
    constructor() {
        this.client = null;
        this.db = null;
    }
    
    // 連接資料庫
    async connect() {
        this.client = new MongoClient(url);
        await this.client.connect();
        this.db = this.client.db(dbName);
        return this.db;
    }
    
    // 關閉連接
    async close() {
        if (this.client) {
            await this.client.close();
        }
    }
    
    // 新增使用者
    async createUser(userData) {
        try {
            const collection = this.db.collection('users');
            
            // 密碼加密
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            
            const user = {
                ...userData,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
                status: 'active'
            };
            
            const result = await collection.insertOne(user);
            return { success: true, userId: result.insertedId };
            
        } catch (error) {
            console.error('新增使用者錯誤:', error);
            return { success: false, error: error.message };
        }
    }
    
    // 驗證使用者登入
    async authenticateUser(username, password, userType) {
        try {
            const collection = this.db.collection('users');
            
            const user = await collection.findOne({ 
                username: username,
                userType: userType,
                status: 'active'
            });
            
            if (!user) {
                return { success: false, message: '使用者不存在' };
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);
            
            if (!isValidPassword) {
                return { success: false, message: '密碼錯誤' };
            }
            
            // 不返回密碼
            const { password: _, ...userWithoutPassword } = user;
            return { success: true, user: userWithoutPassword };
            
        } catch (error) {
            console.error('驗證使用者錯誤:', error);
            return { success: false, error: error.message };
        }
    }
    
    // 根據使用者名稱查找使用者
    async findUserByUsername(username) {
        try {
            const collection = this.db.collection('users');
            const user = await collection.findOne({ username: username });
            
            if (user) {
                const { password: _, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }
            
            return null;
            
        } catch (error) {
            console.error('查找使用者錯誤:', error);
            return null;
        }
    }
    
    // 根據使用者類型查找所有使用者
    async findUsersByType(userType) {
        try {
            const collection = this.db.collection('users');
            const users = await collection.find({ 
                userType: userType,
                status: 'active'
            }).toArray();
            
            // 移除密碼欄位
            return users.map(user => {
                const { password: _, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
            
        } catch (error) {
            console.error('查找使用者錯誤:', error);
            return [];
        }
    }
    
    // 更新使用者資料
    async updateUser(username, updateData) {
        try {
            const collection = this.db.collection('users');
            
            // 如果要更新密碼，需要加密
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            }
            
            updateData.updatedAt = new Date();
            
            const result = await collection.updateOne(
                { username: username },
                { $set: updateData }
            );
            
            return { success: true, modifiedCount: result.modifiedCount };
            
        } catch (error) {
            console.error('更新使用者錯誤:', error);
            return { success: false, error: error.message };
        }
    }
    
    // 刪除使用者 (軟刪除)
    async deleteUser(username) {
        try {
            const collection = this.db.collection('users');
            
            const result = await collection.updateOne(
                { username: username },
                { 
                    $set: { 
                        status: 'deleted',
                        deletedAt: new Date(),
                        updatedAt: new Date()
                    }
                }
            );
            
            return { success: true, modifiedCount: result.modifiedCount };
            
        } catch (error) {
            console.error('刪除使用者錯誤:', error);
            return { success: false, error: error.message };
        }
    }
    
    // 取得所有使用者統計
    async getUserStats() {
        try {
            const collection = this.db.collection('users');
            
            const stats = await collection.aggregate([
                { $match: { status: 'active' } },
                { $group: { _id: '$userType', count: { $sum: 1 } } }
            ]).toArray();
            
            return stats.reduce((acc, stat) => {
                acc[stat._id] = stat.count;
                return acc;
            }, {});
            
        } catch (error) {
            console.error('取得使用者統計錯誤:', error);
            return {};
        }
    }
}

module.exports = UserDatabase;
