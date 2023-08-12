import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";


export const POST = async (req) => {
  const { prompt, tag, userId } = await req.json();
  console.log("prompt", prompt);
  console.log("tag", tag);
  console.log("userId", userId);
  try{
    await connectToDatabase();
    const newPrompt = await Prompt.create({ creator: userId, prompt, tag });
    newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500
    });
  }
}

