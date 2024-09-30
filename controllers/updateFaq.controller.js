import FAQModel from "../model/faq.model.js";


// Insert or update FAQs
export const updateFaq = async (req, res) => {
  try {
    const { faqs } = req.body;

    // Find if there's already an FAQ document
    let faqDocument = await FAQModel.findOne();

    if (faqDocument) {
      // If found, update the existing document
      faqDocument.faqs = faqs;
      await faqDocument.save();
      res
        .status(200)
        .json({ message: "FAQs updated successfully", faqDocument });
    } else {
      // If not found, create a new FAQ document
      faqDocument = new FAQModel({ faqs });
      await faqDocument.save();
      res
        .status(201)
        .json({ message: "FAQs created successfully", faqDocument });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
