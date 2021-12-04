const mongoose = require("mongoose");
const slugify = require("slugify");
const TourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: { type: String, lowercase: true, unique: true },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
TourSchema.pre("save", function (next) {
  const slugName = slugify(this.title, {
    lower: true,
    locale: "vi",
    remove: /[!"'()*+./:@~-]/g,
  });
  this.slug = `${slugName}`;
  next();
});

module.exports = mongoose.model("Tour", TourSchema);
