import { AuthorPill } from './AuthorPill';
import { LightningBoltIcon } from '@radix-ui/react-icons';
import { LinkIcon } from 'lucide-react';
import { getTimeAgo } from '../../../lib/utils';

export const ProposalDetails = ({ p }: any) => (
  <div className="text-xs w-full flex justify-between text-stone-600 dark:text-stone-600">
    <div className="flex gap-3 items-center">
      <AuthorPill authorObject={p.author} />
      <span>•</span>
      <span>{getTimeAgo(p.start)}</span>
    </div>
    <div className="flex gap-1 items-center">
      {p.source !== 'tally' ? (
        <>
          <LightningBoltIcon
            className="text-amber-400"
            width={12}
            height={12}
          />
          Off-Chain ({p.source})
        </>
      ) : (
        <>
          <LinkIcon className="text-blue-600" width={12} height={12} />
          On-Chain ({p.source})
        </>
      )}
    </div>
  </div>
);
