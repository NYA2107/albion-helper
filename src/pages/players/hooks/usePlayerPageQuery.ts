import useModalMutationDefaultBehavior from "@/hooks/useModalMutationDefaultBehavior";
import useCreatePlayerMutation from "./useCreatePlayerMutation";
import useDeletePlayerMutation from "./useDeletePlayerMutation";
import useGetPlayerQuery from "./useGetPlayerQuery";
import useUpdatePlayerMutation from "./useUpdatePlayerMutation";

interface PlayerPageQueryProps {
  search?: string;
}

const usePlayerPageQuery = (props: PlayerPageQueryProps) => {
  const { search = "" } = props;
  const mutationModalDefaultBehavior = useModalMutationDefaultBehavior();

  const createMutation = useCreatePlayerMutation(mutationModalDefaultBehavior);
  const deleteMutation = useDeletePlayerMutation(mutationModalDefaultBehavior);
  const updateMutation = useUpdatePlayerMutation(mutationModalDefaultBehavior);
  const { data: players, isPending } = useGetPlayerQuery(search);
  return { createMutation, updateMutation, deleteMutation, players, isPending };
};

export default usePlayerPageQuery;
