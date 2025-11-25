import { toast } from "sonner";
import useCreatePlayerMutation from "./useCreatePlayerMutation";
import useDeletePlayerMutation from "./useDeletePlayerMutation";
import useGetPlayerQuery from "./useGetPlayerQuery";
import useUpdatePlayerMutation from "./useUpdatePlayerMutation";

interface PlayerPageQueryProps {
  search?: string;
}

const usePlayerPageQuery = (props: PlayerPageQueryProps) => {
  const { search } = props;
  const createMutation = useCreatePlayerMutation({
    onSuccessCallback: () => {
      toast("Player created successfully");
    },
    onErrorCallback: (error) => {
      toast(error.message);
    },
  });
  const deleteMutation = useDeletePlayerMutation({
    onSuccessCallback: () => {
      toast("Player deleted successfully");
    },
    onErrorCallback: (error) => {
      toast(error.message);
    },
  });
  const updateMutation = useUpdatePlayerMutation({
    onSuccessCallback: () => {
      toast("Player updated successfully");
    },
    onErrorCallback: (error) => {
      toast(error.message);
    },
  });
  const { data: players, isPending } = useGetPlayerQuery({ search });
  return { createMutation, updateMutation, deleteMutation, players, isPending };
};

export default usePlayerPageQuery;
