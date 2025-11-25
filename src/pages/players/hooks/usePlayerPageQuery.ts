import useCreatePlayerMutation from "./useCreatePlayerMutation";
import useDeletePlayerMutation from "./useDeletePlayerMutation";
import useGetPlayerQuery from "./useGetPlayerQuery";
import useUpdatePlayerMutation from "./useUpdatePlayerMutation";

interface PlayerPageQueryProps {
  search?: string;
}

const usePlayerPageQuery = (props: PlayerPageQueryProps) => {
  const { search = "" } = props;
  const createMutation = useCreatePlayerMutation();
  const deleteMutation = useDeletePlayerMutation();
  const updateMutation = useUpdatePlayerMutation();
  const { data: players, isPending } = useGetPlayerQuery(search);
  return { createMutation, updateMutation, deleteMutation, players, isPending };
};

export default usePlayerPageQuery;
