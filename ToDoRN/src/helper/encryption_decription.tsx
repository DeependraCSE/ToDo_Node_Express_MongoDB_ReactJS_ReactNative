import CryptoJS from "crypto-js";
import { SECRET_KEY_ENV, IV_ENV } from '@env';
const SECRET_KEY = CryptoJS.enc.Utf8.parse(SECRET_KEY_ENV); // 32 chars = AES-256
const IV = CryptoJS.enc.Utf8.parse(IV_ENV); // 16 chars for IV

export const decryptData = (cipherText: string) => {
  const decrypted = CryptoJS.AES.decrypt(
    cipherText,
    SECRET_KEY,
    {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const encryptData = (data: string) => {
  const encrypted = CryptoJS.AES.encrypt(
    data,
    SECRET_KEY,
    {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString();
};
