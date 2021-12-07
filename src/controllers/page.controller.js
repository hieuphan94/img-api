const Page = require("../model/Page");
const ObjectId = require("mongoose").Types.ObjectId;

// GET ALL PAGE
const getPages = async (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  // let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  try {
    let pages = await Page.find({})
      .sort([[sortBy, order]])
      // .limit(limit)
      .exec();
    res.json(pages);
  } catch (error) {
    console.log(error);
    res.status(500).send("Invalid querys");
  }
};

// GET Page
const getPage = async (req, res) => {
  const id = req.params.pageId;
  console.log(id);
  try {
    const page = ObjectId.isValid(id)
      ? await Page.findById(id)
      : await Page.findOne({ slug: id });
    res.status(200).json(page);
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE Page
const createPage = async (req, res) => {
  const newPage = Page(req.body);
  try {
    const savedPage = await newPage.save();
    res.status(200).json(savedPage);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE Page
const updatePage = async (req, res) => {
  const id = req.params.pageId;
  const updatePage = req.body;
  console.log(id, updatePage);
  try {
    const page = ObjectId.isValid(id)
      ? await Page.findByIdAndUpdate(id, updatePage, {
          new: true,
        })
      : await Page.findOneAndUpdate({ slug: id }, updatePage, { new: true });
    res.status(200).json(page);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE Page
const deletePage = async (req, res) => {
  res.json("DELETE Page");
};

module.exports = {
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
};
