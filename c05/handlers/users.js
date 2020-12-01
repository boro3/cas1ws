const usersModel = require("../pkg/users");

const getAll = async (req, res) => {
    try {
        let data = await usersModel.getAll();
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send("internal Sever Error")
    }
};

const getOne = async (req, res) => {
    try {
        let data = await usersModel.getOne(req.params.id);
        if (data) {
            return res.status(200).send(data);
        }
        return res.status(404).send("Not Found!");
    } catch (err) {
        console.log(err);
        return res.status(500).send("internal Sever Error")
    };
};

const save = async (req, res) => {
    try {
        await usersModel.save(req.body)
        return res.status(201).send("Created");
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error')
    }
};

const update = async (req, res) => {
    try {
        let c = await usersModel.update(req.params.id,req.body);
        if (c) {
            return res.status(204).send("no content");
        }
        return res.status(404).send("Not Found!");
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

const updatePartial = async (req, res) => {
    try {
        let c = await usersModel.updatePartial(req.body,req.params.id);
        if (c) {
            return res.status(204).send("no content");
        }
        return res.status(404).send("Not Found!");
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

const remove = async (req, res) => {
    try {
        let c = await usersModel.remove(req.params.id);
        if (c) {
            return res.status(204).send("no content");
        }
        return res.status(404).send("Not Found!");
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

module.exports = {
    getAll,
    getOne,
    save,
    update,
    updatePartial,
    remove
};