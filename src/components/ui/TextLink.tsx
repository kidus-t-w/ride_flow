'use client';

import { Button } from '@/components/ui/Button';

interface TextLinkProps {
  label: string;
  onClick: () => void;
}

export const TextLink = ({ label, onClick }: TextLinkProps) => (
  <Button variant="ghost" onClick={onClick}>
    {label}
  </Button>
);
