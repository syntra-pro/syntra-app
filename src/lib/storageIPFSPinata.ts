import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY!,
});

type UploadToPinataResult = {
  success: boolean;
  cid?: string;
  error?: string;
};

export const uploadToPinata = async (
  fileName: string,
  fileContent: string,
): Promise<UploadToPinataResult> => {
  try {
    const upload = await pinata.upload.base64(fileContent);
    return { success: true, cid: upload.IpfsHash };
  } catch (error: any) {
    console.error('Error uploading to Pinata:', error);
    return { success: false, error: error.message };
  }
};
