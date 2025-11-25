import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import {
  createPlayerOptions,
  type CreatePlayerProps,
} from "../query/createPlayerOptions";

const useCreatePlayerMutation = (props?: CreatePlayerProps) => {
  const session = useAuthStore((state) => state.session);
  return useMutation(createPlayerOptions({ ...props, session: session! }));
};

export default useCreatePlayerMutation;
