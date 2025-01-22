"use client";
import React from "react";
import NavbarAvatar from "./NavbarAvatar";

export default function MainNavBar() {
  return (
    <div className="transparent sticky top-0 z-20 flex h-[50px] w-full items-center justify-between">
      <div className="flex h-full w-full items-center">
        <h1
          className="cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <span className="ml-8 font-syne text-4xl">V</span>
          <span className="text-2xl">stack</span>
        </h1>
      </div>

      <NavbarAvatar />
    </div>
  );
}
