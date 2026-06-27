/**
 * Inline SVG icons matching the Nintendo Switch-style UI.
 * All icons are designed on a 24x24 viewBox.
 */

type IconProps = { className?: string };

export const IcoController = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="10" rx="3" />
    <circle cx="8" cy="12" r="1.4" />
    <circle cx="16" cy="11" r="1" />
    <circle cx="16" cy="13" r="1" />
  </svg>
);

export const IcoTrophy = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
    <path d="M7 6H4v2a3 3 0 0 0 3 3" />
    <path d="M17 6h3v2a3 3 0 0 1-3 3" />
    <path d="M9 18h6" />
    <path d="M12 13v5" />
  </svg>
);

export const IcoPalette = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 1 0 0 18 2 2 0 0 0 2-2 1.6 1.6 0 0 1 1.6-1.6h1.4A3 3 0 0 0 20 14.5C20 8.7 16.4 3 12 3Z" />
    <circle cx="7.5" cy="11" r="1" />
    <circle cx="11" cy="7.5" r="1" />
    <circle cx="15" cy="8" r="1" />
    <circle cx="17" cy="11.5" r="1" />
  </svg>
);

export const IcoChat = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
  </svg>
);

export const IcoInfo = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8h.01" />
    <path d="M11 12h1v5h1" />
  </svg>
);

export const IcoHeart = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M12 20s-7-4.5-9-9.5C1.4 6.7 4.3 4 7.5 4c1.9 0 3.4 1.1 4.5 2.6C13.1 5.1 14.6 4 16.5 4 19.7 4 22.6 6.7 21 10.5 19 15.5 12 20 12 20Z"/>
  </svg>
);

export const IcoScan = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8V6a2 2 0 0 1 2-2h2" />
    <path d="M20 8V6a2 2 0 0 0-2-2h-2" />
    <path d="M4 16v2a2 2 0 0 0 2 2h2" />
    <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
    <path d="M4 12h16" />
  </svg>
);

export const IcoEdit = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h4l10-10-4-4L4 16v4Z" />
    <path d="M14 6l4 4" />
  </svg>
);

export const IcoPlus = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const IcoX = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </svg>
);

export const IcoFolder = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
    <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.2c.4 0 .8.16 1.06.44L11 6.5h8.5A1.5 1.5 0 0 1 21 8v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"/>
  </svg>
);

export const IcoArrowLeft = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 6l-6 6 6 6" />
  </svg>
);

export const IcoDiscord = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.6 5.4A14 14 0 0 0 16.2 4l-.4.7a12 12 0 0 0-7.7 0L7.7 4A14 14 0 0 0 4.4 5.4C2 9.2 1.4 13 1.7 16.7a14 14 0 0 0 4.3 2.2l1-1.4a8 8 0 0 1-1.6-.8l.4-.3a10 10 0 0 0 8.4 0l.4.3a8 8 0 0 1-1.6.8l1 1.4a14 14 0 0 0 4.3-2.2c.4-4.2-.5-8-2.7-11.3ZM8.6 14.7c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8c1 0 1.7.8 1.7 1.8s-.7 1.8-1.7 1.8Zm6.8 0c-1 0-1.7-.8-1.7-1.8s.8-1.8 1.7-1.8c1 0 1.7.8 1.7 1.8s-.8 1.8-1.7 1.8Z"/>
  </svg>
);

export const IcoTrash = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h16" />
    <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
  </svg>
);

export const IcoSearch = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const IcoApps = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1.4"/>
    <rect x="14" y="3" width="7" height="7" rx="1.4"/>
    <rect x="3" y="14" width="7" height="7" rx="1.4"/>
    <rect x="14" y="14" width="7" height="7" rx="1.4"/>
  </svg>
);

export const IcoGear = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
  </svg>
);
