"use client";

import { useState } from "react";
import {
  downloadCertificate,
  getSearchedCertificate,
} from "@/data/certificate";
import { getDay, getMonth, getYear } from "@/utils/local-date-and-time";
import { ArrowBigDownDash } from "lucide-react";
import SearchButton from "./SearchButton";

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

export default function CertificateSearch() {
  const [certificate, setCertificate] = useState<CertificateTypes | null>(null);
  const [notFound, setNotFound] = useState(false);

  const searchCertificate = async (certificate_id: string) => {
    const response = await getSearchedCertificate(certificate_id);

    if (!response || !response.data) {
      setNotFound(true);
      setCertificate(null);
    } else {
      setCertificate(response.data);
      setNotFound(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const certificate_id = formData.get("certificate_id") as string;
    searchCertificate(certificate_id);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col items-center">
        <input
          type="text"
          name="certificate_id"
          placeholder="Enter Certificate ID"
          required
          className="h-12 px-6 text-lg rounded-full border-2 border-blue-300 focus:outline-blue-400"
        />
        <SearchButton
          className="flex items-center justify-center w-36 h-12 rounded-full bg-blue-600 hover:bg-blue-500 transition-all duration-150 text-lg font-semibold text-white mt-6"
          pendingText="Searching..."
        >
          Search
        </SearchButton>
      </form>

      {notFound && (
        <p className="text-red-600 mt-4 text-center">Certificate not found.</p>
      )}

      {certificate && (
        <div className="overflow-x-auto w-[95vw]">
          <table className="min-w-full divide-y divide-gray-200 mt-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certificate ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Internship Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Starting Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ending Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
                  {getYear(certificate.createdAt)}-
                  {getMonth(certificate.createdAt)}-
                  {getDay(certificate.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() =>
                      downloadCertificate(certificate.certificateId)
                    }
                    className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                  >
                    <ArrowBigDownDash className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
