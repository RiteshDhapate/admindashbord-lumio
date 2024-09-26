import DataModel from "../model/landingPage.model.js";

export const insertLandingpageController=async (req, res) => {
    try {
        const { firstText, text, secoundText } = req.body;
        const newData = new DataModel({
            title: firstText,
            subtitle: text,
            rotatingTexts: secoundText,
        });

        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(500).json({ message: 'Error creating data', error });
    }
}