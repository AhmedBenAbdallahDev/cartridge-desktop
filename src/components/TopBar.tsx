import { AnimatePresence, motion } from 'framer-motion';
import { IcoBattery, IcoWifi } from './Icons';

interface TopBarProps {
  time: string;
  battery: number;
  platformName: string;
  platformDir: number;
  onLPress: () => void;
  onRPress: () => void;
}

const nameVariants = {
  enter: (d: number) => ({ opacity: 0, y: d * 18, scale: 0.92 }),
  center: { opacity: 1, y: 0, scale: 1 },
  exit: (d: number) => ({ opacity: 0, y: -d * 18, scale: 0.92 }),
};

export function TopBar({ time, battery, platformName, platformDir, onLPress, onRPress }: TopBarProps) {
  return (
    <header className="top-hud">
      <div className="chip chip--time">{time}</div>

      <div className="platform-switch">
        <motion.button
          className="shoulder"
          onClick={onLPress}
          whileTap={{ scale: 0.88, y: 2 }}
          whileHover={{ y: -1 }}
          aria-label="Previous platform"
        >
          <span className="shoulder__key">L</span>
        </motion.button>

        <div className="platform-pill">
          <AnimatePresence mode="popLayout" custom={platformDir}>
            <motion.span
              key={platformName}
              className="platform-pill__text"
              custom={platformDir}
              variants={nameVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.26, ease: [0.22, 0.7, 0.3, 1] }}
            >
              {platformName}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.button
          className="shoulder"
          onClick={onRPress}
          whileTap={{ scale: 0.88, y: 2 }}
          whileHover={{ y: -1 }}
          aria-label="Next platform"
        >
          <span className="shoulder__key">R</span>
        </motion.button>
      </div>

      <div className="chip chip--battery">
        <IcoWifi className="chip__icon" />
        <span>{battery}%</span>
        <IcoBattery className="chip__icon chip__icon--battery" />
      </div>
    </header>
  );
}
