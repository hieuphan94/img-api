const express = require("express");
const router = express.Router();

const {
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
} = require("../controllers/page.controller");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

router.post("/", auth, adminAuth, createPage);

router.get("/list", getPages);

router.get("/:pageId", getPage);

router.put("/:pageId", auth, adminAuth, updatePage);

router.delete("/:pageId", auth, adminAuth, deletePage);

module.exports = router;
