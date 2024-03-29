import * as FileSystem from 'expo-file-system';

import { axiosBaseURL } from '../common';

export const uploadImage = async (path, uri, fieldName, token) => {
  try {
    const response = await FileSystem.uploadAsync(`${axiosBaseURL}/${path}`, uri, {
      fieldName,
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      headers: { Authorization: `Bearer ${token}` },
    });
    const parsedResponse = JSON.parse(response.body);
    const data = parsedResponse.data.avatarUrl;
    return data;
  } catch (error) {
    console.log('Upload Image Error:', error);
  }
};
