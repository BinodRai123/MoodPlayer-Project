const ImageKit = require("imagekit");
const mongoose = require("mongoose");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

function uploadFile(file){
    return new Promise((res,rej) => {
        imagekit.upload({
            file:file.buffer,
            fileName:(new mongoose.Types.ObjectId()).toString(),
            folder:"audio"
        },(error,result) => {
            if(error){
                rej(error)
            }
            else{
                res(result);
            }
        })
    })
}

module.exports = uploadFile