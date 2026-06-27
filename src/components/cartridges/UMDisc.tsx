import type { CSSProperties } from 'react';
import type { Game } from '../../types';

interface Props {
  game: Game;
  variant?: 'lg' | 'sm';
}

export function UMDisc({ game, variant = 'lg' }: Props) {
  const art = getArt(game.name);
  const style = {
    '--disc-a': art.a,
    '--disc-b': art.b,
    '--disc-c': art.c,
    '--title-color': art.title,
  } as CSSProperties;

  return (
    <div className={`cart cart-umd ${variant === 'sm' ? 'is-side' : ''}`} style={style}>
      <div className="umd">
        <div className="umd__shell" />
        <div className="umd__window">
          <div className="umd__disc" />
          <div className="umd__label">
            <div className="umd__label-text">{art.titleLines}</div>
            <div className="umd__hub"><span className="umd__hub-text">UMD</span></div>
          </div>
          <div className="umd__shine" />
        </div>
        <div className="umd__brand">PSP</div>
        <div className="umd__mark" />
      </div>
      <div className="cart__shadow" />
    </div>
  );
}

function getArt(name: string) {
  if (name.includes('Killzone')) {
    return { titleLines: 'KILLZONE\nLIBERATION', title: '#f4e9c2', a: '#3a1a18', b: '#8a1a18', c: '#5a7080' };
  }
  if (name.includes('God')) {
    return { titleLines: 'GOD OF WAR\nSPARTA', title: '#f0d487', a: '#1b1010', b: '#8b1e1a', c: '#d4a444' };
  }
  return { titleLines: 'MONSTER\nHUNTER', title: '#d6f0b4', a: '#102817', b: '#326f39', c: '#183e69' };
}
