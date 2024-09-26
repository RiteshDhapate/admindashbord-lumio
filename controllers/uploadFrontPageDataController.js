import { supabase } from "../supabase/connection.js";

export const uploadFrontPageDataController = async (req, res) => {
  const { firstText, text, secoundText } = req.body;

  try {
    // Attempt to fetch existing front page data
    const { data: frontPageData, error: fetchError } = await supabase
      .from("front_page") // Your table name
      .select("*")
      .single(); // Assuming there's only one row to update

    // Check if there was an error while fetching data
    if (fetchError) {
      // If the error is related to the table not existing, create the table or handle it gracefully
      if (fetchError.code === "PGRST116") {
        // The table does not exist or no data found, proceed to create
        const { data, error } = await supabase
          .from("front_page")
          .insert([{ firstText, text, secoundText }]);

        if (error) {
          return res
            .status(400)
            .json({
              message: "Error inserting new front page data",
              error: error.message,
            });
        }

        return res
          .status(201)
          .json({ message: "Front page data created successfully", data });
      } else {
        console.log(fetchError)
        // Some other fetch error occurred
        return res
          .status(400)
          .json({
            message: "Error fetching front page data",
            error: fetchError.message,
          });
      }
    }

    // If front page data exists, update it
    if (frontPageData) {
      const { data, error } = await supabase
        .from("front_page")
        .update({ firstText, text, secoundText })
        .eq("id", frontPageData.id); // Update by the row ID

      if (error) {
        return res
          .status(400)
          .json({
            message: "Error updating front page data",
            error: error.message,
          });
      }

      return res
        .status(200)
        .json({ message: "Front page data updated successfully", data });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};