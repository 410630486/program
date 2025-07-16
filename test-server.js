// 測試伺服器
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Test server is running!' });
});

app.listen(PORT, () => {
    console.log(`測試伺服器運行在 http://localhost:${PORT}`);
});
