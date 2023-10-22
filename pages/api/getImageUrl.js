// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSupabase } from "../../utils/supabase";

export default async function handler(req, res) {
  const { userID, image_url_name } = req.body;
  console.log({ userID, image_url_name });
  const supabase = getSupabase(userID);
  const { data, error } = await supabase.storage
    .from("snackPalStorage")
    .getPublicUrl(image_url_name);
  if (error) return res.status(400).json(error);
  res.status(200).json(data);
}
