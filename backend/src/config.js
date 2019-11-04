import dotenv from "dotenv";

dotenv.config();
dotenv.config({path: '.env'});

const env = process.env;
const cloudinary  = require('cloudinary').v2;

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
});

export default cloudinary;