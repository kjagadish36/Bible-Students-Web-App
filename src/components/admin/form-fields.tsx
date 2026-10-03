export function TextField({
  label,
  name,
  defaultValue,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-brand-900">
      {label}
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded-lg border border-brand-900/15 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      />
    </label>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  required = true,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-brand-900">
      {label}
      <textarea
        name={name}
        defaultValue={defaultValue}
        required={required}
        rows={3}
        className="mt-1 w-full rounded-lg border border-brand-900/15 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      />
    </label>
  );
}
