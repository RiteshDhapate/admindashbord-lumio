import DataModel from "../model/landingPage.model.js";

export const getLandingPageController = async (req, res) => {
  try {
      const data = await DataModel.findById("66f40d80bb55b40fd380022e");
    if (!data) return res.status(404).json({ message: "Data not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};