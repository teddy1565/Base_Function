const crypto = require('crypto');

/**
* AES-256-ECB 加密
* @param data 待加密內容
* @param key 必須為32位私鑰
* @returns {string}
*/
function encryption(data, key, iv) {
    iv = iv || "";
    let clearEncoding = 'utf8';
    let cipherEncoding = 'base64';
    let cipherChunks = [];
    let cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
}

/**
* AES-256-ECB 解密
* @param data 待解密內容
* @param key 必須為32位私鑰
* @returns {string}
*/
function decryption(data, key, iv) {
    if (!data) {
        return "";
    }
    iv = iv || "";
    let clearEncoding = 'utf8';
    let cipherEncoding = 'base64';
    let cipherChunks = [];
    let decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));
    return cipherChunks.join('');
}

module.exports = { encryption, decryption };