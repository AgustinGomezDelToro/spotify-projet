'use server';

export const uploadToIPFS = async (formData: FormData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_ENDPOINT}/api/music/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error('Failed to upload music to IPFS !');
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
