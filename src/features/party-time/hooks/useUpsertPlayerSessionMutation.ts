import { useMutation } from "@tanstack/react-query";
import {
  upsertPlayerSessionOptions,
  type UpsertPlayerSessionOptionsProps,
} from "../query/upsertPlayerSessionOptions";

const useUpsertPlayerSessionMutation = (
  props?: UpsertPlayerSessionOptionsProps
) => {
  return useMutation(upsertPlayerSessionOptions({ ...props }));
};

export default useUpsertPlayerSessionMutation;
