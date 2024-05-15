import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogin";
import getUserProfile from "@/libs/getUserProfile";

export const authOptions:AuthOptions = {
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "email", type: "email", placeholder: "email" },
            password: { label: "Password", type: "password" , placeholder: "password" }
          },
          async authorize(credentials, req) {

            if(!credentials) return null;

            const user = await userLogIn(credentials.email, credentials.password)

            if (user) {
              return user
            } else {
              return null
            }

          }
        })
      ],
    session: { strategy : "jwt" },
    callbacks: {
        async jwt({token, user}) {
          return {...token, ...user }
        },
        async session({session, token, user}) {
          if(token.token){
            const res = await getUserProfile(token.token as string)
            session.user = res.data as any
            session.user.token = token.token as string
          }
          return session
        },
        async redirect({url, baseUrl}) {
          return url.startsWith(baseUrl) ? url : baseUrl
        }
      },
      pages:{
        signIn: '/auth/signin',
      }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST , handler as PUT}