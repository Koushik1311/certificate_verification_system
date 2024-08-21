"use client";

import { fetchAllFiles } from "@/data/file";
import { FileSpreadsheet } from "lucide-react";
import ExtractAndSaveButton from "@/components/global/ExtractAndSaveButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { CloudUpload } from "lucide-react";
import Modal from "react-modal";
import { getCookie } from "cookies-next";
import SubmitButton from "@/components/global/SubmitButton";
import { toast } from "sonner";

type fileType = {
  _id: string;
  fileUrl: string;
  isExtracted: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function Files() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [files, setFiles] = useState<fileType[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetchAllFiles();
        const data: fileType[] = response.data;
        setFiles(data);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };

    fetchFiles();
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const apiBaseUri = process.env.NEXT_PUBLIC_API_BASE_URI;

    const localAccessToken = getCookie("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${localAccessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("uploadFile", file);

    const toastId = toast.loading("Uploading file...");

    try {
      const response = await axios.post(
        `${apiBaseUri}/files/upload`,
        formData,
        config
      );

      if (response.status === 201) {
        toast.success("File uploaded successfully!", { id: toastId });
        const response = await fetchAllFiles();
        const data: fileType[] = response.data;
        setFiles(data);
      } else {
        toast.error("Upload failed. Please try again.", { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred during upload.", { id: toastId });
    } finally {
      closeModal();
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setFile(null);
    setFileName(null);
    setModalIsOpen(false);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Header Row */}
      <div>
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
        <ul>
          {files.map((file, index) => {
            const fileName = file.fileUrl.split("student_data/")[1];

            return (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-200"
              >
                <div className="w-1/2 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  <p>{fileName}</p>
                </div>
                <div className="w-1/4">
                  <p>{file.createdAt}</p>
                </div>
                <div className="w-1/4 text-right flex items-end justify-end">
                  <ExtractAndSaveButton
                    fileId={file._id}
                    isExtracted={file.isExtracted}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-end justify-end">
        <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 bg-blue-400 text-white rounded-md shadow hover:bg-blue-500 transition-all duration-150"
          >
            <CloudUpload className="w-5 h-5 mr-2" />
            Upload File
          </button>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="flex flex-col w-[500px] items-center p-6 bg-gray-100 rounded-lg shadow-md"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <h2 className="text-lg font-semibold mb-4">Upload File</h2>
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex items-center justify-center space-x-2 h-32 w-full">
                <CloudUpload className="w-6 h-6 text-blue-500" />
                <label
                  htmlFor="uploadFile"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {fileName ? fileName : "Choose a file"}
                </label>
                <input
                  id="uploadFile"
                  type="file"
                  name="uploadFile"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <SubmitButton
                onClick={handleUpload}
                type="button"
                className="w-full flex items-center justify-center h-9 rounded-[6px] bg-blue-600 hover:bg-blue-500 transition-all duration-150 text-sm font-semibold text-white mt-3"
              >
                <CloudUpload className="w-5 h-5 mr-2" />
                Upload
              </SubmitButton>
            </div>
            <SubmitButton
              onClick={closeModal}
              type="button"
              className="w-full flex items-center justify-center h-9 rounded-[6px] bg-red-500 hover:bg-red-400 transition-all duration-150 text-sm font-semibold text-white mt-3"
            >
              Close
            </SubmitButton>
          </Modal>
        </div>
      </div>
    </div>
  );
}
