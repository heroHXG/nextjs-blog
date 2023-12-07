const express = require('express');
const test = require('./test.json')

const app= express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/express', (req, res)=>{
    // res.send('Hello world');
    // res.send(JSON.stringify(test))
    res.send(test)
});
app.listen(8083, ()=>{
    console.log('Server is running at http://localhost:8083')
})
