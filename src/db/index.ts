import type { PlayerType } from "@/pages/players/schema";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("AlbionHelperDB") as Dexie & {
  players: EntityTable<PlayerType, "id">;
};

db.version(1).stores({
  players: "++id, name, description, tags, createdAt",
});

export { db };
