const mongoose = require("mongoose");

const dns = 'mongodb+srv://borce_ss:boro!759780@cluster0.vw2pn.mongodb.net/users?retryWrites=true&w=majority'

mongoose.connect(dns,
    { useNewUrlParser: true, useUnifiedTopology: true }
)

