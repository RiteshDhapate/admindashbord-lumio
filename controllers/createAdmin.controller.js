import AdminModel from "../model/admin.model.js";
import bcrypt from "bcrypt";
export const createAdminController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if password is strong enough
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // Check if email already exists
        const existingAdmin = await AdminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Create new admin
        const newAdmin = new AdminModel({
            email,
            password:hashedPassword, // Storing password as plain text
        });

        // Save admin to database
        await newAdmin.save();

        res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};