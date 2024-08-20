let{savedata,adminLogin}=require("../modals/sign_up")
let jwt = require("jsonwebtoken");
let secretKey = "your-secret-key";
//sign_in work
let postData=async(req,res)=>{
let data=req.body;
console.log("post data sign up====>",data);
let respose= await savedata(data);
return respose;
}
// login work
let loginData=async(req,res)=>{
  let data=req.body;
  let email=data.email;
  console.log("here is email front end email",email);
try {
  let check=await adminLogin(data);

  if (check == false) {
    res.send({ message: "Your passsword is not correct" });
  } else {
    jwt.sign({ email }, secretKey, { expiresIn: "1h" }, (err, token) => {
      if(err){
       res.json("JWT Expire");
      }else{
      return res.status(200).json({ token: token});
      }
    });
  };
} catch (error) {
  console.log("error  come",error);
};
};
module.exports={postData,loginData}