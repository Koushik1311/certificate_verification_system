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

export {
  extractAndSaveCertificate,
  getAllCertificates,
  getSearchedCertificate,
};
