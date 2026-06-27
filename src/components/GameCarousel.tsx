import { motion, AnimatePresence } from 'framer-motion';
import type { Platform, Game } from '../types';
import { N64Cartridge } from './cartridges/N64Cartridge';
import { DSCartridge } from './cartridges/DSCartridge';
import { UMDisc } from './cartridges/UMDisc';

interface GameCarouselProps {
  platform: Platform;
  currentIndex: number;
  direction: number;       // +1 next, -1 prev (for slide direction)
  onPrev: () => void;
  onNext: () => void;
  onSelect: () => void;
}

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 30, mass: 0.9 };

const infoVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 44, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (d: number) => ({ opacity: 0, x: -d * 44, scale: 0.96 }),
};

export function GameCarousel({
  platform, currentIndex, direction, onPrev, onNext, onSelect,
}: GameCarouselProps) {
  const games = platform.games;
  const len = games.length;

  const renderCart = (game: Game) => {
    switch (platform.cartridgeType) {
      case 'n64': return <N64Cartridge game={game} variant="lg" />;
      case 'ds':  return <DSCartridge  game={game} variant="lg" />;
      case 'umd': return <UMDisc       game={game} variant="lg" />;
    }
  };

  // build a window of slots around current.
  // cap the side count so indices never duplicate on small lists (wrap safety)
  const maxSide = len >= 5 ? 2 : 1;
  const offsets: number[] = [];
  for (let o = -maxSide; o <= maxSide; o++) offsets.push(o);
  const slots = offsets.map((offset) => {
    const idx = ((currentIndex + offset) % len + len) % len;
    return { offset, idx, game: games[idx] };
  });

  // visual placement for each offset
  const place = (offset: number) => {
    const abs = Math.abs(offset);
    if (offset === 0) {
      return { x: '0%', scale: 1, rotateY: 0, opacity: 1, z: 5, blur: 0, brightness: 1 };
    }
    const dir = offset < 0 ? -1 : 1;
    if (abs === 1) {
      return { x: `${dir * 62}%`, scale: 0.6, rotateY: -dir * 32, opacity: 0.85, z: 3, blur: 0.5, brightness: 0.82 };
    }
    return { x: `${dir * 105}%`, scale: 0.4, rotateY: -dir * 42, opacity: 0, z: 1, blur: 2, brightness: 0.6 };
  };

  const curr = games[currentIndex];

  return (
    <section className="stage" aria-label={`${platform.name} games`}>
      {/* The cartridge wheel */}
      <div className="wheel">
        {slots.map(({ offset, idx, game }) => {
          const p = place(offset);
          const isCenter = offset === 0;
          return (
            <motion.button
              key={`${platform.id}-${idx}`}
              className={`wheel-slot ${isCenter ? 'wheel-slot--center' : 'wheel-slot--side'}`}
              style={{ zIndex: p.z, pointerEvents: p.opacity === 0 ? 'none' : 'auto' }}
              initial={false}
              animate={{
                x: p.x,
                scale: p.scale,
                rotateY: p.rotateY,
                opacity: p.opacity,
                filter: `brightness(${p.brightness})`,
              }}
              transition={SPRING}
              whileHover={isCenter ? { scale: 1.04 } : { scale: p.scale * 1.08, filter: 'brightness(0.95)' }}
              whileTap={{ scale: isCenter ? 0.97 : p.scale * 0.96 }}
              onClick={() => {
                if (isCenter) onSelect();
                else if (offset < 0) onPrev();
                else onNext();
              }}
              aria-label={isCenter ? `Launch ${game.name}` : game.name}
            >
              <motion.div
                className="wheel-cart"
                animate={isCenter
                  ? { y: [0, -10, 0], rotateZ: [-1.5, -2.2, -1.5] }
                  : { y: 0, rotateZ: 0 }}
                transition={isCenter
                  ? { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.3 }}
              >
                {renderCart(game)}
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Game info — animated swap on change */}
      <div className="game-info">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={curr.id + platform.id}
            className="game-info__inner"
            custom={direction}
            variants={infoVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 0.7, 0.3, 1] }}
          >
            <button className="game-name-chip" onClick={onSelect}>
              <span className="face-btn">A</span>
              <span className="game-name-chip__text">{curr.name}</span>
            </button>
            <div className="playtime">{curr.playTime}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page dots */}
      <div className="page-dots">
        {games.map((g, i) => (
          <span key={g.id} className={`page-dot ${i === currentIndex ? 'is-active' : ''}`} />
        ))}
      </div>
    </section>
  );
}
