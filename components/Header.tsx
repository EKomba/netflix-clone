import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import BasicMenu from "./BasicMenu";

/* eslint-disable @next/next/no-img-element */
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // if scrolled vertically
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      {/* left section */}
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          alt="Netflix Logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <BasicMenu />

        <ul className="hidden space-x-4 md:flex">
          <li>
            <a href="#" className="headerLink">
              Home
            </a>
          </li>
          <li>
            <a href="#trending" className="headerLink">
              TV Shows
            </a>
          </li>
          <li>
            <a href="#trending" className="headerLink">
              Movies
            </a>
          </li>
          <li>
            <a href="#genres" className="headerLink">
              New & Popular
            </a>
          </li>
          <li>
            <a href="#mylist" className="headerLink">
              My List
            </a>
          </li>
        </ul>
      </div>

      {/* right section */}
      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline " />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt="Netflix-logo"
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
