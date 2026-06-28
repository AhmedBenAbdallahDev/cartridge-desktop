/**
 * ============================================================
 * DEBUG PANEL — remove this file to clean up the debug system
 * ============================================================
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  type DebugProp,
  type InspectedElement,
  getDebugProps,
  setDebugProp,
  inspectElementAt,
} from '../utils/debugSystem';

interface DebugPanelProps {
  onClose: () => void;
}

export function DebugPanel({ onClose }: DebugPanelProps) {
  const [props, setProps] = useState<DebugProp[]>(() => getDebugProps());
  const [hovered, setHovered] = useState<InspectedElement | null>(null);
  const [inspecting, setInspecting] = useState(false);
  const inspectTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Hover inspector — track mouse and show element info
  const startInspect = useCallback(() => {
    setInspecting(true);
    inspectTimer.current = setInterval(() => {
      // Use the last known mouse position from a global listener
      const pos = (window as any).__debugMousePos as { x: number; y: number } | undefined;
      if (pos) {
        const el = inspectElementAt(pos.x, pos.y);
        setHovered(el);
      }
    }, 100);
  }, []);

  const stopInspect = useCallback(() => {
    setInspecting(false);
    setHovered(null);
    if (inspectTimer.current) {
      clearInterval(inspectTimer.current);
      inspectTimer.current = null;
    }
  }, []);

  useEffect(() => {
    return () => { if (inspectTimer.current) clearInterval(inspectTimer.current); };
  }, []);

  // Global mouse tracker for the inspector
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      (window as any).__debugMousePos = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleChange = (variable: string, value: string) => {
    setProps(setDebugProp(variable, value));
  };

  // Group properties
  const groups = [...new Set(props.map((p) => p.group))];

  return (
    <motion.div
      className="debug-panel"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 320, damping: 34 }}
    >
      <div className="debug-panel__header">
        <span className="debug-panel__title">DEBUG</span>
        <div className="debug-panel__actions">
          <button
            className={`debug-btn ${inspecting ? 'debug-btn--active' : ''}`}
            onMouseDown={inspecting ? stopInspect : startInspect}
          >
            {inspecting ? '⏹ Stop' : '🔍 Inspect'}
          </button>
          <button className="debug-btn" onClick={onClose}>✕</button>
        </div>
      </div>

      {/* Keyboard hints */}
      <div className="debug-panel__hints">
        <span><kbd>H</kbd> toggle</span>
        <span><kbd>J</kbd> panel</span>
        <span><kbd>K</kbd> overlay</span>
      </div>

      {/* Hover inspector readout */}
      {hovered && (
        <div className="debug-inspector">
          <div className="debug-inspector__tag">
            {hovered.tag}{hovered.classes && <span className="debug-inspector__cls">{hovered.classes}</span>}
          </div>
          <div className="debug-inspector__styles">
            {Object.entries(hovered.styles).map(([k, v]) => (
              <div key={k} className="debug-inspector__row">
                <span className="debug-inspector__prop">{k}</span>
                <span className="debug-inspector__val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editable properties */}
      <div className="debug-panel__scroll">
        {groups.map((group) => (
          <div key={group} className="debug-group">
            <div className="debug-group__label">{group}</div>
            {props
              .filter((p) => p.group === group)
              .map((p) => (
                <div key={p.variable} className="debug-row">
                  <label className="debug-row__label">{p.label}</label>
                  <div className="debug-row__controls">
                    {p.group === 'Colors' ? (
                      <input
                        type="color"
                        className="debug-color-input"
                        value={p.value || '#000000'}
                        onChange={(e) => handleChange(p.variable, e.target.value)}
                      />
                    ) : null}
                    <input
                      type="text"
                      className="debug-input"
                      value={p.value}
                      onChange={(e) => handleChange(p.variable, e.target.value)}
                    />
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
