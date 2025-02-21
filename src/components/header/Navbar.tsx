"use client";
import { Pages, Routes } from "@/constants/enums";
import React, { useState } from "react";
import Link from "../link";
import { Button, buttonVariants } from "../ui/button";
import { Menu, XIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

function Navbar({ translations }: { translations: { [key: string]: string } }) {
  const [openMenu, setOpenMenu] = useState(false);
  const { locale } = useParams();
  const pathname = usePathname();
  const links = [
    {
      id: crypto.randomUUID(),
      title: translations.product,
      herf: Routes.PRODUCT,
    },
    { id: crypto.randomUUID(), title: translations.about, herf: Routes.ABOUT },
    {
      id: crypto.randomUUID(),
      title: translations.contact,
      herf: Routes.CONTACT,
    },
    {
      id: crypto.randomUUID(),
      title: translations.login,
      herf: `${Routes.AUTH}/${Pages.LOGIN}`,
    },
  ];
  return (
    <nav className="flex-1 justify-end flex">
      <Button
        variant="secondary"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpenMenu(true)}
      >
        <Menu className="!w-6 !h-6" />
      </Button>

      <ul
        className={`fixed lg:static ${
          openMenu ? "left-0 z-50" : "-left-full"
        } top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10 h-full lg:h-auto`}
      >
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-10 right-10 lg:hidden"
          onClick={() => setOpenMenu(false)}
        >
          <XIcon className="!w-6 !h-6" />
        </Button>
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={`/${locale}/${link.herf}`}
              className={`${
                link.herf === `${Routes.AUTH}/${Pages.LOGIN}`
                  ? `${buttonVariants({ size: "lg" })} !px-8 !rounded-full`
                  : "hover:text-primary duration-200 transition-colors"
              } font-semibold ${
                pathname.startsWith(`/${locale}/${link.herf}`)
                  ? "text-primary"
                  : "text-accent"
              }`}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
