const fs = require('fs');

const writeJSONFile = (f, data) => {
    return new Promise((success, fail) => {
        fs.writeFile(f, JSON.stringify(data), err => {
            if(err) {
                return fail(err);
            }
            return success();
        });
    });
};

const readJSONFile = (f) => {
    return new Promise((success, fail) => {
        fs.readFile(f, 'utf8', (err, data) => {
            if(err) {
                return fail(err);
            }
            return success(JSON.parse(data));
        });
    });
};

module.exports = {
    writeJSONFile,
    readJSONFile
};