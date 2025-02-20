var express = require('express');
var router = express.Router();
var multer = require('multer')

const FC = require('../Controller/FoodController')


const storage = multer.diskStorage({
    destination: "images",
    filename: (req,file,cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage})

router.post('/add',upload.single("image"),FC.addfood)
router.get('/list',FC.list)
router.delete("/delete/:id", FC.removefood);
router.put("/update/:id", upload.single("image"), FC.updateFood);

module.exports = router;
