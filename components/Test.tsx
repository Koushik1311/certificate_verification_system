"use client";

import { useState } from "react";
import { getCookie } from "cookies-next";

export default function Test() {
  const [cookielocal, setCookielocal] = useState();

  const getCookieLocal = () => {
    const value = getCookie("accessToken");

    console.log("Value", value);
  };

  return (
    <div>
      Test
      <button onClick={getCookieLocal}>Cookies</button>
    </div>
  );
}
