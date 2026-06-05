'use client';

import { Button } from '@/components/ui/Button';
import { FloatingLabelField } from '@/features/dashboard/components/fields/FloatingLabelField';
import { FloatingLabelInput } from '@/features/dashboard/components/fields/FloatingLabelInput';
import { FloatingLabelSelect } from '@/features/dashboard/components/fields/FloatingLabelSelect';
import type { AccountProfile } from '@/features/dashboard/types';

const COUNTRY_CODES = [
  { value: '+1', label: '+1' },
  { value: '+251', label: '+251' },
  { value: '+44', label: '+44' },
];

interface PersonalInfoPanelProps {
  profile: AccountProfile;
  onUpdate: <K extends keyof AccountProfile>(key: K, value: AccountProfile[K]) => void;
  onSave: () => void;
  onDeleteAccount: () => void;
}

export const PersonalInfoPanel = ({
  profile,
  onUpdate,
  onSave,
  onDeleteAccount,
}: PersonalInfoPanelProps) => (
  <div className="max-w-[480px] space-y-8 animate-in fade-in duration-100">
    <FloatingLabelInput
      label="Name"
      value={profile.name}
      onChange={(v) => onUpdate('name', v)}
      trailing={
        <span className="text-admin-body-sm text-brand-muted cursor-help border border-brand-muted w-4 h-4 flex items-center justify-center rounded-none font-serif select-none">
          i
        </span>
      }
    />

    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1">
        <FloatingLabelSelect
          label="Code"
          value={profile.countryCode}
          onChange={(v) => onUpdate('countryCode', v)}
          options={COUNTRY_CODES}
        />
      </div>
      <div className="col-span-3">
        <FloatingLabelField label="Phone number">
          <input
            type="tel"
            value={profile.phoneNumber}
            onChange={(e) => onUpdate('phoneNumber', e.target.value)}
            className="text-dashboard-field w-full bg-transparent text-brand-ink focus:outline-none border-none p-0 rounded-none"
          />
        </FloatingLabelField>
      </div>
    </div>

    <div className="pt-4">
      <Button variant="accent" label="Save" onClick={onSave} fullWidth />
    </div>

    <div className="pt-2">
      <button
        type="button"
        onClick={onDeleteAccount}
        className="text-dashboard-link flex items-center gap-2 text-brand-danger uppercase bg-transparent border-none p-0 cursor-pointer hover:underline transition-all"
      >
        Delete account
      </button>
    </div>
  </div>
);
