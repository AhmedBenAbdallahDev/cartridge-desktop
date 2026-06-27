import { motion } from 'framer-motion';

interface BottomBarProps {
  onSettings: () => void;
  onApps: () => void;
  onInspect: () => void;
}

const hint = {
  whileHover: { y: -3, scale: 1.04 },
  whileTap: { scale: 0.94, y: 1 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 22 },
};

export function BottomBar({ onSettings, onApps, onInspect }: BottomBarProps) {
  return (
    <footer className="bottom-hud">
      <div className="bottom-hud__group">
        <motion.button className="bhint" onClick={onSettings} {...hint}>
          <span className="face-btn">Y</span>
          <span>Settings</span>
        </motion.button>
      </div>

      <div className="bottom-hud__group">
        <motion.button className="bhint" onClick={onApps} {...hint}>
          <span className="face-btn">B</span>
          <span>Apps</span>
        </motion.button>
        <motion.button className="bhint" onClick={onInspect} {...hint}>
          <span className="face-btn">X</span>
          <span>Inspect</span>
        </motion.button>
      </div>
    </footer>
  );
}
