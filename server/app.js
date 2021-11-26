const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysqlStore = require('connect-mysql')(session);
const { application } = require('express');
const auth = require('./lib/auth');

// app.use(cookieParser());

// app.use(session({
//     secret: process.env.SESS_NAME,
//     resave: true,
//     saveUninitialized: false,
//     store: new mysqlStore({}),
//     cookie: {
//         maxAge: TWO_HOURS,
//         sameSite: true,
//         secure: IN_PROD
//     }
// }))

app.use(auth.initialize);
app.use(auth.session);
app.use(auth.setUser);