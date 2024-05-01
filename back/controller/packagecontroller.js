const Package = require('../models/package');
const User = require('../models/user');

// Create a new package
const createPackage = async (req, res) => {
    try {
        const { image, name, discount, description,type,price } = req.body;
        const newPackage = new Package({ image, name,type, discount, description,price });
        await newPackage.save();
        res.status(201).json({ success: true, message: 'Package created successfully', package: newPackage });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all packages
const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.json({ ok: true,data: packages,message: 'Package found'});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get package by ID
const getPackageById = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }
        res.json({ success: true, data: package });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update package by ID
const updatePackage = async (req, res) => {
    try {
        const { image, name, discount, description } = req.body;
        const package = await Package.findByIdAndUpdate(req.params.id, { image, name, discount, description }, { new: true });
        if (!package) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }
        res.json({ success: true, message: 'Package updated successfully', package });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete package by ID
const deletePackage = async (req, res) => {
    try {
        const package = await Package.findByIdAndDelete(req.params.id);
        if (!package) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }
        res.json({ success: true, message: 'Package deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const userPackage = async (req, res) => {
    try {
        console.log("im in")
        const package = await Package.findById(req.params.id);
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: "User not found"
            });
        }

        package.user.push(req.userId);
        await package.save();
        user.offer.push(package._id);
        await user.save();

        res.status(200).json({
            ok: true,
            message: "Package updated successfully",
            data: package
        });
    } catch (error) {
        console.error("Error updating package:", error);
        res.status(500).json({
            ok: false,
            message: "Internal server error"
        });
    }


};
module.exports = { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage,userPackage };
