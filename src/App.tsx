import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GameCarousel } from './components/GameCarousel';
import { TopBar } from './components/TopBar';
import { BottomBar } from './components/BottomBar';
import { CustomizePanel } from './components/CustomizePanel';
import { SettingsPanel } from './components/SettingsPanel';
import { LaunchFlash } from './components/LaunchFlash';
import { DebugPanel } from './components/DebugPanel';           // [DEBUG]
import { useDebugToggle } from './utils/debugSystem';          // [DEBUG]
import type { Platform } from './types';

const platforms: Platform[] = [
  {
    id: 'n64',
    name: 'Nintendo 64',
    cartridgeType: 'n64',
    games: [
      { id: 1, name: 'Bomberman 64',         coverArt: '', playTime: '00h 00min', color: '#c4b5a0' },
      { id: 2, name: 'Star Wars Episode I',  coverArt: '', playTime: '00h 08min', color: '#a89985' },
      { id: 3, name: 'GoldenEye 007',        coverArt: '', playTime: '12h 34min', color: '#b0a190' },
      { id: 4, name: 'Pokemon Snap',         coverArt: '', playTime: '05h 22min', color: '#c8bab0' },
      { id: 5, name: 'Mario Kart 64',        coverArt: '', playTime: '24h 15min', color: '#b5a795' },
    ],
  },
  {
    id: 'ds',
    name: 'Nintendo DS',
    cartridgeType: 'ds',
    games: [
      { id: 1, name: 'Spectrobes',           coverArt: '', playTime: '09h 08min', color: '#1a1a2e' },
      { id: 2, name: 'New Super Mario Bros', coverArt: '', playTime: '15h 42min', color: '#16213e' },
      { id: 3, name: 'Rayman',               coverArt: '', playTime: '03h 20min', color: '#1f4068' },
      { id: 4, name: 'Pokemon Diamond',      coverArt: '', playTime: '45h 10min', color: '#2d3561' },
    ],
  },
  {
    id: 'psp',
    name: 'PlayStation Portable',
    cartridgeType: 'umd',
    games: [
      { id: 1, name: 'Killzone : Liberation',         coverArt: '', playTime: '00h 00min', color: '#e8e8e8' },
      { id: 2, name: 'God of War : Ghost of Sparta',  coverArt: '', playTime: '18h 30min', color: '#d0d0d0' },
      { id: 3, name: 'Monster Hunter Freedom Unite',  coverArt: '', playTime: '120h 55min', color: '#c8c8c8' },
    ],
  },
];

const platformVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 90, scale: 0.9 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (d: number) => ({ opacity: 0, x: -d * 90, scale: 0.9 }),
};

export default function App() {
  const [pIdx, setPIdx] = useState(0);
  const [gIdx, setGIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [pDir, setPDir] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [time, setTime] = useState(() => fmtTime(new Date()));
  const [battery] = useState(78);
  const lock = useRef(false);
  const debug = useDebugToggle();                                // [DEBUG]

  useEffect(() => {
    const id = setInterval(() => setTime(fmtTime(new Date())), 1000 * 20);
    return () => clearInterval(id);
  }, []);

  const platform = platforms[pIdx];
  const len = platform.games.length;

  const prevGame = useCallback(() => {
    setDir(-1);
    setGIdx((i) => (i - 1 + len) % len);
  }, [len]);

  const nextGame = useCallback(() => {
    setDir(1);
    setGIdx((i) => (i + 1) % len);
  }, [len]);

  const cyclePlatform = useCallback((d: 'l' | 'r') => {
    setPDir(d === 'l' ? -1 : 1);
    setPIdx((i) =>
      d === 'l'
        ? (i - 1 + platforms.length) % platforms.length
        : (i + 1) % platforms.length,
    );
    setGIdx(0);
  }, []);

  const launch = useCallback(() => {
    if (lock.current) return;
    lock.current = true;
    setLaunching(true);
    setTimeout(() => { setLaunching(false); lock.current = false; }, 1500);
  }, []);

  // Keyboard navigation — console feel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (launching) return;
      // [DEBUG] H key toggles debug mode — check first
      if (e.key === 'h' || e.key === 'H') {
        if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
        debug.toggle();
        return;
      }
      // [DEBUG] J/K only work when debug is active
      if (debug.active) {
        if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
        if (e.key === 'j' || e.key === 'J') { debug.togglePanel(); return; }
        if (e.key === 'k' || e.key === 'K') { debug.toggleRef(); return; }
      }
      if (showSettings || showCustomize) {
        if (e.key === 'Escape') { setShowSettings(false); setShowCustomize(false); }
        return;
      }
      switch (e.key) {
        case 'ArrowLeft':  prevGame(); break;
        case 'ArrowRight': nextGame(); break;
        case 'ArrowUp':
        case 'q': case 'Q': cyclePlatform('l'); break;
        case 'ArrowDown':
        case 'e': case 'E': cyclePlatform('r'); break;
        case 'Enter': case ' ': launch(); break;
        case 'x': case 'X': setShowCustomize(true); break;
        case 'y': case 'Y': setShowSettings(true); break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prevGame, nextGame, cyclePlatform, launch, showSettings, showCustomize, launching, debug]);

  return (
    <div className="app-shell">
      <div className="screen" data-platform={platform.id}>
        <Wallpaper platformId={platform.id} />

        {/* [DEBUG] Mode indicator badge */}
        {debug.active && (
          <div className="debug-badge">
            <span>DEBUG</span>
            <span className="debug-badge__keys">H toggle · J panel · K overlay</span>
          </div>
        )}

        {/* Top bar slides down on mount */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 26, delay: 0.1 }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            <TopBar
              time={time}
              battery={battery}
              platformName={platform.name}
              platformDir={pDir}
              onLPress={() => cyclePlatform('l')}
              onRPress={() => cyclePlatform('r')}
            />
          </div>
        </motion.div>

        {/* Carousel crossfades when platform changes */}
        <AnimatePresence mode="wait" custom={pDir}>
          <motion.div
            key={platform.id}
            custom={pDir}
            variants={platformVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <GameCarousel
              platform={platform}
              currentIndex={gIdx}
              direction={dir}
              onPrev={prevGame}
              onNext={nextGame}
              onSelect={launch}
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom bar slides up on mount */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 26, delay: 0.18 }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            <BottomBar
              onSettings={() => setShowSettings(true)}
              onApps={() => undefined}
              onInspect={() => setShowCustomize(true)}
            />
          </div>
        </motion.div>

        <AnimatePresence>
          {showCustomize && <CustomizePanel key="cust" onClose={() => setShowCustomize(false)} />}
        </AnimatePresence>
        <AnimatePresence>
          {showSettings && <SettingsPanel key="set" onClose={() => setShowSettings(false)} time={time} battery={battery} />}
        </AnimatePresence>

        <AnimatePresence>
          {launching && <LaunchFlash key="flash" name={platform.games[gIdx].name} />}
        </AnimatePresence>

        {/* [DEBUG] Reference image overlay — toggled with K when debug is active */}
        {debug.active && debug.showRef && (
          <div className="debug-overlay-root">
            <img
              src="/reference.png"
              alt="Reference overlay"
              className="debug-ref-image"
              draggable={false}
            />
          </div>
        )}

        {/* [DEBUG] Debug panel — toggled with J when debug is active */}
        <AnimatePresence>
          {debug.active && debug.showPanel && (
            <DebugPanel key="debug" onClose={debug.togglePanel} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Wallpaper({ platformId }: { platformId: string }) {
  return (
    <motion.div
      className="wallpaper"
      key={platformId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      aria-hidden
    />
  );
}

function fmtTime(d: Date) {
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}
