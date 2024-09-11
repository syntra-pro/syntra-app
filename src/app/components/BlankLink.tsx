'use client';

import Link from 'next/link';
import { useDAO } from './contexts/DAOContext';

interface BlankLinkProps {
  href: string;
  className: string;
  children: any;
}

export const BlankLink = ({ href, className, children }: BlankLinkProps) => {
  const { logo, color, setLogo, setColor, colorDark, setColorDark } = useDAO();
  const handleBack = () => {
    setColor('red-500');
    setColorDark('blue-500');
    setLogo('');
  };
  return (
    <Link onClick={handleBack} className={className} href={href}>
      {children}
    </Link>
  );
};
