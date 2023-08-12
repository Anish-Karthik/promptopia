import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req) => {
  // read query params
  try {
    await connectToDatabase();
    let prompts;
    const search = req.nextUrl.searchParams.get('search');
    if(search && search.length > 0) {
      // check if search is in prompt or tag or username from creator
      const creators = await User.find({ username: { $regex: search, $options: 'i' } }, { _id: 1 });
      prompts = await Prompt.find({
        $or: [
          { prompt: { $regex: search, $options: 'i' } },
          { tag: { $regex: search, $options: 'i' } },
          { creator: { $in: creators } }
        ]
      }).populate('creator');


    } else {
      prompts = await Prompt.find({}).populate('creator');
    }
    return new Response(JSON.stringify(prompts), {
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500
    });
  }
}

