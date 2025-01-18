'use client';

import React, { useEffect, useRef, useState } from 'react';
import { setBlockie, shortAddress } from '../../../lib/utils';

interface AvatarProfileProps {
  address: string;
}

const AvatarProfile: React.FC<AvatarProfileProps> = ({ address }) => {
  // fetch data from firestore using the address, if not found, return the blockies

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setBlockie(canvasRef, address);

    async function fetchUser(address: string) {
      try {
        const p = `/api/user?address=${address}`;
        const response = await fetch(p, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch document');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error reading:`, error);
      }
    }

    fetchUser(address).then((u: any) => {
      if (u) {
        setUser(u.data);
      }
    });
  }, [address]);

  return (
    <div className="justify-center items-center gap-1 flex flex-col">
      {user ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="rounded-full border-2 border-stone-400 w-16 h-16 object-cover"
          src={
            `${process.env.NEXT_PUBLIC_IPFS_IMAGE_RESOLVER1}/${user?.avatarIPFSUrl}` ||
            user?.profileImage
          }
          alt="profile"
        />
      ) : (
        <canvas
          ref={canvasRef}
          width={26}
          height={26}
          className="w-16 h-16 rounded-full border border-stone-400"
        />
      )}

      <p className="text-xl">{user?.displayName}</p>
      <p className="text-sm">{shortAddress(address)}</p>
    </div>
  );
};

export default AvatarProfile;
