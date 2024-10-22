import DataModel from "../model/landingPage.model.js";

export const updateLandingPage = async (req, res) => {
  try {
    const {preTitle, firstText, text, secoundText } = req.body;
    const updatedData = await DataModel.findByIdAndUpdate(
      "671737997e3788278d9d4b93",
      {
        title: firstText,
        subtitle: text,
        rotatingTexts: secoundText,
        preTitle:preTitle,
      },
      { new: true, runValidators: true } // Return updated document and validate
    );
    if (!updatedData)
      return res.status(404).json({ message: "Data not found" });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error });
  }
};