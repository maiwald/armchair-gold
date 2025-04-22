export type EntityId<T extends string> = `${T}-${string}`;

type EntityMap<T extends { id: string }> = Record<T["id"], T>;

export type AppState = {
  characters: EntityMap<Character>;
  locations: EntityMap<Location>;
};

export type Point = {
  x: number;
  y: number;
};

export type Character = {
  id: EntityId<"C">;
  name: string;
};

export type Sprite = {
  image: string;
  offset: Point;
};

export type SpriteLayer = {
  name: string;
  zIndex: number;
  sprites: Map<Point, Sprite>;
};

export type Location = {
  id: EntityId<"L">;
  name: string;
  width: number;
  height: number;
  foreground: SpriteLayer[];
  background: SpriteLayer[];
  collision: Map<Point, boolean>;
};
