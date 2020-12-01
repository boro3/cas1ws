var fs = require("fs");

const readDirectory = (dir) => {
    return new Promise((success, fail) => {
        fs.readdir(`./${dir}/`, (err, files) => {
            if (err) {
                return fail(err);
            }
            return success(files);
        });
    });
};

const statForFile = (fileName, dir) => {
    return new Promise((success, fail) => {
        fs.stat(`./${dir}/${fileName}`, (err, stats) => {
            if (err) {
                return fail(err);
            }
            return success(stats);
        });
    });
};

const fileCopy = (fileToCopy, newName) => {
    return new Promise((succes, fail) => {
        fs.copyFile(fileToCopy, newName, err => {
            if (err) {
                return fail(err);
            }
            return succes();
        });
    });
};

const fileRead = (fileName, dir) => {
    return new Promise((success, fail) => {
        fs.readFile(`./${dir}/${fileName}`, 'utf8', (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        });
    });
};

const readAllFilesFromListAndStats = async (array, dir) => {
    for (let file of array) {
        let text = await fileRead(file, dir);
        let stats = await statForFile(file, dir);
        console.log(stats);
        console.log("\n" + text);
    }
};

const wrapperReadDir = async (dir) => {
    try {
        await fileCopy('./test/data1.txt', './test/copy.txt')
        let files = await readDirectory(dir);
        console.log(`Files in ${dir} directory \n`);
        files.forEach((fileName, i) => {
            console.log(`${i}. ${fileName}`);
        });
        console.log("\nContent of The Files and Stats");
        readAllFilesFromListAndStats(files, dir);
    } catch (err) {
        console.log(err);
    }
};

wrapperReadDir('test');
