const {Router} = require("express")
const multer = require("multer");
const path = require("path")

const Blog = require("../models/blog");

const router = Router();

//this code is for storing input image
//to public->uploads folder using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // cb(null, path.resolve(`./public/uploads/${req.user._id}`))
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null,fileName);
    }
  })
const upload = multer({ storage: storage })

router.get('/add-new',(req,res) => {
    return res.render('addBlog',{
        user: req.user,
    })
})

router.post('/', upload.single('coverImage') , async(req,res) => {
    const {title,body} = req.body;
    console.log(req.body);
    console.log(req.file);

    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.file.filename}`
    })
    // res.redirect(`/blog/${blog._id}`);
    res.redirect(`/`);
})

module.exports = router;