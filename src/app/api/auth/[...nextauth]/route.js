import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connect } from 'mongoose';
import Error from 'next/error';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credential',
      async authorize(credentials) {
        await connect();

        try {
          const user = User.findOne({ email: credentials.email });
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
