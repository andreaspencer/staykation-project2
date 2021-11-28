require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.handler = async (event) => {
    const fileStr = event.body;
    const res = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'ml_default',
    });
    console.log(res);
    console.log(fileStr);
    return {
        statusCode: 200,
        body: JSON.stringify(res),
    };
};