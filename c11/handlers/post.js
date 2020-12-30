const postsModel = require('../pkg/post');
const postsValidator = require('../pkg/post/validation');

const create = async (req, res) => {
    try {
        await postsValidator.validate(req.body, postsValidator.postSchema);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad Request!');
    }
    req.body._deleted = false;
    req.body._created = new Date().toISOString();
    req.body.user={
        id:req.user.uid,
        first_name:req.user.first_name,
        last_name:req.user.last_name
    };
    try {
        let p = await postsModel.create(req.body);
        res.status(201).send(p)
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }

};
const list = async (req, res) => {
    try {
        let data = await postsModel.list();
        return res.status(200).send(data)
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
};

const details = async (req, res) => {
    try {
        let data = await postsModel.details(req.params.id);
        return res.status(200).send(data)
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
};

const update = async (req, res) => {
    try {
        let a = await postsModel.update(req.params.id, req.body,req.user);
        if (!a) {
            return res.status(400).send('Bad Request!');
        }
        return res.status(201).send('ok');
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
};

const remove = async (req, res) => {
    try {
        let a = await PostsModel.remove(req.params.id,req.user);
        if (!a) {
            return res.status(400).send('Bad Request!');
        }
        return res.status(201).send('ok');
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
};

const search = async (req, res) => {
    try {
        let data = await postsModel.getTag(req.query.tag);
        return res.status(200).send(data)
    } catch (err) {
        console.log(err);
        return res.status(500).send('internal server error');
    }
};

module.exports = {
    create,
    list,
    details,
    update,
    remove,
    search
}