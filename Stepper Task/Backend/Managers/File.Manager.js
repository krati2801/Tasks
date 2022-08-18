const fs = require('fs');
const path = require('path');
const multer = require('multer');

// PATH DATA OF WHERE TO STORE FILES
const { PATHS } = require("../Configs/constants");
const { IMAGES } = PATHS;

// SAVE THIS TEMP FOLDER PATH ONE TIME
let tempPath = {
    original: path.join(__dirname, "./../Assets/Images" + IMAGES.TEMP + IMAGES.ORIGINAL + "/")
}
tempPath[IMAGES.ORIGINAL] = tempPath.original

module.exports = class FileManager {

    //Multer setup
    static upload() {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                console.log("img", tempPath.original);
                console.log("req", req.body)
                cb(null, tempPath.original)
            },
            filename: function (req, file, cb) {
                let fileName = FileManager.getNameFormFileName(file.originalname)
                if (!req.body[file.fieldname]) {
                    req.body[file.fieldname] = []
                }
                req.body[file.fieldname].push(fileName)
                cb(null, fileName)
            }
        })

        return multer({ storage })
    }

    static getNameFormFileName(fileName) {
        return fileName.split('.')[0].replace(/[^A-Z0-9]/ig, "_") + '_' + Date.now() + '_' + Math.floor(Math.random() * 999) + 99 + path.extname(fileName);
    }

    //Get url 
    static getUrl(pathName, fileName) {
        const key = pathName + "/" + fileName
        return `http://localhost:5000/Images/Temp${key}`
    }

    static removeFile(fileName){
        return fs.unlink(tempPath.original + fileName, function(err) {
            if (err) console.log(err)
        })
    }

}