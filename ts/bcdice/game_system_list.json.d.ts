export interface GameSystemInfo {
  id: string;
  className: string;
  name: string;
  sortKey: string;
  prefixes: string[] | null;
}

const gameSystems: GameSystemInfo[];
export = { gameSystems };
