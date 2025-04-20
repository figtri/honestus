import { put } from '@vercel/blob';

interface VercelBlobStorageOptions {
  token: string;
  access?: 'public' | 'private';
}

interface UploadArgs {
  file: Buffer;
  filename: string;
}

interface DeleteArgs {
  filename: string;
}

export const vercelBlobStorage = (options: VercelBlobStorageOptions) => {
  return {
    async upload({ file, filename }: UploadArgs) {
      const { url } = await put(filename, file, {
        access: 'public',
        token: options.token,
      });
      return { url };
    },

    async delete({ filename }: DeleteArgs) {
      // Note: Vercel Blob SDK doesn't provide a direct delete method in the client SDK
      console.log(`Would delete file: ${filename}`);
    },
  };
}; 