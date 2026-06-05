'use client';

import { FloatingLabelInput } from '@/features/dashboard/components/fields/FloatingLabelInput';
import type { AccountProfile } from '@/features/dashboard/types';

interface EmailPanelProps {
  profile: AccountProfile;
  onUpdate: <K extends keyof AccountProfile>(key: K, value: AccountProfile[K]) => void;
}

export const EmailPanel = ({ profile, onUpdate }: EmailPanelProps) => (
  <div className="max-w-[480px] space-y-6 animate-in fade-in duration-100">
    <FloatingLabelInput
      label="Email"
      type="email"
      value={profile.email}
      onChange={(v) => onUpdate('email', v)}
      borderClassName="border-admin-border-strong"
    />
    <p className="text-dashboard-field text-brand-muted">
      Changing primary communication credentials resets active decentralized cryptographic
      payment session validations.
    </p>
  </div>
);
