export interface Game {
  id: number;
  name: string;
  coverArt: string;
  playTime: string;
  color: string;
}

export interface Platform {
  id: string;
  name: string;
  cartridgeType: 'n64' | 'ds' | 'umd';
  games: Game[];
}

export interface ToggleSetting {
  id: string;
  label: string;
  value: boolean;
}
