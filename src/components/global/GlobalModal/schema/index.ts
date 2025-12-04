import type { PlayerType } from "@/features/players/schema";

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
  "add.player": {
    data: undefined;
    submitPayload: undefined;
  };
  "create.session-party": {
    data: undefined;
    submitPayload: undefined;
  };
};
