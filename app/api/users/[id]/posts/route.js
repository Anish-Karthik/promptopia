import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
import mongoose from "mongoose";

export const GET = async (req, {params}) => {
  console.log("*********************************inside user Route**********************************");
  const { id } = params;
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({ creator: id }).populate('creator');
    console.log("**********inside try*********",prompts);
    return new Response(JSON.stringify(prompts), {
      status: 200
    });
  } catch (error) {
    console.log("**********inside err*********");
    return new Response(JSON.stringify(error), {
      status: 500
    });
  }
}

