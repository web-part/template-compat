


/**
* RSA 非对称加密。
*
* 后端生成一对密钥：公钥和私钥。 
* 后台公开提供公钥给前端用于加密文本，同时后台保留私钥用于解密前端发过去的密文。
* 只要后台妥善保管好私钥，RSA 算法就是安全的。
*/
define('RSA', function (require, module, exports) {

    //来源：https://github.com/travist/jsencrypt
    var JSEncrypt = window.JSEncrypt;

    if (!JSEncrypt) {
        throw new Error('无可用的 JSEncrypt 构造函数。 请检查是否引入了 RSA 的第三方库。');
    }


    //默认的公钥(由后台提供)。
    var publicKey =

`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDReQKJ/7khU6RpRZPgMFm6la7a
/AKFvagx3KE1P72l5b/KvHtSal8LXsAWDHxlswwDmhX0PWEWTH5Q3gaAej7eEhLv
EWzfe45xYjGNyMrgwmfdzPbjmWgplBp062kvW6GhqtK/Je2U9sCOo0CtuAQGTxq5
8PM0VKh8vpnH0aVTQwIDAQAB
-----END PUBLIC KEY-----`;

    






    return {
        /**
        * 加密指定的文本内容。
        * 已重载 encrypt(text);        //使用默认的公钥加密指定的文本内容。
        * 已重载 encrypt(text, key);   //使用指定的公钥加密指定的文本内容。
        */
        encrypt: function (text, key) {
            var encoder = new JSEncrypt();

            key = key || publicKey;

            encoder.setPublicKey(key);

            text = encoder.encrypt(text);

            return text;
        },

    };


});


 