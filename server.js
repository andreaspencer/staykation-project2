const express = require('express')
const app = express()

app.set('viewengine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Austin'})
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', (req, res) => {

})


app.listen(5000)
