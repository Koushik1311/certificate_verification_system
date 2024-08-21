"use client";

import { deleteCertificate, getAllCertificates } from "@/data/certificate";
import { getDay, getMonth, getYear } from "@/utils/local-date-and-time";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import UpdateData from "./UpdateData";

type CertificateTypes = {
  _id: string;
  certificateId: string;
  studentName: string;
  internshipDomain: string;
  startingDate: string;
  endingDate: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  certificates: CertificateTypes[];
};

export default function Data({ certificates }: Props) {
  const [localCertificates, setLocalCertificates] = useState(certificates);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificateTypes | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const loadingToastId = toast.loading("Deleating certificate...");
    try {
      const response = await deleteCertificate(id);

      if (response.statusCode === 404) {
        toast.info("Certificate not found", { id: loadingToastId });
      }

      const updatedCertificates = localCertificates.filter(
        (certificate) => certificate._id !== id
      );
      toast.success("Certificate deleted successfully", { id: loadingToastId });
      setLocalCertificates(updatedCertificates);

      router.refresh();
    } catch (error) {
      console.error("Failed to delete certificate:", error);
    }
  };

  const handleUpdateClick = (certificate: CertificateTypes) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleUpdateSuccess = async () => {
    const data = await getAllCertificates();
    const certificates: CertificateTypes[] = data.data;
    setLocalCertificates(certificates);
    router.refresh();
  };

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200">
        {localCertificates.map((certificate) => (
          <tr key={certificate._id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {certificate.certificateId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {certificate.studentName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {certificate.internshipDomain}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {getYear(certificate.startingDate)}-
              {getMonth(certificate.startingDate)}-
              {getDay(certificate.startingDate)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {getYear(certificate.endingDate)}-
              {getMonth(certificate.endingDate)}-
              {getDay(certificate.endingDate)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {getYear(certificate.createdAt)}-{getMonth(certificate.createdAt)}
              -{getDay(certificate.createdAt)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-4">
              <button
                onClick={() => handleUpdateClick(certificate)}
                className="hover:text-blue-500 transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(certificate._id)}
                className="hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {selectedCertificate && (
        <UpdateData
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          certificate={selectedCertificate}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </>
  );
}
