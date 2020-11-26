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

const fileRead = (fileName) => {
    return new Promise((success, fail) => {
        fs.readFile(`./test/${fileName}`, 'utf8', (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        });
    });
};

const statForFile=(fileName)=>{
    return new Promise((success,fail)=>{
        fs.stat(`./test/${fileName}`,(err,stats)=>{
            if(err){
                return fail(err);
            }
            return success(stats);
        });
    });
};

const readAllFilesFromListAndStats = async (array) => {
    for (let file of array) {
        let text = await fileRead(file);
        let stats=await statForFile(file);
        console.log(stats);
        console.log("\n"+text);
    }
};

const wrapperReadDir = async (dir) => {
    let i=0;
    try {
        let files = await readDirectory(dir)
        console.log(`Files in ${dir} directory \n`);
        files.forEach(fileName=>{
            console.log(`${i}. ${fileName}`);
            i++;
        })
        console.log("\nContent of The Files and Stats")
        readAllFilesFromListAndStats(files);
    } catch (err) {
        console.log(err);
    }
};
wrapperReadDir('test');
