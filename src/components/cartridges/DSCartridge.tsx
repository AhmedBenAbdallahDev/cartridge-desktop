import type { CSSProperties } from 'react';
import type { Game } from '../../types';

interface Props {
  game: Game;
  variant?: 'lg' | 'sm';
}

export function DSCartridge({ game, variant = 'lg' }: Props) {
  const art = getArt(game.name);
  const style = { '--label-art': art.bg, '--title-color': art.title } as CSSProperties;

  return (
    <div className={`cart cart-ds ${variant === 'sm' ? 'is-side' : ''}`} style={style}>
      <div className="ds">
        <div className="ds__body" />
        <div className="ds__notch-l" />
        <div className="ds__notch-r" />
        <div className="ds__label">
          <div className="ds__label-head">Nintendo DS</div>
          <div className="ds__art">
            <div className="ds__title">{art.titleLines}</div>
          </div>
          <div className="ds__label-foot">
            <span>NTR</span>
            <span>JPN</span>
          </div>
        </div>
        <div className="ds__bottom">
          <div className="ds__pins" />
          <div className="ds__imprint">NINTENDO</div>
          <div className="ds__notch" />
        </div>
      </div>
      <div className="cart__shadow" />
    </div>
  );
}

function getArt(name: string) {
  if (name.includes('Spectrobes')) {
    return { titleLines: 'Spectrobes', title: '#fff', bg: 'linear-gradient(135deg, #2a1f3f 0%, #5a1a4a 50%, #8a2a3a 100%)' };
  }
  if (name.includes('Mario')) {
    return { titleLines: 'New Super\nMario Bros', title: '#fff', bg: 'linear-gradient(180deg, #7eb6e3 0%, #b8d8f0 60%, #f6df5c 100%)' };
  }
  if (name.includes('Rival') || name.includes('Rayman')) {
    return { titleLines: 'Rayman', title: '#fff', bg: 'linear-gradient(135deg, #7a3aa0 0%, #ff6bbf 100%)' };
  }
  return { titleLines: 'Pokemon\nDiamond', title: '#fff', bg: 'linear-gradient(135deg, #c0d8ff 0%, #7a8fcf 100%)' };
}
