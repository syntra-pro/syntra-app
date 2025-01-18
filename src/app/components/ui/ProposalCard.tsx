import { ProposalDetails } from './ProposalDetails';
import { ProposalStateBadge } from './ProposalStateBadge';
import { getTimeUntil } from '../../../lib/utils';

export const ProposalCard = ({
  p,
  index,
  openProposal,
  selectedProposal,
}: any) => {
  const isSelected = selectedProposal === index;
  const isSnapshot = p.source === 'snapshot';
  const baseStyle = `rounded-lg w-full p-4 gap-2 flex flex-col mb-3 box-border dark:opacity-70 transition-all
                       hover:shadow-md cursor-pointer`;
  const bgColor = isSnapshot
    ? 'bg-amber-50 dark:bg-amber-200 hover:bg-amber-50 dark:hover:bg-amber-300'
    : 'bg-blue-50 dark:bg-blue-200 hover:bg-blue-50 dark:hover:bg-blue-300';
  const selectedStyle = isSelected
    ? isSnapshot
      ? 'dark:bg-amber-300 border-amber-200 dark:border-amber-500 border-2 shadow-md'
      : 'dark:bg-blue-300 border-blue-200 dark:border-blue-500 border-2 shadow-md'
    : '';

  return (
    <button
      key={index}
      onClick={() => openProposal(p, index)}
      className={`${baseStyle} ${bgColor} ${selectedStyle}`}>
      <div className="flex items-center w-full text-md justify-between ">
        <div className="relative max-w-full overflow-hidden">
          <div className="hover:animate-marquee truncate whitespace-nowrap">
            {p.title}
          </div>
        </div>

        <ProposalStateBadge state={p.state} />
      </div>
      <div className="text-xs text-left pb-2 text-stone-400 dark:text-stone-600">
        {getTimeUntil(p.end)}
      </div>
      <ProposalDetails p={p} />
    </button>
  );
};
