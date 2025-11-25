import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mutationCallbackWithToast = <TError extends { message: string }>(
  successMessage: string
) => {
  return {
    onSuccessCallback: () => {
      toast(successMessage);
    },
    onErrorCallback: (error: TError) => {
      toast(error.message);
    },
  };
};
