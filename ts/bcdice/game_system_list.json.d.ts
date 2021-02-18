export interface GameSystemInfo {
  id: string;
  className: string;
  name: string;
  sortKey: string;
}

declare const gameSystems: GameSystemInfo[];
export { gameSystems };
