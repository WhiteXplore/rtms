import CryptoJS from "crypto-js";

const SECRET_KEY = CryptoJS.enc.Utf8.parse(
  process.env.VUE_APP_SECRET_KEY || "your-very-secure-key"
);

export function encryptData(data) {
  const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Return IV + Encrypted data (Base64 encoded)
  return iv.toString(CryptoJS.enc.Base64) + ":" + encrypted.toString();
}

export function decryptData(encryptedData) {
  const [ivBase64, encryptedText] = encryptedData.split(":");
  const iv = CryptoJS.enc.Base64.parse(ivBase64);

  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
