import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import cloudinary from "../config";

dotenv.config();
dotenv.config({path: '.env'});
const env = process.env;

export const hash = (toHash, rounds) => {
  return bcrypt.hashSync(toHash, rounds);
};

export const verifyHash = (toVerify, hash) => {
  return !!bcrypt.compareSync(toVerify, hash);
};

export const genRandomIntInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const genToken = (min, max) => {
  return Array
      .apply(0, Array(8))
      .map(() => { return genRandomIntInRange(min, max); })
      .join('')
      .toString();
};

export async function sendEmail(to, subject, text) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(env.SENDGRID_API_KEY);
  const msg = {
    to: to,
    from: 'admin@sportify.cz',
    subject: subject,
    text: text,
  };
  await sgMail.send(msg);
}

export const genValidityDate = () => {
  const validity = new Date();
  validity.setDate(validity.getDate() + 1);
  return validity;
};

export async function uploadAvatarToCloudinary(filepath, params) {
  return await cloudinary.uploader
      .upload(filepath, params)
      .then(result =>  result)
      .catch(() => {
        throw {status: 500, msg: 'Nahrání avatara na server se nezdařilo'};
      });
}

export async function deleteAvatarFromCloudinary(public_id) {
  await cloudinary.uploader
      .destroy(public_id)
      .catch(() => {
        throw {status: 500, msg: 'Smazání původního avatara se nezdařilo'};
      });
}