"use client";

import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState<File>();

  return (
    <div>
      <h1>Upload</h1>

      <div>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />

        <button
          onClick={() => {
            console.log("upload");
            // Send it to backend
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
