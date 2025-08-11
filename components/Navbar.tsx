import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-3 py-1 sm:px-5 sm:py-3 bg-white shadow-sm focus-v">
      <nav className="flex items-center justify-between font-work-sans font-medium">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={144} height={30} />
        </Link>
        <div className="flex items-center sm:gap-5 text-black max-sm:gap-7">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="cursor-pointer">
                  <span className="max-sm:hidden">Log Out</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="cursor-pointer ">
                Log In
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
