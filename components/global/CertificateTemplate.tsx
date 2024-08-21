import { ArrowBigDownDash } from "lucide-react";

type CertificateProps = {
  certificateId: string;
  studentName: string;
  internshipDomain: string;
  startingDate: string;
  endingDate: string;
  createdAt: string;
};

export default function CertificateTemplate({
  certificateId,
  studentName,
  internshipDomain,
  startingDate,
  endingDate,
  createdAt,
}: CertificateProps) {
  return (
    <>
      <div
        id="certificate-content"
        className="hidden bg-white p-8 rounded-lg shadow-lg text-center max-w-xl w-full"
      >
        <h1 className="text-2xl font-bold mb-4">Certificate of Completion</h1>
        <p className="text-lg mb-2">This is to certify that</p>
        <p className="text-xl font-semibold mb-4">{studentName}</p>
        <p className="text-lg mb-2">
          has successfully completed the internship in
        </p>
        <p className="text-xl font-semibold mb-4">{internshipDomain}</p>
        <p className="text-lg mb-2">
          from {startingDate} to {endingDate}.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Certificate ID: {certificateId}
        </p>
        <p className="text-sm text-gray-500">Issued on: {createdAt}</p>
      </div>
      <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
        <ArrowBigDownDash className="w-5 h-5" />
        <span>Download</span>
      </button>
    </>
  );
}
