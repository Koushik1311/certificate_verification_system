import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

const apiBaseUri = process.env.NEXT_PUBLIC_API_BASE_URI;

const extractAndSaveCertificate = async (id: string) => {
  const localAccessToken = getCookie("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
    },
  };

  try {
    const response = await axios.post(
      `${apiBaseUri}/certificates/save`,
      {
        id,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const getAllCertificates = async () => {
  try {
    const response = await axios.get(`${apiBaseUri}/certificates`);

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const getSearchedCertificate = async (certificateId: string) => {
  try {
    const response = await axios.get(
      `${apiBaseUri}/certificates/${certificateId}`
    );

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

interface CertificateResponse {
  data: Blob;
}

const downloadCertificate = async (certificateId: string): Promise<void> => {
  try {
    const response: CertificateResponse = await axios.get(
      `${apiBaseUri}/certificates/download/${certificateId}`,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${certificateId}.pdf`);
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the certificate:", error);
    throw new Error("Something went wrong");
  }
};

const deleteCertificate = async (id: string) => {
  const localAccessToken = getCookie("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
    },
  };

  try {
    const response = await axios.delete(
      `${apiBaseUri}/certificates/${id}`,
      config
    );

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const updateCertificate = async (id: string, updateData: any) => {
  const localAccessToken = getCookie("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.patch(
      `${apiBaseUri}/certificates/${id}`,
      updateData,
      config
    );

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export {
  extractAndSaveCertificate,
  getAllCertificates,
  getSearchedCertificate,
  downloadCertificate,
  deleteCertificate,
  updateCertificate,
};
