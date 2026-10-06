export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.08" />
      <path
        d="M16 24.5V11.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="16" cy="9.4" r="2.4" fill="currentColor" />
      <path
        d="M11.2 8.2c2.2-2.4 7.4-2.4 9.6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8.6 6.2c3.6-3.8 11.2-3.8 14.8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M6.2 4.2c4.8-4.8 14.8-4.8 19.6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
