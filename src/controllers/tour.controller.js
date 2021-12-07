const Tour = require("../model/Tour");
const ObjectId = require("mongoose").Types.ObjectId;

// GET ALL TOUR
const getTours = async (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  try {
    let tours = await Tour.find({})
      // .select("-photo")
      // .populate("category")
      .sort([[sortBy, order]])
      .limit(limit)
      .exec();
    res.json(tours);
  } catch (error) {
    console.log(error);
    res.status(500).send("Invalid querys");
  }
};

// GET TOUR
const getTour = async (req, res) => {
  const id = req.params.tourId;
  try {
    const tour = ObjectId.isValid(id)
      ? await Tour.findById(id)
      : await Tour.findOne({ slug: id });

    res.status(200).json(tour);
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE TOUR
const createTour = async (req, res) => {
  const { title, price } = req.body;
  const tour = {
    title: title,
    price: price,
  };
  const newTour = Tour(tour);
  try {
    const savedTour = await newTour.save();
    res.status(200).json(savedTour);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE TOUR
const updateTour = async (req, res) => {
  const id = req.params.tourId;
  const updateTour = req.body;
  console.log(id, updateTour);
  try {
    const tour = ObjectId.isValid(id)
      ? await Tour.findByIdAndUpdate(id, updateTour, {
          new: true,
        })
      : await Tour.findOneAndUpdate({ slug: id }, updateTour, { new: true });
    res.status(200).json(tour);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE TOUR
const deleteTour = async (req, res) => {
  res.json("DELETE TOUR");
};

module.exports = {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
