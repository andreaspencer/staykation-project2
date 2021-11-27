//const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysqlStore = require('connect-mysql')(session);
const { application } = require('express');
const auth = require('./lib/auth');

const submitBtn = document.getElementById('submitBtn');
const fileInput = document.getElementById('fileInput');
const gallery = document.getElementById('gallery');


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('submitting');
    const files = [...fileInput.files];
    files.forEach(files => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            uploadImage(reader.result)
        };
        reader.onerror = () => {
            console.error('Invalid');
        };
    }
        )
});

const uploadImage = async (base64EncodedImage) => {
    try {
        const res = await fetch('/.netlify/functions/upload', {
            method: 'POST',
            body: base64EncodedImage
        })
    } catch(err) {
        console.error(err);
    }
}

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    handleFiles(files);
});
    const handleFiles = () => {
    gallery.innerHTML = '';
    const copiedFiles = [...files]
    copiedFiles.forEach(previewFiles)
    }


const previewFiles = (file) => {
    const reader = new FileReader(); 
    reader.readAsDataURL(file);
    reader.onloadend = (data) => {
        console.log('Finished loading');
        const img = document.createElement('img');
        img.width = 300;
        img.src = reader.result;
        gallery.appendChild(img);

    }

}



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