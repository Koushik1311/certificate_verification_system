import { getAllCertificates } from "@/data/certificate";
import { getDay, getMonth, getYear } from "@/utils/local-date-and-time";

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
  const data = await getAllCertificates();
  const certificates: CertificateTypes[] = data.data;

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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {certificates.map((certificate) => (
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
                {certificate.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
