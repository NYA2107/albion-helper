import { useModalStore } from "@/store";

const useModalMutationDefaultBehavior = () => {
  const { closeModal, setLoadingModal } = useModalStore();
  return {
    onSuccess: () => {
      setLoadingModal(false);
      closeModal();
    },
  };
};

export default useModalMutationDefaultBehavior;
