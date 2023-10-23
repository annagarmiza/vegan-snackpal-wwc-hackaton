import formidable from "formidable";
import fs from "fs";
import { getSupabase } from "../../utils/supabase";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    const { userID } = fields.data;
    const { filepath, newFilename, mimetype } = files.image_url;

    try {
      // Read the file content from the given filepath
      fs.readFile(filepath, (readErr, fileData) => {
        if (readErr) {
          return res.status(500).json({ error: "Error reading file" });
        }

        // Initialize Supabase
        const supabase = getSupabase(userID);

        // Use Supabase to upload the image
        supabase.storage
          .from("snackPalStorage")
          .upload(newFilename, fileData, {
            contentType: mimetype,
          })
          .then(({ data, error }) => {
            if (error) {
              return res.status(400).json({ error: "Error uploading image" });
            }

            // Send a success response
            res.status(200).json(data);
          });
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
