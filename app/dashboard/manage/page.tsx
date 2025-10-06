export const dynamic = "force-dynamic"; // prevent static generation

import Data from "@/components/dashboard/manage/Data";
import { getAllCertificates } from "@/data/certificate";

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

export default async function Manage() {
  let certificates: CertificateTypes[] = [];

  try {
    const data = await getAllCertificates();
    certificates = data.data as CertificateTypes[];
  } catch (e) {
    // Render a graceful UI instead of throwing during build/runtime
  }

  return (
    <div className="p-6">
      <table className="min-w-full divide-y divide-gray-200">
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
        <Data certificates={certificates} />
      </table>
      {certificates.length === 0 && (
        <p className="text-sm text-gray-500 mt-4">No data to display.</p>
      )}
    </div>
  );
}
