import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ClientWrapper from "@/components/ClientWrapper";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <NextAuthProvider session={nextAuthSession}>
          <ClientWrapper>{children}</ClientWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
