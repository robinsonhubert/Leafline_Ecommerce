const dotenv = require("dotenv")
const cloudinaryModule = require("cloudinary")

dotenv.config()
const cloudinary = cloudinaryModule.v2

cloudinary.config({
    cloud_name: "dfjoxgj69",
    api_key: "253319864939733",
    api_secret: "IKbLTS12vfpaD8EzrqgcgXSK0Mg",
})

module.exports = cloudinary