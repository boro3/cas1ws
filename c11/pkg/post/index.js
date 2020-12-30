const mongoose = require('mongoose');


const Posts = mongoose.model(
    'posts',
    {
        _deleted: Boolean,
        _created: Date,
        publish_date: Date,
        title: String,
        description: String,
        content: String,
        tags: [String],
        user: {
            first_name: String,
            last_name: String,
            id: String
        }
    },
    'posts'
);

const create = async (postData) => {
    let p = new Posts(postData);
    let data = await p.save();
    return data;
};

const list = async () => {
    let data = await Posts.find({ _deleted: false }).select({"title":1}).sort({ publish_date: 1 }).limit(10);
    return data;
};

const details = async (id) => {
    let data = await Posts.find({ _deleted: false, _id: id });
    return data;
};

const update = async (id, PostData,user) => {
    let data = await Posts.updateOne({ _id: id, _deleted: false, user:{first_name:user.first_name,last_name:user.last_name,id:user.id}}, PostData);
    return data.nModified !== 0;
};

const remove = async (id, user) => {
    let data = await Posts.updateOne({ _id: id, user:{first_name:user.first_name,last_name:user.last_name,id:user.id} }, { _deleted: true });
    return data.nModified !== 0;
};

const getTag = async (tag) => {
    let data = await Posts.find({ _deleted: false, tags: tag });
    return data;
};


module.exports = {
    create,
    list,
    details,
    update,
    remove,
    getTag
}



