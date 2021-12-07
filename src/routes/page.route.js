const express = require("express");
const router = express.Router();

const {
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
} = require("../controllers/page.controller");

router.post("/", createPage);

router.get("/list", getPages);

router.get("/:pageId", getPage);

router.put("/:pageId", updatePage);

router.delete("/:pageId", deletePage);

module.exports = router;
