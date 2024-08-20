"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import cn from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  sectionHeading: string;
};

export default function InteractiveSection({
  children,
  sectionHeading,
}: Props) {
  const [showSection, setShowSection] = useState<boolean>(true);

  return (
    <>
      <button
        onClick={() => setShowSection(!showSection)}
        className="w-full flex items-center gap-3"
      >
        <span className="text-lg text-slate-600">{sectionHeading}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-slate-600 transition-all duration-300",
            !showSection && "-rotate-90"
          )}
        />
      </button>
      {/* Header Row */}
      <div className="mt-4 flex justify-between items-center font-semibold border-b border-gray-300 pb-2 mb-4">
        <div className="w-1/2 flex items-center gap-2">
          <p>File</p>
        </div>
        <div className="w-1/4">
          <p>Created At</p>
        </div>
        <div className="w-1/4 text-right">
          <p>Action</p>
        </div>
      </div>
      <AnimatePresence>
        {showSection && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
