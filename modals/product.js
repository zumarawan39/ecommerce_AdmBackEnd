const mongoose = require('mongoose');
// Define the schema for category information
// const categorySchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     logo: {
//       type: String
//     }
//   });
  
const productschema = new mongoose.Schema({
    adminEmail:String,
    name: String,
    description: String,
    imagePath: String,
    stock: Number,
    bestprize: Number,
    discountprize: Number,
    categoryId:String,
    status: String,

});
let modal=mongoose.model("product", productschema);
let Url="mongodb+srv://seebizbpt0623evdev41:l2Be11O5zei97LtK@tasks.fkxsczr.mongodb.net/";
//sign in work sav  e in db
const saveProduct = async (data,file,adminEmail) => {
    mongoose.connect(Url)
        .then(() => console.log("MongoDB is connected"))
        .catch((err) => console.log("Error connecting to MongoDB:", err));
    const user = new modal({
     adminEmail:adminEmail,
      name: data.name,
      description:data.description,
      imagePath:file.url,
      stock:data.stock,
      bestprize:data.bestprize,
      discountprize:data.discount,
      categoryId:data.category,
      status:data.status
    });
    let user1=await user.save();
    return user1;
  };
//get all products
const showAll=async(email)=>{
    mongoose.connect(Url)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));
    console.log("db email find=>",email);
    let result = await modal.find({ adminEmail: email });
  console.log("result of search db===>",result);
  if (result) {
    return result;
  } else {
    return "Add product";
  }
}
//show all to user
const getAll=async()=>{
    mongoose.connect(Url)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));
    let result = await modal.find({});
  console.log("result of search db===>",result);
  if (result) {
    return result;
  } else {
    return "No Product Available";
  }
}
module.exports={saveProduct,showAll,getAll}