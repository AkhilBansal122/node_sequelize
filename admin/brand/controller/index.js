const db = require("../../../models");
const { createSlug, removeImageFromFolder } = require('../../../helper');
const BrandModal = db.Brand;
require('dotenv').config();
const { Op } = require('sequelize');
const brandValidation = require("../schema");
module.exports = {

    addNewBrand: async (req, res) => {
        const { name, meta_title, meta_description, meta_keywords, description } = await brandValidation.addbrandSchema.validateAsync(req.body);
        let image = req.file ? req.file.path : null; // Assuming you're using multer or similar middleware for file uploads
        const slug = createSlug(name);

        await BrandModal.findOne({
            where: { name: name, slug: slug }
        }).then((result) => {
            if (result) {
                return res.status(400).send({
                    status: false,
                    message: "Brand Name is Already  Exists"
                });
            }
            else {
                BrandModal.create({
                    name: name,
                    slug: slug,
                    meta_description: meta_description,
                    description: description,
                    image: image,
                    meta_keywords: meta_keywords,
                    meta_title: meta_title,

                }).then((brandresult) => {
                    if (brandresult) {
                        return res.status(200).send({
                            status: true,
                            message: "Brand Added Successfully"
                        })
                    }
                }).catch(() => {
                    return res.status(400).send({
                        status: false,
                        message: "Something want wrong"
                    })
                })
            }
        });
    },

    updateBrand: async (req, res) => {
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
    
            checkedBrand = await BrandModal.findOne({ where: condition });
            
            return res.send({data:checkedBrand});

            if (checkedBrand) {
                return res.status(400).json({ status: false, message: 'Brand name already exists' });
            }
    
            checkedBrand.name = name;
            checkedBrand.meta_title = meta_title;
            checkedBrand.meta_description = meta_description;
            checkedBrand.meta_keywords = meta_keywords;
            checkedBrand.description = description;
    
            if (image) {
                removeImageFromFolder(checkedBrand.image);
                checkedBrand.image = image;
            }
            await checkedBrand.save();
            return res.status(200).json({ status: true, message: "Record updated successfully", data: checkedBrand })            
        } catch (error) {
            console.log(error);
        }
;
    },
    editBrand: async (req, res) => {
        const { id } = await brandValidation.editbrandSchema.validateAsync(req.body);
        const getRecord = await BrandModal.findOne({
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
    listingBrand: async (req, res) => {
        const { offset, limit } = req.body;
        const total_record = await BrandModal.count();
        const getAllRecord = await BrandModal.findAll({
            offset,
            limit,
        })
        return res.status(200).send({ status: true, message: "New Record listing Successfully", total_record: total_record, data: getAllRecord });
    },
    statusBrand: async (req, res) => {
        try {
            const { id, status } = await brandValidation.statusBrandSchema.validateAsync(req.body);
            let checkedBrand = await BrandModal.findOne({where:{
                id:id
            }});
            if (!checkedBrand) {
                return res.status(404).json({ status: false, message: 'Brand not found' });
            }
            checkedBrand.status = status;
            await checkedBrand.save();
            console.log(checkedBrand);
            return res.status(200).json({ status: true, message: "Status updated successfully", data: checkedBrand })            
                
        } catch (error) {
            if (error.isJoi === true) {
                return res.status(400).json({ status: false, message: error.message });
              }
              // Handle other errors
              console.error('Error updating brand status:', error);
              return res.status(500).json({ status: false, message: 'Internal server error' });
        }
    },
}
