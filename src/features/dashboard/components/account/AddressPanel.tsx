'use client';

import { Button } from '@/components/ui/Button';
import { FloatingLabelInput } from '@/features/dashboard/components/fields/FloatingLabelInput';
import { FloatingLabelSelect } from '@/features/dashboard/components/fields/FloatingLabelSelect';
import type { AccountProfile, AddressFormField } from '@/features/dashboard/types';

const COUNTRIES = [
  { value: 'United States', label: 'United States' },
  { value: 'Ethiopia', label: 'Ethiopia' },
  { value: 'United Kingdom', label: 'United Kingdom' },
];

const ADDRESS_FIELDS: AddressFormField[] = [
  { id: 'org', label: 'Organization', key: 'organization' },
  { id: 'dept', label: 'Department', key: 'department' },
  { id: 'rec', label: 'Recipient *', key: 'recipient' },
  { id: 'str', label: 'Street *', key: 'street' },
  { id: 'num', label: 'Number', key: 'number' },
  { id: 'add', label: 'Additional address line', key: 'additionalAddress' },
  { id: 'zip', label: 'ZIP code*', key: 'zipCode' },
  { id: 'cty', label: 'City*', key: 'city' },
];

interface AddressPanelProps {
  profile: AccountProfile;
  onUpdate: <K extends keyof AccountProfile>(key: K, value: AccountProfile[K]) => void;
  onSave: () => void;
}

export const AddressPanel = ({ profile, onUpdate, onSave }: AddressPanelProps) => (
  <div className="max-w-[480px] space-y-6 pb-16 animate-in fade-in duration-100">
    <FloatingLabelSelect
      label="Country"
      value={profile.country}
      onChange={(v) => onUpdate('country', v)}
      options={COUNTRIES}
    />

    {ADDRESS_FIELDS.map((field) => (
      <FloatingLabelInput
        key={field.id}
        label={field.label}
        value={profile[field.key]}
        onChange={(v) => onUpdate(field.key, v)}
        borderClassName="border-admin-border-strong"
      />
    ))}

    <div className="pt-4">
      <Button variant="accent" label="Save Address" onClick={onSave} fullWidth />
    </div>
  </div>
);
