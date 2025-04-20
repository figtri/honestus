declare module '@vercel/blob' {
  export interface PutOptions {
    access?: 'public' | 'private';
    token: string;
  }

  export interface PutBlobResult {
    url: string;
    pathname: string;
    contentType: string;
    contentDisposition: string;
    size: number;
  }

  export function put(
    pathname: string,
    data: Buffer | Uint8Array | string,
    options: PutOptions
  ): Promise<PutBlobResult>;
} 