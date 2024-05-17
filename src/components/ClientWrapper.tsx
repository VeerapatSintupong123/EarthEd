"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/navbar";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noMenuRoutes = ["/auth/signin", "/auth/register"];
  const showMenu = !noMenuRoutes.includes(pathname);

  return (
    <>
      <header>{showMenu && <NavBar />}</header>
      {children}
    </>
  );
}
