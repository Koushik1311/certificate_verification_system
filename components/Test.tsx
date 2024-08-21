"use client";

import { useState } from "react";
import { getCookie } from "cookies-next";
import { deleteCertificate } from "@/data/certificate";

export default function Test() {
  const [cookielocal, setCookielocal] = useState();

  const getCookieLocal = async () => {
    await deleteCertificate("23123hhsdhdh4234");

    // console.log("Value", value);
  };

  return (
    <div>
      Test
      <button onClick={getCookieLocal}>Cookies</button>
    </div>
  );
}
