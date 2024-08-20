import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

const apiBaseUri = process.env.NEXT_PUBLIC_API_BASE_URI;

const deleteFile = async (fileId: string) => {
  const localAccessToken = getCookie("accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
    },
    data: { id: fileId },
  };

  try {
    const response = await axios.delete(`${apiBaseUri}/files/delete`, config);

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export { deleteFile };
