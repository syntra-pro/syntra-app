export const ProposalStateBadge = ({ state }: { state: string }) => {
  const stateClasses: any = {
    active: 'bg-green-100 dark:bg-green-500 text-green-600 dark:text-green-50',
    closed: 'bg-slate-300 dark:bg-stone-100 dark:text-slate-800',
    default: 'bg-blue-200 dark:bg-blue-400 dark:text-blue-50',
  };
  return (
    <span
      className={`rounded-xl text-xs px-3 py-1 ${
        stateClasses[state] || stateClasses.default
      }`}>
      {state &&
        state.length > 0 &&
        state.charAt(0).toUpperCase() + state.slice(1)}
    </span>
  );
};
