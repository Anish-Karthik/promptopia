import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (req, {params}) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById(params.id).populate('creator');
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 404 });
  }
}

// PATCH (update)
export const PATCH = async (req, {params}) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDatabase();
    
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) return new Response(JSON.stringify({ message: "Prompt not found" }), { status: 404 });
    
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

// DELETE (delete)

export const DELETE = async (req, {params}) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findByIdAndRemove(params.id);
    if (!prompt) return new Response(JSON.stringify({ message: "Prompt not found" }), { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
