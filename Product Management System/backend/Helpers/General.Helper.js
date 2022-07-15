const moment = require('moment')
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


const randomstring = require("randomstring");
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.ENCRYPTION_SALT_ROUNDS);

module.exports = class GeneralHelper {

    //Multer setup
    static upload() {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, tempPath.original)
            },
            filename: function (req, file, cb) {
                let fileName = GeneralHelper.getNameFormFileName(file.originalname)
                if (!req.body[file.fieldname]) {
                    req.body[file.fieldname] = []
                }
                let fileExt = path.extname(file.originalname);
            
                if (fileExt !== '.jpg' && fileExt !== '.png'){
                   return cb({msg: "VALIDATION.IMAGE"});
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

    static getDefaultImage(){
        return `http://localhost:5000/Images/Temp/Original/default_product_1657605986885_90699.jpg`
    }

    generateAuthToken() {
        return this.bcrypt(randomstring.generate(25));
    }

    bcrypt(data) {
        return bcrypt.hashSync(data.toString(), bcrypt.genSaltSync(saltRounds), null);
    }

    compareBcrypt(entity, encryptEntity) {
        return bcrypt.compareSync(entity, encryptEntity);
    }

    static getDate(str){
        return moment(str, "YYYY-DD-MM", true)
    }

    static ageFromDateOfBirthday(dateOfBirth) {
        return moment().diff(dateOfBirth, 'years')
    }

    static getDateAfterMinutes(minutes) {
        return moment().add(minutes, 'm').toDate()
    }

    static getDateBeforeDays(days) {
        return moment().subtract(days, 'days').toDate()
    }

    static isDateGone(date) {
        return moment().isAfter(moment(date))
    }

    static getDateBeforeHours(date, time, hours) {
        const formate = "MM-DD-YYYY hh:mm a Z"
        return moment(`${date} ${time} +00:00`, formate, true).subtract(hours, "hours").toDate()
    }

    static getTimeDiff(toDate) {
        return moment(toDate).diff(moment())
    }

    static getDateFromMS(ms) {
        return new Date(parseInt(ms))
    }
   
    static replaceInString(string, data) {
        for (const key in data) {
            string = string.replace(`{${key}}`, data[key])
        }
        return string;
    }

    static getCamelCased(str) {
        return str.toLowerCase().replace(/([-_][a-z])/g, group =>
            group
                .toUpperCase()
                .replace('-', '')
                .replace('_', '')
        )
    }

    static getRandomNameListFromName(name) {
        let nameList = []

        while (nameList.length <= 30) {
            let newName = name.replace(/ /g, '_').toLowerCase() + (Math.floor(Math.random() * 90 + 10))
            if (!nameList.includes(newName))
                nameList.push(newName)
        }
        return nameList
    }

    static changeExt(fileName, newExt) {
        var pos = fileName.includes(".") ? fileName.lastIndexOf(".") : fileName.length
        var fileRoot = fileName.substr(0, pos)
        var output = `${fileRoot}.${newExt}`
        return output
    }
}