// 簡化的資料庫替代方案 - 使用 JSON 檔案儲存
const fs = require('fs').promises;
const path = require('path');

class SimpleDatabase {
    constructor() {
        this.dataDir = path.join(__dirname, 'data');
        this.usersFile = path.join(this.dataDir, 'users.json');
        this.studentsFile = path.join(this.dataDir, 'students.json');
        this.staffFile = path.join(this.dataDir, 'staff.json');
        this.coursesFile = path.join(this.dataDir, 'courses.json');
        this.gradesFile = path.join(this.dataDir, 'grades.json');
        
        this.initializeData();
    }
    
    async initializeData() {
        try {
            // 建立資料目錄
            await fs.mkdir(this.dataDir, { recursive: true });
            
            // 初始化使用者資料
            const defaultUsers = [
                {
                    id: 1,
                    username: 'admin',
                    password: '123456',
                    name: '系統管理員',
                    email: 'admin@school.edu.tw',
                    userType: 'admin',
                    department: '資訊中心',
                    status: 'active',
                    createdAt: new Date().toISOString(),
                    lastLogin: null
                },
                {
                    id: 2,
                    username: 'hr',
                    password: '123456',
                    name: '人事主管',
                    email: 'hr@school.edu.tw',
                    userType: 'hr',
                    department: '人事部',
                    status: 'active',
                    createdAt: new Date().toISOString(),
                    lastLogin: null
                },
                {
                    id: 3,
                    username: 'staff',
                    password: '123456',
                    name: '教職員',
                    email: 'staff@school.edu.tw',
                    userType: 'staff',
                    department: '教務處',
                    status: 'active',
                    createdAt: new Date().toISOString(),
                    lastLogin: null
                },
                {
                    id: 4,
                    username: 'student',
                    password: '123456',
                    name: '學生',
                    email: 'student@school.edu.tw',
                    userType: 'student',
                    department: '資訊工程系',
                    studentId: '20240001',
                    status: 'active',
                    createdAt: new Date().toISOString(),
                    lastLogin: null
                }
            ];
            
            // 初始化學生資料
            const defaultStudents = [
                {
                    id: 1,
                    studentId: '20240001',
                    name: '張小明',
                    email: 'student1@school.edu.tw',
                    department: '資訊工程系',
                    grade: 2,
                    class: 'A',
                    phone: '0912345678',
                    address: '台北市信義區信義路五段7號',
                    guardian: '張大明',
                    guardianPhone: '0987654321',
                    enrollmentDate: '2023-09-01',
                    status: 'active'
                },
                {
                    id: 2,
                    studentId: '20240002',
                    name: '李小華',
                    email: 'student2@school.edu.tw',
                    department: '電機工程系',
                    grade: 3,
                    class: 'B',
                    phone: '0923456789',
                    address: '台北市大安區敦化南路二段76號',
                    guardian: '李大華',
                    guardianPhone: '0976543210',
                    enrollmentDate: '2022-09-01',
                    status: 'active'
                }
            ];
            
            // 初始化教職員資料
            const defaultStaff = [
                {
                    id: 1,
                    employeeId: 'T001',
                    name: '王教授',
                    email: 'prof.wang@school.edu.tw',
                    department: '資訊工程系',
                    position: '教授',
                    phone: '02-12345678',
                    office: '工學大樓 501',
                    specialization: '人工智慧',
                    hireDate: '2020-08-01',
                    status: 'active'
                },
                {
                    id: 2,
                    employeeId: 'T002',
                    name: '陳副教授',
                    email: 'prof.chen@school.edu.tw',
                    department: '電機工程系',
                    position: '副教授',
                    phone: '02-12345679',
                    office: '工學大樓 502',
                    specialization: '電路設計',
                    hireDate: '2019-08-01',
                    status: 'active'
                }
            ];
            
            // 初始化課程資料
            const defaultCourses = [
                {
                    id: 1,
                    courseCode: 'CS101',
                    courseName: '程式設計概論',
                    instructor: '王教授',
                    department: '資訊工程系',
                    credits: 3,
                    semester: '113-1',
                    schedule: '週一 14:10-17:00',
                    classroom: '電腦教室A',
                    capacity: 50,
                    enrolled: 35,
                    status: 'active'
                },
                {
                    id: 2,
                    courseCode: 'EE201',
                    courseName: '電路學',
                    instructor: '陳副教授',
                    department: '電機工程系',
                    credits: 3,
                    semester: '113-1',
                    schedule: '週三 09:10-12:00',
                    classroom: '電機館 201',
                    capacity: 40,
                    enrolled: 28,
                    status: 'active'
                }
            ];
            
            // 初始化成績資料
            const defaultGrades = [
                {
                    id: 1,
                    studentId: '20240001',
                    courseCode: 'CS101',
                    courseName: '程式設計概論',
                    semester: '113-1',
                    midtermScore: 85,
                    finalScore: 90,
                    regularScore: 88,
                    totalScore: 88,
                    grade: 'A-',
                    credits: 3,
                    gpa: 3.7
                },
                {
                    id: 2,
                    studentId: '20240002',
                    courseCode: 'EE201',
                    courseName: '電路學',
                    semester: '113-1',
                    midtermScore: 78,
                    finalScore: 82,
                    regularScore: 80,
                    totalScore: 80,
                    grade: 'B+',
                    credits: 3,
                    gpa: 3.3
                }
            ];
            
            // 檢查並建立檔案
            await this.createFileIfNotExists(this.usersFile, defaultUsers);
            await this.createFileIfNotExists(this.studentsFile, defaultStudents);
            await this.createFileIfNotExists(this.staffFile, defaultStaff);
            await this.createFileIfNotExists(this.coursesFile, defaultCourses);
            await this.createFileIfNotExists(this.gradesFile, defaultGrades);
            
            console.log('✅ 資料庫初始化完成');
            
        } catch (error) {
            console.error('❌ 資料庫初始化失敗:', error);
        }
    }
    
    async createFileIfNotExists(filePath, defaultData) {
        try {
            await fs.access(filePath);
            console.log(`📁 ${path.basename(filePath)} 已存在`);
        } catch {
            await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
            console.log(`📝 已建立 ${path.basename(filePath)}`);
        }
    }
    
    async readFile(filePath) {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`讀取檔案失敗: ${filePath}`, error);
            return [];
        }
    }
    
    async writeFile(filePath, data) {
        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
            return true;
        } catch (error) {
            console.error(`寫入檔案失敗: ${filePath}`, error);
            return false;
        }
    }
    
    // 使用者相關方法
    async getAllUsers() {
        return await this.readFile(this.usersFile);
    }
    
    async getUserByUsername(username) {
        const users = await this.getAllUsers();
        return users.find(user => user.username === username);
    }
    
    async getUserById(id) {
        const users = await this.getAllUsers();
        return users.find(user => user.id === parseInt(id));
    }
    
    async updateUser(id, userData) {
        const users = await this.getAllUsers();
        const userIndex = users.findIndex(user => user.id === parseInt(id));
        
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...userData };
            await this.writeFile(this.usersFile, users);
            return users[userIndex];
        }
        return null;
    }
    
    async deleteUser(id) {
        const users = await this.getAllUsers();
        const filteredUsers = users.filter(user => user.id !== parseInt(id));
        
        if (filteredUsers.length < users.length) {
            await this.writeFile(this.usersFile, filteredUsers);
            return true;
        }
        return false;
    }
    
    // 學生相關方法
    async getAllStudents() {
        return await this.readFile(this.studentsFile);
    }
    
    async getStudentById(id) {
        const students = await this.getAllStudents();
        return students.find(student => student.studentId === id);
    }
    
    // 教職員相關方法
    async getAllStaff() {
        return await this.readFile(this.staffFile);
    }
    
    async getStaffById(id) {
        const staff = await this.getAllStaff();
        return staff.find(member => member.employeeId === id);
    }
    
    // 課程相關方法
    async getAllCourses() {
        return await this.readFile(this.coursesFile);
    }
    
    async getCourseByCode(courseCode) {
        const courses = await this.getAllCourses();
        return courses.find(course => course.courseCode === courseCode);
    }
    
    // 成績相關方法
    async getAllGrades() {
        return await this.readFile(this.gradesFile);
    }
    
    async getGradesByStudentId(studentId) {
        const grades = await this.getAllGrades();
        return grades.filter(grade => grade.studentId === studentId);
    }
    
    async getGradesByCourseCode(courseCode) {
        const grades = await this.getAllGrades();
        return grades.filter(grade => grade.courseCode === courseCode);
    }
}

// 如果是直接執行此檔案，則初始化資料庫
if (require.main === module) {
    const db = new SimpleDatabase();
    console.log('🚀 正在初始化資料庫...');
}

module.exports = SimpleDatabase;
