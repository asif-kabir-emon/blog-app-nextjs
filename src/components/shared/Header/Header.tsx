"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { authKey } from "@/constants";
import Cookies from "js-cookie";
import { Bookmark, LogOut, SquarePen, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/Providers/Providers";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    Cookies.remove(authKey);
    localStorage.removeItem(authKey);
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="sticky top-0 w-screen bg-white shadow-sm z-10">
      <div className="h-14 w-full flex items-center justify-between gap-5 md:gap-7 px-5 md:px-10">
        <h1 className="text-2xl font-semibold text-slate-600">
          <a href="/">WriteFlow</a>
        </h1>

        <div className="flex-1">
          <ul className="flex justify-end items-center gap-5 md:gap-7">
            <li>
              <a
                href={isLoggedIn ? "/blog/create" : "/login"}
                className="flex justify-center items-center gap-2 text-gray-500 hover:text-gray-600"
              >
                <SquarePen className="w-5 h-5" />
                <span>Write</span>
              </a>
            </li>
            {!isLoggedIn ? (
              <li>
                <a href="/login" className="hover:underline">
                  <Button className="bg-black text-white border-[2px] rounded-full">
                    Sign in
                  </Button>
                </a>
              </li>
            ) : (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="border-[5px] border-slate-200 rounded-full bg-slate-200 hover:cursor-pointer">
                      <UserRound className="w-6 h-6 text-slate-400 rounded-full" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="right-0 bg-white text-slate-500 text-[16px] px-2 py-2 space-y-1 min-w-[130px] px-auto rounded-md mt-1"
                  >
                    <DropdownMenuItem>
                      <a href="/profile">
                        <div className="flex items-end gap-3 hover:cursor-pointer w-full">
                          <UserRound className="w-5 h-5" />
                          <span>Profile</span>
                        </div>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/blog/my-blogs">
                        <div className="flex items-end gap-3 hover:cursor-pointer w-full">
                          <Bookmark className="w-5 h-5" />
                          <span>Library</span>
                        </div>
                      </a>
                    </DropdownMenuItem>
                    <div className="py-1 px-2">
                      <DropdownMenuSeparator className="bg-slate-100" />
                    </div>

                    <DropdownMenuItem>
                      <div
                        className="flex items-end gap-3 hover:cursor-pointer w-full"
                        onClick={() => handleLogout()}
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
