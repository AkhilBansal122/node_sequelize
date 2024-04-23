const db = require("../../../models");
const { createSlug } = require('../../../helper');
const SectionsModal = db.Section;
require('dotenv').config();
const { Op } = require('sequelize');


module.exports = {

  addNewsections: async (req, res) => {
    
    const {name,meta_title,meta_description,meta_keywords} = req.body;
   
   checked = await SectionsModal.count({
      where:{
        name:name
      }
    });
    if(checked){
      return res.status(400).send({status:false,message:"Already Exists"});
    }
   const InsertRecord =  await SectionsModal.create({
      name:name,
      meta_title:meta_title,
      meta_description:meta_description,
      meta_keywords:meta_keywords,
      status:1
    });
    if(InsertRecord){
      return res.status(200).send({status:true,message:"Record Added Successfully"});
    }
    else{
      return res.status(400).send({status:false,message:"Something want wrong"});

    }
  },
  updatesections: async (req, res) => {
    const {name,id,meta_description,meta_keywords,meta_title} = req.body;
    const entity  = await SectionsModal.findOne({
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
  const checked=  await SectionsModal.count({
      where: {
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
  editsections: async (req, res) => {
    const { id } = req.body;
    const getRecord = await SectionsModal.findOne({
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
  listingsections: async (req, res) => {

    const offset = parseInt(req.body.offset);
    const limit = parseInt(req.body.limit);

    const total_records = await SectionsModal.count();

    const getAllRecord = await SectionsModal.findAll({
      offset: offset,
      limit: limit,
      order: [['id', 'DESC']]
    });
    return res.status(200).send({ status: true, message: "New Sections listing Successfully", total_record: total_records, data: getAllRecord });
  },
  statussections: async (req, res) => {
    try {
      const { id, status } = await req.body;
      let checkedBrand = await SectionsModal.findOne({
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
}