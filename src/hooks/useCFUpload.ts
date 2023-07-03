import { useCallback, useState } from 'react';
import { uploadImage } from '../api/files';

export function useCFUpload() {
  const [image, setImage] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File, info: { type: 'post' | 'profile'; refId?: string }) => {
      const data = await uploadImage(file, info);
      setImage(data.path);
      return data.path;
    },
    [],
  );

  return {
    image,
    upload,
  };
}
