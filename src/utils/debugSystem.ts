/**
 * ============================================================
 * DEBUG SYSTEM — remove this entire file + its imports to clean up
 * ============================================================
 *
 * Toggle with the H key. Provides:
 *   1. Reference image overlay at ~4% opacity
 *   2. A panel to live-edit CSS custom properties (radii, colors, etc.)
 *   3. Click-on-element inspector — hover any element, press H-inspect
 *      to see and tweak its CSS vars in the panel.
 *
 * TO REMOVE LATER:
 *   - Delete this file
 *   - Delete src/components/DebugPanel.tsx
 *   - Delete the debug-related lines in App.tsx (marked with // [DEBUG])
 *   - Remove the .debug-* CSS classes from index.css
 */

import { useEffect, useState, useCallback, useRef } from 'react';

/* ---------- editable property registry ---------- */
export interface DebugProp {
  label: string;
  variable: string;   // CSS custom property name, e.g. "--r-sm"
  value: string;       // current resolved value
  group: string;       // grouping label in the panel
}

/** Read a CSS variable from the screen element */
function readVar(name: string): string {
  const screen = document.querySelector('.screen');
  if (!screen) return '';
  return getComputedStyle(screen).getPropertyValue(name).trim();
}

/** Write a CSS variable to the screen element */
function writeVar(name: string, value: string) {
  const screen = document.querySelector('.screen');
  if (!screen) return;
  screen.style.setProperty(name, value);
}

/** Snapshot of all editable properties at startup */
const PROPERTY_DEFS: Omit<DebugProp, 'value'>[] = [
  // Radii
  { label: 'Radius XS',  variable: '--r-xs',  group: 'Corner Radii' },
  { label: 'Radius SM',  variable: '--r-sm',  group: 'Corner Radii' },
  { label: 'Radius MD',  variable: '--r-md',  group: 'Corner Radii' },
  { label: 'Radius LG',  variable: '--r-lg',  group: 'Corner Radii' },

  // Colors
  { label: 'Paper BG',     variable: '--paper',     group: 'Colors' },
  { label: 'Paper Hi',     variable: '--paper-hi',   group: 'Colors' },
  { label: 'Surface',      variable: '--surface',    group: 'Colors' },
  { label: 'Surface Mute', variable: '--surface-muted', group: 'Colors' },
  { label: 'Ink',          variable: '--ink',        group: 'Colors' },
  { label: 'Ink Soft',     variable: '--ink-soft',   group: 'Colors' },
  { label: 'Ink Mute',     variable: '--ink-mute',   group: 'Colors' },
  { label: 'Green',        variable: '--green',      group: 'Colors' },
  { label: 'Red',          variable: '--red',        group: 'Colors' },
  { label: 'Blue',         variable: '--blue',       group: 'Colors' },
  { label: 'Yellow',       variable: '--yellow',     group: 'Colors' },
  { label: 'Purple',       variable: '--purple',     group: 'Colors' },
];

/** Build the initial property list with resolved values */
export function getDebugProps(): DebugProp[] {
  return PROPERTY_DEFS.map((def) => ({
    ...def,
    value: readVar(def.variable),
  }));
}

/** Set a property and return updated list */
export function setDebugProp(variable: string, value: string): DebugProp[] {
  writeVar(variable, value);
  return getDebugProps();
}

/* ---------- element inspector ---------- */
export interface InspectedElement {
  tag: string;
  classes: string;
  styles: Record<string, string>;
}

/** Get computed styles of the element under the cursor */
export function inspectElementAt(x: number, y: number): InspectedElement | null {
  // Temporarily disable pointer-events so we can hit-test through overlays
  const debugEls = document.querySelectorAll('.debug-overlay-root, .debug-panel');
  debugEls.forEach((el) => ((el as HTMLElement).style.pointerEvents = 'none'));

  const el = document.elementFromPoint(x, y);

  debugEls.forEach((el) => ((el as HTMLElement).style.pointerEvents = ''));

  if (!el || el === document.body || el === document.documentElement) return null;

  const cs = getComputedStyle(el);
  const interesting = [
    'border-radius', 'background-color', 'color', 'font-size',
    'padding', 'margin', 'height', 'width', 'gap',
  ];
  const styles: Record<string, string> = {};
  for (const prop of interesting) {
    const v = cs.getPropertyValue(prop);
    if (v && v !== '0px' && v !== 'none' && v !== 'normal' && v !== 'rgba(0, 0, 0, 0)') {
      styles[prop] = v;
    }
  }

  return {
    tag: el.tagName.toLowerCase(),
    classes: el.className ? `.${String(el.className).split(' ').join('.')}` : '',
    styles,
  };
}

/* ---------- reference overlay ---------- */
export function useDebugToggle() {
  const [active, setActive] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [showRef, setShowRef] = useState(true);

  const toggle = useCallback(() => {
    setActive((prev) => {
      const next = !prev;
      if (!next) setShowPanel(false);
      return next;
    });
  }, []);

  const togglePanel = useCallback(() => setShowPanel((p) => !p), []);
  const toggleRef = useCallback(() => setShowRef((r) => !r), []);

  // Keyboard listener is handled in App.tsx to avoid conflicts
  // with the app's own keyboard navigation.

  return { active, showPanel, showRef, toggle, togglePanel, toggleRef };
}
