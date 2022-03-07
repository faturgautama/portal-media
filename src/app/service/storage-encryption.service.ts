import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

var SECRET_LOCALSTORAGE_KEY = `${environment.secretKey.localStorageKey}`;

const CryptoJS = require('crypto-js');
const SecureStorage = require('secure-web-storage');

@Injectable({
    providedIn: 'root'
})
export class StorageEncryptionService {

    constructor() { }

    public secureStorage = new SecureStorage(localStorage, {
        hash: function hash(key: any) {
            key = CryptoJS.SHA256(SECRET_LOCALSTORAGE_KEY);

            return key.toString();
        },

        encrypt: function encrypt(data: any) {
            data = CryptoJS.AES.encrypt(data, SECRET_LOCALSTORAGE_KEY);
            data = data.toString();

            return data;
        },

        decrypt: function decrypt(data: any) {
            data = CryptoJS.AES.decrypt(data, SECRET_LOCALSTORAGE_KEY);
            data = data.toString(CryptoJS.enc.Utf8);

            return data;
        }
    })

    setItem(key: string, value: any) {
        this.secureStorage.setItem(key, value);
    }

    getItem(key: string) {
        return this.secureStorage.getItem(key);
    }

    removeItem(key: string) {
        return this.secureStorage.removeItem(key);
    }

    clear() {
        return this.secureStorage.clear();
    }

    encryptSHA1(data: any) {
        data = CryptoJS.SHA1("Encrypt" + data + "MahkotaPemudaKreatif");
        data = data.toString();

        return data;
    }

    customAESEncrypt(data: any, secret_key: any) {
        return CryptoJS.AES.encrypt(data, secret_key).toString();
    }

    customAESDecrypt(data: any, secret_key: any) {
        return CryptoJS.AES.decrypt(data, secret_key).toString(CryptoJS.enc.Utf8);
    }

    encrypt(data: any, key = "") {
        if (key == "") key = SECRET_LOCALSTORAGE_KEY;

        data = CryptoJS.AES.encrypt(data, key);
        data = data.toString();
        return data;
    }

    decrypt(data: any, key = "") {
        if (key == "") key = SECRET_LOCALSTORAGE_KEY;

        data = CryptoJS.AES.decrypt(data, key);
        data = data.toString(CryptoJS.enc.Utf8);
        return data;
    }
}
