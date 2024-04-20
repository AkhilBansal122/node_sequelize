const db = require("../../../models");
const { createSlug, removeImageFromFolder } = require('../../../helper');
const BrandModal = db.Brand;
require('dotenv').config();
const { Op } = require('sequelize');
const brandValidation = require("../schema");
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

function copyFile(source, destination, callback) {
  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(destination);

  readStream.on('error', callback);
  writeStream.on('error', callback);

  readStream.on('close', () => {
    fs.unlink(source, callback);
  });

  readStream.pipe(writeStream);
}

module.exports = {

  addNewBrand: async (req, res) => {
    let errorMessage = {};
    var message = "";
    let slug = "";
    let brandImage = "";
    let brandname = "";
    let meta_description="";
    let meta_title ="";
    let meta_keywords ="";
    let description="";

    const form = new formidable.IncomingForm();
   try {

    form.on('field', (name, value) => {
      if (name == 'name') {
        if (!value) {
          errorMessage.email = { message: "Name Field Is Required" };
          message = "Name Field Is Required";
        }
        else{
          slug= createSlug(value);
          brandname = value;
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
      if (!fields.name) {
        errorMessage.name = { message: "Name Field Is Required" };
        message = "Name Field Is Required";
      }
      const brandsChecked = await BrandModal.findOne({
        where:{
          name:brandname
        }
      });

      if(brandsChecked){
        return res.status(400).send({
          status:false,
          message:"Brand Name Is Already Exists"
        })
      }
      const allFiles = files.image;
      const rootDirectory = path.join(__dirname, '../../../');
      const newFolderDir = "/uploads/frontend/brand";
      const uploadPath = path.join(rootDirectory, newFolderDir);

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      
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
              brandImage = newFolderDir + "/" + newFileName;

              // Continue with your code logic
            }
          });

          brandImage = newFolderDir + "/" + newFileName;
        }
      }

      if (Object.keys(errorMessage).length > 0) {
        return res.status(400).json({ status: false, status_code: 400, errorMessage, message: message });
      
      }
      const insertBrand = await BrandModal.create({
        name: brandname,
        slug: slug,
        meta_description: meta_description,
        description: description,
        image: brandImage,
        meta_keywords: meta_keywords,
        meta_title: meta_title,

      });


        if (insertBrand) {
          return res.status(200).send({
            status: true,
            message: "Brand Added Successfully"
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
    console.log(error);
   }

  },

  updateBrands: async (req, res) => {
    try {

      const { id, name, meta_title, meta_description, meta_keywords, description } = await brandValidation.updatebrandSchema.validateAsync(req.body);
      let image = req.file ? req.file.path : null; // Assuming you're using multer or similar middleware for file uploads

      let checkedBrand = await BrandModal.findByPk(id);
      if (!checkedBrand) {
        return res.status(404).json({ status: false, message: 'Brand not found' });
      }

      const condition = {
        id: {
          [Op.ne]: id
        },
        name: name,
        slug: createSlug(name)
      };

      alreadyCheckedBrand = await BrandModal.findOne({ where: condition });

      //  return res.send({data:image});

      if (alreadyCheckedBrand) {
        return res.status(200).json({ status: false, message: 'Brand name already exists' });
      }

      checkedBrand.name = req.body.name;
      checkedBrand.meta_title = meta_title;
      checkedBrand.meta_description = meta_description;
      checkedBrand.meta_keywords = meta_keywords;
      checkedBrand.description = description;

      if (image) {
        removeImageFromFolder(checkedBrand.image);
        checkedBrand.image = image;
      }
      // return res.send({data:checkedBrand});
      await checkedBrand.save();
      return res.status(200).json({ status: true, message: "Record updated successfully", data: checkedBrand })
    } catch (error) {
      console.log(error);
      return res.status(200).json({ status: false, message: "Record updated failed", data: [] })
    }
    ;
  },
  updateBrand: async (req, res) => {
    let errorMessage = {};
    var message = "";
    let slug = "";
    let brandImage = "";
    let brandname = "";
    let meta_description="";
    let meta_title ="";
    let meta_keyword ="";
    let description="";
    let id="";

    
    const form = new formidable.IncomingForm();
    
    form.on('field', (name, value) => {
      console.log(name);
      if(name ==='id'){
        if (!value) {
          errorMessage.email = { message: "Id Field Is Required" };
          message = "Id Field Is Required";
        }
        else{
          id = value;
        }
      }
      if (name == 'name') {
        if (!value) {
          errorMessage.email = { message: "Name Field Is Required" };
          message = "Name Field Is Required";
        }
        else{
          slug= createSlug(value);
          brandname = value;
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
      if(name ==='meta_keyword'){
        if(value && value.length > 0 ) {
          meta_keyword = value;
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
      // if(!fields.name){
      //   errorMessage.name = { message: "name Field Is Required" };
      //   message = "name Field Is Required";
      // }
      
      getProfile  = await BrandModal.findOne({where:{ id:id }});
      if(getProfile==null){
        return res.status(400).sand({status:false,message:"No record Found"});
      }
        // Access files here
        const allFiles = files.image;
        const rootDirectory = path.join(__dirname, '../../../');
        const newFolderDir = "/uploads/frontend/brand";
        const uploadPath = path.join(rootDirectory, newFolderDir);

        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }

        if (allFiles) {
          const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];

          if (!allowedFormats.includes(allFiles[0].mimetype)) {
            errorMessage.image = { message: "Only jpeg, jpg, and png image formats are allowed for Profile Picture" };
            message = "Only jpeg, jpg, and png image formats are allowed for Profile Picture";
          } else {
            const newFileName = Date.now() + "_" + req.user.userId + path.extname(allFiles[0].originalFilename);
            const sourcePath = allFiles[0].filepath; // corrected from allFiles[0].filepath
            const destinationPath = path.join(uploadPath, newFileName);
            const oldPath = path.join(__dirname, "../../../" + getProfile.image);

            // Remove existing file
            if (fs.existsSync(oldPath)) {

              fs.unlink(oldPath, (err) => {
                if (err) {
                  console.error(`Error removing file: ${err}`);
                  // Handle error
                } else {
                  console.log('File removed successfully');
                  // File removed successfully
                }
              });
            }

            // Copy file from source to destination
            fs.copyFile(sourcePath, destinationPath, (err) => {
              if (err) {
                console.error(`Error copying file: ${err}`);
                errorMessage.image = { message: "Error copying Banner Picture" };
                return res.status(500).json({ error: "Error copying file" });
              } else {
                getProfile.image = newFolderDir + "/" + newFileName;

                // Continue with your code logic
              }
            });

            getProfile.image = newFolderDir + "/" + newFileName;
          }
        }
      
      if (Object.keys(errorMessage).length > 0) {
        return res.status(400).json({ status: false, status_code: 400, errorMessage, message: message });
      
      }

      getProfile.name=brandname;
      getProfile.slug= createSlug(brandname);
      getProfile.meta_description=meta_description;
      getProfile.description= description;
      getProfile.meta_keywords=  meta_keyword;
      getProfile.meta_title= meta_title;
      

      const response = await getProfile.save();
      if (response) {
        return res.status(200).send({
          status: true,
          message: "Banner Updated Successfully"
        });
      } else {
        return res.status(400).send({
          status: false,
          message: "Something went wrong"
        });
      }
    });

  },
  editBrand: async (req, res) => {
    const { id } = req.body;
    const getRecord = await BrandModal.findOne({
      where: { id: id }
    });
    if (getRecord) {
      getRecord.image = getRecord.image;
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
  listingBrand: async (req, res) => {

    const offset = parseInt(req.body.offset);
    const limit = parseInt(req.body.limit);

    const total_records = await BrandModal.count();

    const getAllRecord = await BrandModal.findAll({
      offset: offset,
      limit: limit,
      order: [['id', 'DESC']]
    });
    return res.status(200).send({ status: true, message: "New Record listing Successfully", total_record: total_records, data: getAllRecord });
  },
  statusBrand: async (req, res) => {
    try {
      const { id, status } = await req.body;
      let checkedBrand = await BrandModal.findOne({
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
  formdata: async (req, res) => {
    try {
      console.log(req.body); // Access the fields in req.body
      console.log("Image::", req.file); // Access the uploaded file information

      // If you need to access the validated body, you can access 'value' from req object
      return res.send({ data: req.body });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
