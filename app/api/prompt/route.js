import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  console.log("*********************************inside route**********************************");
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate('creator');
    console.log("**********inside try*********",prompts);
    return new Response(JSON.stringify(prompts), {
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500
    });
  }
}

