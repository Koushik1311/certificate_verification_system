import ExtractAndSaveButton from "@/components/global/ExtractAndSaveButton";
import { fetchAllFiles } from "@/data/file";
import { FileSpreadsheet } from "lucide-react";

type fileType = {
  _id: string;
  fileUrl: string;
  isExtracted: boolean;
  createdAt: string;
  updatedAt: string;
};

export default async function AllFiles() {
  const response = await fetchAllFiles();
  const data: fileType[] = response.data;

  return (
    <>
      {/* File List */}
      <ul>
        {data.map((file, index) => {
          // Extract the filename after 'student_data/'
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
    </>
  );
}
