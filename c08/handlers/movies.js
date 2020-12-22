const movieModel = require('../pkg/movies');

const save = async (req, res) => {
    try {
        let data = {
            ...req.body,
            uid: req.user.uid
        }
        console.log(req.user)
        await movieModel.save(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }
};

const getAll = async (req, res) => {
    try {
      let data= await movieModel.getAll(req.user.uid)
     return res.status(200).send(data)
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
};

module.exports = {
    save,
    getAll
}


