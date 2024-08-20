const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
let{saveProduct,showAll,getAll}=require('../modals/product');
//cloudinar path
cloudinary.config({
    cloud_name: 'drqm7scy2',
    api_key: '655259685382345',
    api_secret: 'LqWnTHENlF8wD9usgc7HyChSgro'
});
// token verification and decoding
function verifyToken(req, res, next) {
    const secret_key = "your-secret-key";
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        jwt.verify(bearerToken, secret_key, (err, decodedToken) => {
            if (err) {
                console.error("JWT verification error:", err);
                return res.sendStatus(403);
            } else {
                req.email = decodedToken.email; 
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
  }
//product save work
let product=async(req,res)=>{
    let {...data}=req.body;
    let {...imgFile}=req.file;
    let email = req.email; 
  // Resize and compress image
        await sharp(imgFile.path)
            .resize(400, 400)
            // .toFile(path.join(__dirname, "../", 'images', `${imgFile.filename}_overview1.jpg`));

        // Upload image to Cloudinary
        const img1Cloudinary = await cloudinary.uploader.upload(imgFile.path);
        console.log("cloud path:=>",img1Cloudinary);

   let saveUser= await saveProduct(data,img1Cloudinary,email);
   console.log("after save user in db",saveUser);
    res.json({saveUser})
}
//product show all work
let allProducts=async(req,res)=>{
    let email = req.email; 
    let showUser= await showAll(email);
    console.log("db data=>",showUser);
    res.json(showUser)
}
//product user show
let showProducts=async(req,res)=>{
    console.log("api called show  products to user");
    let showUser= await getAll();
    console.log("db data=>",showUser);
    res.json(showUser)
}
module.exports={product,verifyToken,allProducts,showProducts}