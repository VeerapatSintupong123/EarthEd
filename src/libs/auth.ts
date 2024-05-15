import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "./userLogin";
import getUserProfile from "./getUserProfile";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null;
                const user = await userLogIn(credentials.email, credentials.password);
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            if (token.token) {
                const res = await getUserProfile(token.token as string);
                session.user = res.data as any;
                session.user.token = token.token as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        }
    },
    pages: {
        signIn: '/auth/signin',
    }
};