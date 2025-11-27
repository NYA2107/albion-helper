import type { PlayerType } from "@/pages/players/schema";

export type ModalTypeMap = {
  "create.player": {
    data: undefined; //Modal State
    submitPayload: PlayerType; //Data Submit
  };
  "edit.player": {
    data: { id: number };
    submitPayload: PlayerType;
  };
  "delete.confirmation": {
    data: undefined;
    submitPayload: undefined;
  };
};
