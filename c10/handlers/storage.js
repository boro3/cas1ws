const fs = require('fs');
const strings = require('../pkg/strings');


const storeFile = async (req, res) => {
    console.log(req.files);

    let allowedTypes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif'
    ];

    if (!allowedTypes.includes(req.files.document.mimetype)) {
        return res.status(400).send('Bad Requst!: Bad Type');
    }

    let allowedSize = 1 * 1024 * 1024;

    if (allowedSize <= req.files.document.size) {
        return res.status(400).send('Bad Request!: File too large!');
    }

    //check if user directory exusts if not create
    let userDir = `${__dirname}/../uploads/${req.user.uid}`

    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
    }

    let fileName = `${strings.makeID(8)}_${req.files.document.name.replace(/ /g, '_')}`
    let filePath = `${userDir}/${fileName}`;

    try {
        await req.files.document.mv(filePath);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

    res.status(200).send('ok');
};



const getFile = (req, res) => {
    let userDir = `${__dirname}/../uploads/${req.user.uid}`
    let fileName = req.params.fid;
    let filePath = `${userDir}/${fileName}`;
    
    if (!fs.existsSync(filePath)) {
        res.status(404).send('File Not Found');
    }
    res.download(filePath);
};

module.exports = {
    storeFile,
    getFile
};