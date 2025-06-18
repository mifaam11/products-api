const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "du7l08d8j",
    api_key: "157398883228573",
    api_secret: "8J1I7VCJ6wgIgtY9xhwkC453TRo"
});

module.exports = cloudinary;
