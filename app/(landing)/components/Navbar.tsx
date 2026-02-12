/**
 * @file app/(landing)/components/Navbar.tsx
 * @description Navigation menu component
 */
"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  // routes button to login page
  const router = useRouter();
  // Get the current path
  const pathname = usePathname();
  return (
    <nav className="py-4">
      <div className="container flex items-center justify-between">
        <span>Logo</span>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-8">
            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className={`${pathname === "/" && "active"}`}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* About Us */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className={`${pathname === "/about" && "active"}`}
                >
                  About Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Features */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/features">Features</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button onClick={() => router.push("/auth/signIn")}>Sign In</Button>
      </div>
    </nav>
  );
};

export default Navbar;
