type EntityId<T extends string> = `${T}_${string}`;

export type User = {
  id: EntityId<"U">;
  name: string;
};

export type Post = {
  id: EntityId<"P">;
  title: string;
  content: string;
};

export type AppState = {
  user: User | null;
  posts: Post[];
};
