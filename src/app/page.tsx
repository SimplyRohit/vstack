"use client";

import { findUser } from "@/actions/checkUser";
import { useEffect } from "react";

export default function Home() {
  // useEffect(() => {
  //   const Handle = async () => {
  //     const data = await findUser();
  //     console.log("data", data);
  //   };
  //   Handle();
  // }, []);
  return (
    <div>
      <h1>Heelo</h1>
    </div>
  );
}
