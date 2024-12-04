"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { authKey } from "@/constants";
import Cookies from "js-cookie";

const HeaderMenu = [
  {
    name: "Write",
    href: "/",
    showLoggedIn: false,
  },
  {
    name: "Login",
    href: "/login",
    showLoggedIn: false,
  },
  {
    name: "Logout",
    href: "/logout",
    showLoggedIn: true,
  },
];

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = Cookies.get(authKey);
      const loggedIn = token ? true : false;
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  return (
    <div className="sticky top-0 w-screen border-b">
      <div className="h-14 flex items-center px-5 md:px-10 w-full">
        {/* Desktop */}
        <DesktopHeader isLoggedIn={isLoggedIn} />
        {/* Mobile */}
        <MobileHeader isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default Header;

const DesktopHeader = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="w-full hidden md:flex items-center justify-between gap-5">
      <h1 className="text-2xl font-bold">
        <a href="/">Blogs</a>
      </h1>

      <div className="flex-1">
        <ul className="flex justify-end items-center gap-5">
          {/* <li>
            <a href="/" className="hover:underline">
              Blogs
            </a>
          </li> */}
          <li>
            <a href="/blog/create" className="hover:underline">
              Write
            </a>
          </li>
          {isLoggedIn ? (
            <li>
              <a href="/logout" className="hover:underline">
                <Button className="bg-black text-white border-[2px] rounded-full">
                  Logout
                </Button>
              </a>
            </li>
          ) : (
            <li>
              <a href="/login" className="hover:underline">
                <Button className="bg-black text-white border-[2px] rounded-full">
                  Sign in
                </Button>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const MobileHeader = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="w-full flex md:hidden items-center justify-between gap-5">
      <h1 className="text-2xl font-bold">
        <a href="/">Blogs</a>
      </h1>

      {/* <div className="flex-1">
        <ul className="flex justify-end items-center gap-5">
          <li>
            <a href="/" className="hover:underline">
              Blogs
            </a>
          </li>
          <li>
            <a href="/blog" className="hover:underline">
              Write
            </a>
          </li>
          {isLoggedIn ? (
            <li>
              <a href="/logout" className="hover:underline">
                <Button className="bg-black text-white border-[2px] rounded-full">
                  Logout
                </Button>
              </a>
            </li>
          ) : (
            <li>
              <a href="/login" className="hover:underline">
                <Button className="bg-black text-white border-[2px] rounded-full">
                  Sign in
                </Button>
              </a>
            </li>
          )}
        </ul>
      </div> */}
    </div>
  );
};
