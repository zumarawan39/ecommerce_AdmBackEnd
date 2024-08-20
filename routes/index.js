let express=require("express");
let multer=require("multer")
let route=express.Router();
let {postData,loginData}=require("../controllers/sign_in_up")
let {product,verifyToken,allProducts,showProducts}=require('../controllers/product')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

route.post("/signUp",postData);
route.post("/login",loginData);
route.post("/productupload",verifyToken, upload.single('file'),product);
route.get("/getAll",verifyToken,allProducts);
route.get("/userAll",showProducts);

module.exports={route}; 