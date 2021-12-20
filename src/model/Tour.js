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
      default: 0,
    },
    summary: {
      type: String,
      trim: true,
      default: "",
    },
    timeline: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    img: {
      type: String,
      default: "/img/banner-page.jpeg",
    },
    category: {
      type: String,
      default: "Uncategorized",
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
