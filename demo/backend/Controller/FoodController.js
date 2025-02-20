

var foodModel = require('../Model/FoodModel.js');

exports.addfood = async (req, res) => {
    let image_filename = req.file?.filename || "";

    const food = new foodModel({
        name: req.body.name,    
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    });

    try {
        await food.save();
        res.status(200).json({
            success: true,
            message: "Food Added",
            imagePath: `http://localhost:3000/img/${image_filename}` // Send image path
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).json({
            success: false,
            message: "Error"
        });
    }
};


exports.list = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({
            success: true,
            data: foods
        });
    } catch (error) {
        console.log("error list", error);
        res.status(404).json({
            success: false,
            message: "Error"
        });
    }
};

exports.removefood = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFood = await foodModel.findByIdAndDelete(id);

        if (!deletedFood) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        res.status(200).json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log("error removeFood", error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};
exports.updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        let updatedData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
        };

        // Check if an image is uploaded
        if (req.file) {
            updatedData.image = req.file.filename;
        }

        const updatedFood = await foodModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedFood) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        res.status(200).json({ success: true, message: "Food Updated", data: updatedFood });
    } catch (error) {
        console.log("error updateFood", error);
        res.status(500).json({ success: false, message: "Error updating food" });
    }
};




