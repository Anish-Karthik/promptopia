import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";
import User from "@models/user";

const handler =  NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await User.findOne({ email: session.user.email });
      console.log(user);
      console.log(session);
      session.user.id = user._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        // check if user exists in database
        if(await User.findOne({ email: profile.email })) {
          return true;
        }
        // if not, create user in database
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.image,
        });

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
});

export { handler as GET, handler as POST}