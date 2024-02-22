const {Schema , model} = require('mongoose');

const blogSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        reqiured: true,
    },
    coverImageURL:{
        type: String,
        required: false,
    },
    createdBy:{
        type: Schema.Types.ObjectId,  //built in type
        ref: "user",  //ab created by users ki trf point krega
    }
},{timestamps: true});

const Blog = model('blog',blogSchema);

module.exports = Blog;
