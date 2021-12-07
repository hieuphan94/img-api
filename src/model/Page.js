const mongoose = require("mongoose");
const slugify = require("slugify");
const PageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: { type: String, lowercase: true, unique: true },
    desc: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "/img/banner-page.jpeg",
    },
  },
  { timestamps: true }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
PageSchema.pre("save", function (next) {
  const slugName = slugify(this.title, {
    lower: true,
    locale: "vi",
    remove: /[!"'()*+./:@~-]/g,
  });
  this.slug = `${slugName}`;
  next();
});

module.exports = mongoose.model("Page", PageSchema);
