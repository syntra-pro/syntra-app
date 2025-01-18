'use client';

import { resizeImage, shortAddress } from '../../lib/utils';
import { useEffect, useState } from 'react';

import AvatarProfile from '../components/ui/AvatarProfile';
import Loader from '../components/ui/Loader';
import PlatformLayout from '../layouts/platformLayout';
import { useAuth } from '../components/contexts/AuthContext';
import { usePrivy } from '@privy-io/react-auth';

export default function Profile() {
  const { login, logout, user, authenticated } = usePrivy();

  type Profile = {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    email?: string | null | undefined;
    role?: string | null | undefined;
    displayName?: string | null | undefined;
    timezone?: string | null | undefined;
    address?: string | null | undefined;
    avatarIPFSUrl?: string | null | undefined;
    avatarFBUrl?: string | null | undefined;
    coverIPFSUrl?: string | null | undefined;
    coverFBUrl?: string | null | undefined;
    isAdmin?: boolean | null | undefined;
  };

  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const { firebaseUser } = useAuth();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const urlProfile = `/api/user?address=${user?.wallet?.address}`;
        const response = await fetch(urlProfile, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch document');
        const data = await response.json();
        const updatedProfile = { ...data.data, address: user?.wallet?.address };
        console.log('dataprofile ', updatedProfile);
        setProfile(updatedProfile);
        setCoverPreview(
          `${process.env.NEXT_PUBLIC_IPFS_IMAGE_RESOLVER1}${updatedProfile.coverIPFSUrl}`,
        );
        setAvatarPreview(
          `${process.env.NEXT_PUBLIC_IPFS_IMAGE_RESOLVER1}${updatedProfile.avatarIPFSUrl}`,
        );
      } catch (error) {
        console.error(`Error reading:`, error);
      }
    }

    if (user?.wallet?.address) {
      fetchProfile();
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setShowLoader(true);
      const formData = new FormData();

      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      if (coverFile) {
        formData.append('cover', coverFile);
      }

      formData.append('profile', JSON.stringify(profile));

      const p = `/api/user?address=${user?.wallet?.address}`;
      const response = await fetch(p, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${firebaseUser.idToken}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to fetch document');
      const data = await response.json();
      console.log('dataFINAL ', data);
      setShowLoader(false);
    } catch (error) {
      console.error(`Error reading:`, error);
      setShowLoader(false);
    }
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const resizedFile = await resizeImage(file, 256, 256);
      if (resizedFile) {
        const previewUrl = URL.createObjectURL(resizedFile);
        setAvatarPreview(previewUrl);
        setAvatarFile(resizedFile);
      }
    }
  };

  const handleCoverChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const resizedFile = await resizeImage(file, 1280, 400);
      if (resizedFile) {
        const previewUrl = URL.createObjectURL(resizedFile);
        setCoverPreview(previewUrl);
        setCoverFile(resizedFile);
      }
    }
  };

  return (
    <PlatformLayout>
      <div className="mb-4 flex w-full flex-col gap-20 px-8">
        {/* header */}
        <div className=" bg-stone-100 dark:bg-stone-700 rounded-xl flex flex-col mt-4 shadow-md">
          <div
            id="coverPicture"
            style={{
              backgroundImage: coverPreview ? `url(${coverPreview})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="min-h-[28vh] rounded-md">
            {/* cover */}
            <div className="p-4">
              <label
                className="cursor-pointer text-xs border border-stone-400 
                  bg-transparent text-stone-400 py-1 px-2 rounded-md"
                htmlFor="upload-cover">
                Change Cover Image
              </label>
              <input
                id="upload-cover"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
              />
            </div>
          </div>

          <div className="relative flex items-center justify-between">
            <div className="absolute -top-8 dark:text-stone-300">
              <div className="flex flex-row gap-4 items-end">
                {avatarPreview ? (
                  <div className="justify-center items-center gap-1 flex flex-col">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="rounded-full border-2 border-stone-400 w-16 h-16 object-cover"
                    />
                    <p className="text-xl">{profile?.displayName}</p>
                    <p className="text-sm">
                      {shortAddress(user?.wallet?.address)}
                    </p>
                  </div>
                ) : (
                  <AvatarProfile
                    address={
                      user?.wallet?.address ||
                      'https://avatars.githubusercontent.com/u/56138448?s=52&v=4'
                    }
                  />
                )}

                <div className="my-2">
                  <label
                    className="cursor-pointer text-xs border border-stone-400 
                  bg-transparent text-stone-400 py-1 px-2 rounded-md"
                    htmlFor="upload-avatar">
                    Change Avatar
                  </label>
                  <input
                    id="upload-avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl pt-10 gap-4 flex flex-col text-stone-600 dark:text-stone-400 ">
          <div className="rounded-xl w-full flex gap-4">
            <div className="flex flex-col w-full gap-2">
              <span className="text-sm">First name</span>
              <input
                className="py-2 px-3 w-full
            placeholder:dark:text-stone-500 
            placeholder:text-stone-300
            bg-white dark:bg-stone-700
            outline-none rounded-sm"
                placeholder="Enter your first name..."
                type="text"
                value={profile?.firstName ?? ''}
                onChange={e =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-sm">Last name</span>
              <input
                className="py-2 px-3 w-full
            placeholder:dark:text-stone-500 
            placeholder:text-stone-300
            bg-white dark:bg-stone-700
            outline-none rounded-sm"
                placeholder="Enter your last name..."
                type="text"
                value={profile?.lastName ?? ''}
                onChange={e =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-sm">Email</span>
              <input
                className="py-2 px-3 w-full
            placeholder:dark:text-stone-500 
            placeholder:text-stone-300
            bg-white dark:bg-stone-700
            outline-none rounded-sm"
                placeholder="Enter your email..."
                type="text"
                value={profile?.email ?? ''}
                onChange={e =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="rounded-xl w-ful flex gap-4">
            <div className="flex flex-col w-full gap-2">
              <span className="text-sm">Role</span>
              <input
                className="py-2 px-3 w-full
            placeholder:dark:text-stone-500 
            placeholder:text-stone-300
            bg-white dark:bg-stone-700
            outline-none rounded-sm"
                type="text"
                value={profile?.role ?? ''}
                onChange={e => setProfile({ ...profile, role: e.target.value })}
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-sm">Display name</span>
              <input
                className="py-2 px-3 w-full
            placeholder:dark:text-stone-500 
            placeholder:text-stone-300
            bg-white dark:bg-stone-700
            outline-none rounded-sm"
                placeholder="Enter your display name..."
                type="text"
                value={profile?.displayName ?? ''}
                onChange={e =>
                  setProfile({ ...profile, displayName: e.target.value })
                }
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-sm">Timezone</span>
              <input
                onChange={e =>
                  setProfile({ ...profile, timezone: e.target.value })
                }
                className="py-2 px-3 w-full
            placeholder:dark:text-stone-500 
            placeholder:text-stone-300
            bg-white dark:bg-stone-700
            outline-none rounded-sm"
                type="text"
                value={profile?.timezone ?? ''}
              />
            </div>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={handleSave}
            className="text-xs rounded-md px-3 py-2 mt-2
              dark:hover:bg-stone-600
              dark:bg-stone-700
              bg-stone-200
              dark:text-stone-400 text-stone-900">
            {showLoader ? (
              <div className="flex gap-2 items-center">
                <Loader fullWidth={false} /> Saving...
              </div>
            ) : (
              <span>Save changes</span>
            )}
          </button>
        </div>
      </div>
    </PlatformLayout>
  );
}
