const multer = require("multer");

const storage = multer.memoryStorage(); // Use memory storage (no local file needed)
const upload = multer({ storage });

module.exports = upload;
