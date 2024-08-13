"use client";

import React, { FC, SVGProps } from "react";

interface StyledIconProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

const StyledIcon: React.FC<StyledIconProps> = ({ Icon, className = "" }) => {
  return <Icon className={`icon ${className}`} />;
};

export default StyledIcon;
