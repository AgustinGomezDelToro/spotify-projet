'use server';

export const createUser = async (address: `0x${string}`) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_ENDPOINT}/api/user/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress: address }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
