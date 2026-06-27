import type { CSSProperties } from 'react';
import type { Game } from '../../types';

interface Props {
  game: Game;
  variant?: 'lg' | 'sm';
}

export function N64Cartridge({ game, variant = 'lg' }: Props) {
  const art = getArt(game.name);
  const style = {
    '--label-bg': art.bg,
    '--label-stripe': art.stripe,
    '--label-art': art.art,
    '--title-color': art.title,
  } as CSSProperties;

  return (
    <div className={`cart cart-n64 ${variant === 'sm' ? 'is-side' : ''}`} style={style}>
      <div className="n64">
        <div className="n64__body" />
        <div className="n64__face">
          <div className="n64__label">
            <div className="n64__label-top">
              <span>NINTENDO 64</span>
              <span>NUS-P-{art.code}</span>
            </div>
            <div className="n64__label-art">
              <div className="n64__title">{art.title2}</div>
            </div>
            <div className="n64__label-bot">© {art.year} NINTENDO</div>
          </div>
          <div className="n64__seal">OFFICIAL<br/>NINTENDO<br/>SEAL</div>
          <div className="n64__connector">
            {Array.from({ length: 28 }).map((_, i) => <i key={i} />)}
          </div>
        </div>
      </div>
      <div className="cart__shadow" />
    </div>
  );
}

function getArt(name: string) {
  if (name.includes('Bomberman')) {
    return {
      code: 'NBME', year: '1997', bg: '#f4e4b8', stripe: '#d62828',
      art: 'radial-gradient(circle at 70% 60%, #fff 0 8%, transparent 10%), linear-gradient(180deg, #5cb8e8 0%, #b6e0f5 55%, #f5d65a 100%)',
      title: '#ffd848', title2: 'BOMBER\nMAN 64',
    };
  }
  if (name.includes('Star Wars')) {
    return {
      code: 'NEPE', year: '2000', bg: '#1a1a1a', stripe: '#ffcc00',
      art: 'radial-gradient(ellipse at 30% 40%, #ffcc00 0 8%, transparent 15%), linear-gradient(180deg, #000 0%, #1a1a3a 50%, #000 100%)',
      title: '#ffcc00', title2: 'STAR WARS\nEPISODE I',
    };
  }
  if (name.includes('GoldenEye')) {
    return {
      code: 'NGEE', year: '1997', bg: '#0a0a0a', stripe: '#d4af37',
      art: 'radial-gradient(circle at 50% 50%, #d4af37 0 8%, #5a3a00 12% 18%, transparent 22%), linear-gradient(180deg, #1a0a0a 0%, #5a0a0a 100%)',
      title: '#d4af37', title2: 'GOLDEN\nEYE 007',
    };
  }
  if (name.includes('Pokemon')) {
    return {
      code: 'NPSE', year: '1999', bg: '#fff8d1', stripe: '#e60012',
      art: 'radial-gradient(circle at 50% 55%, #fff 0 25%, #ff6b00 28% 35%, #cc1100 38% 48%, transparent 50%), linear-gradient(180deg, #6fb7e3 0%, #f5d65a 100%)',
      title: '#fff', title2: 'POKEMON\nSNAP',
    };
  }
  return {
    code: 'NMKE', year: '1996', bg: '#fff', stripe: '#e60012',
    art: 'radial-gradient(circle at 30% 50%, #ff0 0 12%, transparent 14%), linear-gradient(180deg, #62a8d8 0%, #f5d65a 100%)',
    title: '#fff', title2: 'MARIO\nKART 64',
  };
}
