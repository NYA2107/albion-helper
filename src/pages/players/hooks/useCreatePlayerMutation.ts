import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import {
  createPlayerOptions,
  type CreatePlayerOptionsProps,
} from "../query/createPlayerOptions";

const useCreatePlayerMutation = (props?: CreatePlayerOptionsProps) => {
  const session = useAuthStore((state) => state.session);
  return useMutation(createPlayerOptions(session!, { ...props }));
};

export default useCreatePlayerMutation;
