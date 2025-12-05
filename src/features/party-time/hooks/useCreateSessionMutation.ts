import { useMutation } from "@tanstack/react-query";
import { createSessionOptions, type CreateSessionOptionsProps } from "../query/createSessionOptions";
import { useAuthStore } from "@/store";

const useCreateSessionMutation = (props?: CreateSessionOptionsProps) => {
    const session = useAuthStore((state) => state.session);
    return useMutation(createSessionOptions(session!, { ...props }));
};

export default useCreateSessionMutation;
