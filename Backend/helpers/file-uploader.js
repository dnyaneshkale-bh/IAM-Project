const multer = require("multer");

const path = require("path");

const { v4: uuid4 } = require("uuid");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'files');
    },
    filename:function(req,file,cb){
        cb(null, uuid4() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage:storage
})

module.exports = {
  upload,
};
