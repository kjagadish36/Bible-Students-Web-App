"use client";

import { useState } from "react";

const CUSTOM_VALUE = "__custom__";

// Real <select> dropdown (reliable rendering, unlike free-text + datalist) with an
// "Other" option that reveals a text input, so admins can still add a brand-new category.
export function CategorySelectField({
  label,
  name,
  defaultValue = "",
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: readonly string[];
}) {
  const isKnownValue = defaultValue !== "" && options.includes(defaultValue);
  const [selected, setSelected] = useState(
    defaultValue === "" ? "" : isKnownValue ? defaultValue : CUSTOM_VALUE,
  );

  return (
    <div className="block text-sm font-medium text-brand-900">
      <label>
        {label}
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          name={selected === CUSTOM_VALUE ? undefined : name}
          className="mt-1 w-full rounded-lg border border-brand-900/15 bg-white px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <option value="">— None —</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          <option value={CUSTOM_VALUE}>Other (type a new category)…</option>
        </select>
      </label>
      {selected === CUSTOM_VALUE && (
        <input
          type="text"
          name={name}
          defaultValue={isKnownValue ? "" : defaultValue}
          placeholder="New category name"
          className="mt-2 w-full rounded-lg border border-brand-900/15 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        />
      )}
    </div>
  );
}
