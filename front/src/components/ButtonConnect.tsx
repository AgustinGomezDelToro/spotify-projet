'use client';

import { useAccount } from 'wagmi';

import { Button } from './ui/button';
import { useEffect } from 'react';
import { createUser } from '@/lib/user.action';

const ButtonConnect = () => {
  const { address } = useAccount();
  useEffect(() => {
    if (!address) return;
    createUser(address);
  }, [address]);
  return (
    <div className='mt-auto flex flex-col gap-2'>
      {address && (
        <Button className='w-full rounded-full' size='sm'>
          Upgrade Plan
        </Button>
      )}
      <w3m-button size='sm' balance='show' />
    </div>
  );
};

export default ButtonConnect;
