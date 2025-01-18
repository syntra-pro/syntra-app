import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { shortAddress } from '../../../lib/utils';

export const AuthorPill = ({ authorObject }: any) => {
  return (
    <div className="flex gap-3 items-center">
      {/* picture */}
      <Avatar className="h-6 w-6">
        <AvatarImage src={authorObject?.picture} alt={authorObject?.name} />
        <AvatarFallback>{authorObject?.name}</AvatarFallback>
      </Avatar>
      <span>{shortAddress(authorObject?.ens || authorObject?.address)}</span>
    </div>
  );
};
