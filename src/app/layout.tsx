import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ClientWrapper from "@/components/ClientWrapper";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  weight: "400",
  subsets: ["thai"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en" className={prompt.className}>
      <body className="bg-slate-200">
        <NextAuthProvider session={nextAuthSession}>
          <ClientWrapper>{children}</ClientWrapper>
        </NextAuthProvider>
        <footer className="w-full bg-slate-400 p-5 mt-5">
          <h1 className="text-center">Copyright 2024 © Earthed.earth</h1>
        </footer>
      </body>
    </html>
  );
}
