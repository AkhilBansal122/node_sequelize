const { Op } = require('sequelize');

const db = require("../../../models");
const ProductModal = db.Product;
const ProductColorAttributeModal = db.ProductColorAttribute;
const ProductSizeAttributeModal = db.productsizeattribute;


module.exports={
   
  addProductSizeAttr: async (req, res) => {
    const {product_id,color_id,sku,name,qty,sale_price} = req.body;
   
   checked = await ProductSizeAttributeModal.count({
      where:{
        product_id:product_id,
        color_id:color_id,
        name:name,
        sku:sku
      }
    });
    if(checked!=0){
    
      return res.status(400).send({status:false,message:"Already Exists"});
    }

   const InsertRecord =  await ProductSizeAttributeModal.create({
    product_id :product_id,
    color_id :color_id,
    sku :sku,
    qty:qty,
    sale_price:sale_price,
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
        const {product_id,color_id,sku,name,id} = req.body;

    const entity  = await ProductSizeAttributeModal.findOne({
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
  const checked=  await ProductSizeAttributeModal.count({
      where: {
        product_id :product_id,
        color_id :color_id,
        sku :sku,
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
    entity.color_id= color_id;
    entity.sku= sku;
    entity.name=name;
if(await entity.save()){
      return res.status(200).json({ status: true, message: "Record Updated Successfully" });
    }else{
      return res.status(400).json({ status: false, message: "Something want wrong" });
    }
  },
  editProductSizeAttr: async (req, res) => {
    const { id } = req.body;
    const getRecord = await ProductSizeAttributeModal.findOne({
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
  listingProductSizeAttr: async (req, res) => {

    const offset = parseInt(req.body.offset);
    const limit = parseInt(req.body.limit);

    const total_records = await ProductSizeAttributeModal.count({
      include: [{ 
        model: ProductModal, 
        where:{
          status:1
        },
        attributes: ['name'] // Specify the attributes of ProductMdoal to retrieve
      }], // Include sections model 
    });

    const getAllRecord = await ProductSizeAttributeModal.findAll({
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
  statusProductSizeAttr: async (req, res) => {
    try {
      const { id, status } = await req.body;
      let entity = await ProductSizeAttributeModal.findOne({
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