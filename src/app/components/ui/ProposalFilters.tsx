// components/ProposalFilters.tsx

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../@/components/ui/dropdown-menu';

import { Button } from '../ui/Button';
import { Filter } from 'lucide-react';

interface ProposalFiltersProps {
  filters: {
    type: string;
    status: string;
  };
  setFilters: (filters: any) => void;
  filterProposals: (filters: any) => void;
}

export const ProposalFilters = ({
  filters,
  setFilters,
  filterProposals,
}: ProposalFiltersProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-36 px-3 py-2 relative z-10 rounded-lg shadow-md
     bg-white  dark:bg-stone-500 border-0">
        <DropdownMenuLabel className="text-xs">
          Filter by Type
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={filters.type}
          onValueChange={(value: any) => {
            const myFilters = { ...filters, type: value };
            setFilters(myFilters);
            filterProposals(myFilters);
          }}>
          <DropdownMenuRadioItem className="w-full" value="all">
            All
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="w-full" value="on-chain">
            On-Chain
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="w-full" value="off-chain">
            Off-Chain
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs">
          Filter by Status
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={filters.status}
          onValueChange={(value: any) => {
            // setFilters(prev => ({ ...prev, status: value }));
            const myFilters = { ...filters, status: value };
            setFilters(myFilters);
            filterProposals(myFilters);
          }}>
          <DropdownMenuRadioItem className="w-full" value="all">
            All
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="w-full" value="active">
            Active
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="w-full" value="closed">
            Non-active
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
