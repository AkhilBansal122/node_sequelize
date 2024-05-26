const { Op } = require('sequelize');

const db = require("../../../models");
const ProductModal = db.Product;

const ProductColorAttributeModal = db.ProductColorAttribute;


module.exports={
   

  addProductAttr: async (req, res) => {
 //   res.send(req.body);
    const {product_id,name} = req.body;
   
   checked = await ProductColorAttributeModal.count({
      where:{
        product_id:product_id,
        name:name
      }
    });
    if(checked){
      return res.status(400).send({status:false,message:"Already Exists"});
    }
   const InsertRecord =  await ProductColorAttributeModal.create({
    product_id :product_id,
      name:name,
      status:1
    });
    if(InsertRecord){
      return res.status(200).send({status:true,message:"Record Added Successfully"});
    }
    else{
      return res.status(400).send({status:false,message:"Something want wrong"});
    }
  },
  updateProductAttr: async (req, res) => {
    const {product_id,name,id} = req.body;
    const entity  = await ProductColorAttributeModal.findOne({
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
  const checked=  await ProductColorAttributeModal.count({
      where: {
        product_id :product_id,
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
    entity.product_id= product_id;
    entity.name=name;
if(await entity.save()){
      return res.status(200).json({ status: true, message: "Record Updated Successfully" });
    }else{
      return res.status(400).json({ status: false, message: "Something want wrong" });
    }
  },
  editProductAttr: async (req, res) => {
    const { id } = req.body;
    const getRecord = await ProductColorAttributeModal.findOne({
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
  listingProductAttr: async (req, res) => {

    const offset = parseInt(req.body.offset);
    const limit = parseInt(req.body.limit);

    const total_records = await ProductColorAttributeModal.count({
      include: [{ 
        model: ProductModal, 
        where:{
          status:1
        },
        attributes: ['name'] // Specify the attributes of ProductMdoal to retrieve
      }], // Include sections model 
    });

    const getAllRecord = await ProductColorAttributeModal.findAll({
      offset: offset,
      limit: limit,
      include: [{ 
        model: ProductModal, 
        where:{
          status:1
        },
        attributes: ['name'] // Specify the attributes of SectionsModal to retrieve
      }], // Include sections model           
       order: [['id', 'DESC']]
    });
    if(total_records > 0)
        {
            return res.status(200).send({ status: true, message: "New  listing Successfully", total_record: total_records, data: getAllRecord });
        }
        else{
            return res.status(200).send({ status: false, message: "New  listing Successfully", total_record: total_records, data: getAllRecord });
        }
  },
  statusProductAttr: async (req, res) => {
    try {
      const { id, status } = await req.body;
      let entity = await ProductColorAttributeModal.findOne({
        where: {
          id: id
        }
      });
      if ( !entity) {
        return res.status(404).json({ status: false, message: 'Product Attr not found' });
      }
     entity.status = status;
      await entity.save();
      return res.status(200).json({ status: true, message: "Status updated successfully", data: entity })

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