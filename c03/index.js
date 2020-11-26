const fs = require('fs');

let text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
officia deserunt mollit anim id est laborum.`;


// fs.writeFile('data.txt', text, err => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log('Successful write!');

//     fs.readFile('data.txt', 'utf8', (err, data) => {
//         if (err) {
//             return console.log(err);
//         }
//         console.log(data);

//         fs.appendFile('data.txt', `\n\n🐯🐯🐯🐯🐯🐯🐯`, err => {
//             if (err) {
//                 return console.log(err);
//             }
//             console.log('Successful append!');
//         });
//     });
// });

const fileWrite = async (file, content) => {
    return new Promise((success, fail) => {
        fs.writeFile(file, content, err => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};

const fileAppend = async (file, content) => {
    return new Promise((success, fail) => {
        fs.appendFile(file, content, err => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};

const fileRead = async (file) => {
    return new Promise((success, fail) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        });
    });
};

// fileWrite('data.txt',text)
// .then(()=>{
//     console.log('Successful write with promise!');
// })
// .catch(err=>{
//     console.log(err);
// })

// fileAppend('data.txt',`\n\n😸\t😸\t😸\t😸`)
// .then(()=>{
//     console.log('Appended to File with promise!')
// })
// .catch(err=>{
//     console.log(err);
// })

// fileRead('data.txt')
// .then(data=>{
//     console.log(data);
// })
// .catch(err=>{
//     console.log(err);
// })


const fileOps = async () => {
    try {
        await fileWrite('data.txt', 'Janko');
        await fileAppend('data.txt', '😸😸😸😸');
        let c = await fileRead('data.txt');
        console.log(c);
    } catch (err) {
        console.log(err);
    }
};

fileOps();




