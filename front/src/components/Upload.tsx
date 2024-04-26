'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { toast } from 'sonner';
import { useAccount, useWatchContractEvent, useWriteContract } from 'wagmi';
import { uploadToIPFS } from '@/lib/upload.action';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { erc721abi } from '@/lib/erc721.abi';
import { createMusic } from '@/lib/music.action';

interface FormData {
  music: File | null;
  title: string | null;
  year: string | null;
}

const Upload = () => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const [formInfo, setFormInfo] = useState<FormData>({
    music: null,
    title: null,
    year: null,
  });
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [triggerCreateMusic, setTriggerCreateMusic] = useState<boolean>(false);

  const handleUpload = async () => {
    try {
      if (!formInfo.music) throw new Error('Please select a music file !');
      if (!formInfo.title) throw new Error('Please enter a title !');
      if (!formInfo.year) throw new Error('Please enter a year !');
      if (!address) throw new Error('Please connect your wallet first !');

      toast.loading('Uploading to IPFS...');
      const formData = new FormData();
      formData.append('music', formInfo.music);
      formData.append('title', formInfo.title);
      const uploadData = await uploadToIPFS(formData);
      setIpfsHash(uploadData.ipfsHash);
      toast.success('Successfully uploaded music to IPFS !');

      toast.loading('Minting the NFT on chain...');
      writeContract({
        abi: erc721abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'safeMint',
        args: [
          formInfo.title,
          address,
          uploadData.ipfsHash,
          BigInt(formInfo.year),
          address,
        ],
      });
    } catch (error: any) {
      toast.dismiss();
      toast.error('Failed to upload music', {
        description: error.message,
      });
    }
  };

  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: erc721abi,
    eventName: 'Minted',
    onLogs(logs) {
      console.log('Minted', logs);
      toast.dismiss();
      toast.success('Successfully minted the NFT on chain !');
      setTriggerCreateMusic(true);
    },
  });

  useEffect(() => {
    if (triggerCreateMusic) {
      setTriggerCreateMusic(false);
      toast.loading('Adding music to db...');
      createMusic({
        title: formInfo.title as string,
        year: Number(formInfo.year),
        ipfsHash: ipfsHash as string,
        artist: address as `0x${string}`,
      }).then((data) => {
        console.log('data', data);
        toast.dismiss();
        toast.success('Successfully added music to DB!');
      });
    }
  }, [triggerCreateMusic]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFormInfo({ ...formInfo, music: event.target.files[0] });
  };

  return (
    <div className='text-white'>
      <form action={handleUpload} className='space-y-4'>
        <div className='grid w-full max-w-sm items-center gap-2'>
          <Label>Music</Label>
          <Input
            type='file'
            accept='.mp3, .flac'
            className='text-black font-semibold max-w-sm'
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleFileChange(event)
            }
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-2'>
          <Label>Title</Label>
          <Input
            type='text'
            className='text-black font-semibold max-w-sm'
            onChange={(event) =>
              setFormInfo({ ...formInfo, title: event.target.value })
            }
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-2'>
          <Label>Year</Label>
          <Input
            type='text'
            className='text-black font-semibold max-w-sm'
            onChange={(event) =>
              setFormInfo({ ...formInfo, year: event.target.value })
            }
          />
        </div>
        <Button type='submit' variant='secondary'>
          Upload
        </Button>
      </form>
      <div className='mt-4'>
        {ipfsHash && formInfo.title && (
          <ReactAudioPlayer
            src={`https://${ipfsHash}.ipfs.w3s.link/${formInfo.title}`}
            autoPlay
            controls
          />
        )}
      </div>
    </div>
  );
};

export default Upload;
