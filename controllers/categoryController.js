const Category = require('../models/categoryModel');
const slugify = require('slugify');

exports.createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the 'name' field is provided in the request body
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }

    // Check if a category with the same name already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(409).send({
        success: false,
        message: "Category Already Exists",
      });
    }

    // Generate a slug from the category name using 'slugify'
    const slug = slugify(name);

    // Create a new category
    const category = await Category.create({
      name,
      slug,
    });

    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating category",
    });
  }
};

// Update Category

exports.updateCategoryController = async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const category = await Category.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
      );
      res.status(200).send({
        success: true,
        messsage: "Category Updated Successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating category",
      });
    }
  };


// get All Category
exports.allCategoryControlller = async (req, res) => {
    try {
      const category = await Category.find({});
      res.status(200).send({
        success: true,
        message: "All Categories List",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };
// get Single category
  exports.singleCategoryController = async (req, res) => {
    try {
      const category = await Category.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get SIngle Category SUccessfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Category",
      });
    }
  };

  //delete category
exports.deleteCategoryCOntroller = async (req, res) => {
    try {
      const { id } = req.params;
      await Category.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };













