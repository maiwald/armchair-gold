import type { EntityId } from "@/store/types";
import ShortUniqueId from "short-unique-id";

const alpahbet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const { randomUUID } = new ShortUniqueId({
  length: 4,
  dictionary: alpahbet.split(""),
});

export function generateEntityId<T extends string>(prefix: T): EntityId<T> {
  return `${prefix}-${randomUUID()}` as const;
}
