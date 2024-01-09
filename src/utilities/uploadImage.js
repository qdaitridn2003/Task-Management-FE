import * as FileSystem from 'expo-file-system';

import { axiosBaseURL } from '../common';

export const uploadImage = async (path, uri, fieldName) => {
  try {
    const response = await FileSystem.uploadAsync(
      `https://task-management-be.up.railway.app/api/${path}`,
      uri,
      {
        fieldName,
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      },
    );
    const parsedResponse = JSON.parse(response.body);
    const data = parsedResponse.data.avatarUrl;
    return data;
  } catch (error) {
    console.log('Upload Image Error:', error);
  }
};
