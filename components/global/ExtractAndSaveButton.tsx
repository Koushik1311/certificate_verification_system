"use client";

import { useState } from "react";
import { extractAndSaveCertificate } from "@/data/certificate";
import { FileCog, Trash } from "lucide-react";
import { toast } from "sonner";
import { deleteFile } from "@/data/deleteFiles";

export default function ExtractAndSaveButton({
  fileId,
  isExtracted,
}: {
  fileId: string;
  isExtracted: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(isExtracted);

  const extractAndSaveHandle = async () => {
    setIsLoading(true);
    const loadingToastId = toast.loading(
      "Extracting and saving certificates..."
    );

    try {
      const data = await extractAndSaveCertificate(fileId);
      if (!data) {
        toast.info("Extraction failed", { id: loadingToastId });
        setIsSuccess(false);
      } else {
        toast.success("Extraction successful", { id: loadingToastId });
        setIsSuccess(true);
      }
    } catch (error) {
      toast.error("An error occurred", { id: loadingToastId });
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const loadingToastId = toast.loading("Deleting certificate...");
    try {
      await deleteFile(fileId);
      toast.success("Certificate deleted successfully", { id: loadingToastId });
    } catch (error) {
      toast.error("Failed to delete certificate", { id: loadingToastId });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {isSuccess === false ? (
        <button
          onClick={extractAndSaveHandle}
          disabled={isLoading || isSuccess}
          className="flex items-center gap-2 hover:text-blue-400 transition-colors disabled:opacity-50"
        >
          <FileCog className="w-5 h-5" />
          <p>{isLoading ? "Processing..." : "Extract & Save"}</p>
        </button>
      ) : (
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 hover:text-red-400 transition-colors"
        >
          <Trash className="w-5 h-5" />
          <p>Delete</p>
        </button>
      )}
    </div>
  );
}
