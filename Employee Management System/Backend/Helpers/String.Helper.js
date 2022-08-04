module.exports = class StringHelper {

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