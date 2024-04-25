const db = require("../../../models");
const { createSlug } = require('../../../helper');
const SubCategoriesMddel = db.SubCategory;
const CategorsModal = db.Category;
const ProductsModal = db.Product;

require('dotenv').config();
const { Op } = require('sequelize');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');


module.exports = {

  addNewproduct: async (req, res) => {
    let errorMessage = {};
    var message = "";
    let slug = "";
    let section_id="";
    let brand_id="";
    let category_id ="";
    let subcategory_id="";
    let productname="";
    let main_image="";
    let meta_description="";
    let meta_title ="";
    let meta_keywords ="";
    let description="";

    const form = new formidable.IncomingForm();
    try {
      form.on('field', (name, value) => {
        if (name == 'brand_id') {
          if (!value) {
            errorMessage.email = { message: "Brand Field Is Required" };
            message = "Brand Field Is Required";
          }
          else{
            brand_id = value;
          }
        }
        if (name == 'section_id') {
          if (!value) {
            errorMessage.email = { message: "Section Field Is Required" };
            message = "Section Field Is Required";
          }
          else{
            section_id = value;
          }
        }
        if (name == 'category_id') {
          if (!value) {
            errorMessage.email = { message: "Category Field Is Required" };
            message = "Category Field Is Required";
          }
          else{
            category_id = value;
          }
        }
        if (name == 'sub_category_id') {
          if (!value) {
            errorMessage.email = { message: "SubCategory Field Is Required" };
            message = "SubCategory Field Is Required";
          }
          else{
            subcategory_id = value;
          }
        }
        if (name == 'product_name') {
          if (!value) {
            errorMessage.email = { message: "Name Field Is Required" };
            message = "Name Field Is Required";
          }
          else{
            slug= createSlug(value);
            productname = value;
          }
        }
        if(name ==='meta_description'){
          if(value && value.length > 0 ) {
            meta_description = value;
          }
        }
        if(name ==='meta_title'){
          if(value && value.length > 0 ) {
            meta_title = value;
          }
        }
        if(name ==='meta_keywords'){
          if(value && value.length > 0 ) {
            meta_keywords = value;
          }
        }
        if(name==='description'){
          if(value && value.length > 0){
            description = value;
          }
        }
      });
      form.on('file', (name, file) => {
        file.field = name;
      });
      form.parse(req, async (err, fields, files) => {
        if (err) {
          // Handle error
          return next(err);
        }
        const productChecked = await ProductsModal.findOne({
          where:{
            name:productname
          }
        });
  
        if(productChecked){
          return res.status(400).send({
            status:false,
            message:"Product Name Is Already Exists"
          })
        }
        const allFiles = files.image;
        const rootDirectory = path.join(__dirname, '../../../');
        const newFolderDir = "/uploads/frontend/product";
        const uploadPath = path.join(rootDirectory, newFolderDir);
  
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        if (Object.keys(errorMessage).length == 0) {
          if (allFiles) {
            const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedFormats.includes(allFiles[0].mimetype)) {
              errorMessage.image = { message: "Only jpeg, jpg, and png image formats are allowed for Profile Picture" };
              message = "Only jpeg, jpg, and png image formats are allowed for Profile Picture";
            } else {
              const newFileName = Date.now() + "_" + req.user.userId + path.extname(allFiles[0].originalFilename);
              const sourcePath = allFiles[0].filepath; // corrected from allFiles[0].filepath
              const destinationPath = path.join(uploadPath, newFileName);
    
    
              // Copy file from source to destination
              fs.copyFile(sourcePath, destinationPath, (err) => {
                if (err) {
                  console.error(`Error copying file: ${err}`);
                  errorMessage.image = { message: "Error copying Profile Picture" };
                  return res.status(500).json({ error: "Error copying file" });
                } else {
                  main_image = newFolderDir + "/" + newFileName;
    
                  // Continue with your code logic
                }
              });
    
              main_image = newFolderDir + "/" + newFileName;
            }
          }
        }
  
        if (Object.keys(errorMessage).length > 0) {
          return res.status(400).json({ status: false, status_code: 400, errorMessage, message: message });
        
        }
        const insertBrand = await ProductsModal.create({
          brand_id:brand_id,
          section_id:section_id,
          category_id:category_id,
          subcategory_id:subcategory_id,
          name: productname,
          slug: slug,
          meta_description: meta_description,
          description: description,
          image: main_image,
          meta_keywords: meta_keywords,
          meta_title: meta_title,
        });
  
  
          if (insertBrand) {
            return res.status(200).send({
              status: true,
              message: "Product Added Successfully"
            })
          }
          else{
            return res.status(400).send({
              status: false,
              message: "Something want wrong"
            })
          }
      });
  
    } catch (error) {
      return req.send({status:false,message:"Something want wrong"});
    }


  },
  updatesubcategories: async (req, res) => {
    const {category_id,name,id,meta_description,meta_keywords,meta_title} = req.body;
    const entity  = await SubCategoriesMddel.findOne({
      where:{
        id:id
      }
    });
    if(!entity){
      return res.status(400).send({
        status:false,
        message:"No Record Found"
      });
    }
  const checked=  await SubCategoriesMddel.count({
      where: {
        category_id :category_id,
        id: {
          [Op.ne]: id
        },
        name: {
          [Op.like]: `%${name}%`
        }
      }
    });
    if(checked &&  checked > 0){
      return res.status(400).send({
        status:false,
        message:"Name Is Already Exists"
      });
    }
    entity.category_id= category_id;
    entity.name=name;
    entity.meta_title=meta_title;
    entity.meta_description=meta_description;
    entity.meta_keywords=meta_keywords;
    if(await entity.save()){
      return res.status(200).json({ status: true, message: "Record Updated Successfully" });
    }else{
      return res.status(400).json({ status: false, message: "Something want wrong" });
    }
  },
  editsubcategories: async (req, res) => {
    const { id } = req.body;
    const getRecord = await SubCategoriesMddel.findOne({
      where: { id: id }
    });
    if (getRecord) {
      return res.status(200).send({
        status: true,
        message: "Record Fetch",
        data: getRecord
      });
    }
    else {
      return res.status(200).send({
        status: false,
        message: "No Record Found",
        data: []
      });
    }
  },
  listingproduct: async (req, res) => {

    const offset = parseInt(req.body.offset);
    const limit = parseInt(req.body.limit);

    const total_records = await ProductsModal.count({
      include:[{
        model: CategorsModal,
        where:{
          status:1
        } 
      }]
    });

    const getAllRecord = await ProductsModal.findAll({
      offset: offset,
      limit: limit,
      include: [{ 
        model: CategorsModal,
        where:{
          status:1
        },
        attributes: ['name'] 
      }], // Include Category model           
       order: [['id', 'DESC']]
    });
    return res.status(200).send({ status: true, message: "New SubCategory listing Successfully", total_record: total_records, data: getAllRecord });
  },
  statussubcategories: async (req, res) => {
    try {
      const { id, status } = await req.body;
      let checkedBrand = await SubCategoriesMddel.findOne({
        where: {
          id: id
        }
      });
      if (!checkedBrand) {
        return res.status(404).json({ status: false, message: 'Brand not found' });
      }
      checkedBrand.status = status;
      await checkedBrand.save();
      return res.status(200).json({ status: true, message: "Status updated successfully", data: checkedBrand })

    } catch (error) {
      if (error.isJoi === true) {
        return res.status(200).json({ status: false, message: error.message });
      }
      // Handle other errors
      console.error('Error updating brand status:', error);
      return res.status(500).json({ status: false, message: 'Internal server error' });
    }
  },
  getActiveCategory: async (req,res)=>{
    const data = await CategorsModal.findAll({
      where:{
        status:1
      }
    });
    if(data && data.length > 0){
      return res.status(200).send({
        status:true,
        mssage:"get active Category",     
        data:data
      });
    }
    else{
      return res.status(400).send({
        status:false,
        mssage:"get active Category",     
        data:[]
      });
    }
  }
}
