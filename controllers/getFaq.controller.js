import FAQModel from "../model/faq.model.js";

// Get FAQs
export const getFAQs = async (req, res) => {
  try {
    const faqDocument = await FAQModel.findOne();

    if (faqDocument) {
      res.status(200).json(faqDocument);
    } else {
      res.status(404).json({ message: "No FAQs found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
