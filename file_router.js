const express = require("express");

const router = express.Router();

router.use("/",express.static("./mnt"));

module.exports = {router}
