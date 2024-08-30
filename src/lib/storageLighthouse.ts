// "use server";

import { EIP1193Provider } from "@privy-io/react-auth";
import lighthouse from "@lighthouse-web3/sdk";

// const apiKey = process.env.NEXT_PUBLIC_LH || "";

export const uploadLH = async (
  address: string,
  signature: any,
  contents: string,
  apiKey: string,
  name: string
) => {
  try {
    if (!signature) return;
    // unencrypted
    const response = await lighthouse.uploadText(contents, apiKey, name);

    // BUG this does not work on LH side!
    // const response = await lighthouse.textUploadEncrypted(
    //   contents,
    //   apiKey,
    //   address,
    //   signature
    // );
    // console.log(
    //   `Decrypt at https://decrypt.mesh3.network/evm/${response.data[0].Hash}`
    // );

    // {
    //     "data": {
    //         "Name": "myDOC",
    //         "Hash": "bafkreidiyu4d4lzp5a4jl3hxkulmnx54cdpepnk3rroax7xexfbin3jite",
    //         "Size": "63"
    //     }
    // }
    return {
      response,
      url: `https://ipfs.io/ipfs/${response?.data?.Hash}`,
      //   url: `https://decrypt.mesh3.network/evm/${response.data[0].Hash}`,
    };
  } catch (error) {
    console.log("error:: ", error);
  }
};

export const getLHUploads = async (apiKey: string) => {
  // TODO  @param {number} [lastKey=null] - id of last object of previous response, defaults to null.
  const response = await lighthouse.getUploads(apiKey);

  return response;
};

async function getMessage(walletAddr: string) {
  const response = await fetch(
    `https://api.lighthouse.storage/api/auth/get_message?publicKey=${walletAddr}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch message");
  }

  const data = await response.json();
  return data;
}

export const getLHkey = async (address: string, provider: EIP1193Provider) => {
  //   try {
  if (!address) return;
  const verificationMessage = await getMessage(address);
  if (!verificationMessage) return;

  const signAuthMessage = async (
    address: string,
    verificationMessage: string
  ) => {
    const signedMessage = await provider.request({
      method: "personal_sign",
      params: [verificationMessage, address],
    });
    return signedMessage;
  };

  //   const signedMessage = await signAuthMessage(address, verificationMessage);
  //   const key = await lighthouse.getApiKey(address, signedMessage);
  //   return { signedMessage, key };

  return signAuthMessage(address, verificationMessage).then((signedMessage) => {
    return lighthouse.getApiKey(address, signedMessage).then((key) => {
      return { signedMessage, key };
    });
  });

  //   } catch (error) {
  //     console.log("err lhkey", error);
  //   }
};
