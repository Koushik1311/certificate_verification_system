import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

const apiBaseUri = process.env.NEXT_PUBLIC_API_BASE_URI;

const fetchAllFiles = async () => {
  const localAccessToken = getCookie("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
    },
  };

  try {
    const response = await axios.get(`${apiBaseUri}/files`, config);

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const uploadFile = async (localUploadedFile: File) => {
  const localAccessToken = getCookie("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const formData = new FormData();
  formData.append("uploadFile", localUploadedFile);

  try {
    const response = await axios.post(
      `${apiBaseUri}/files/upload`,
      formData,
      config
    );

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export { fetchAllFiles, uploadFile };
