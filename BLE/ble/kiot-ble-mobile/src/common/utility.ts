import Toast from "react-native-toast-message";


//:- Toast Types
export enum ToastTypes {
  SUCCESS_TOAST = "success",
  ERROR_TOAST = "error",
  INFO_TOAST = "info"
}

export const showRNToast = async (message: string, type: string): Promise<void> => {
  Toast.show({
    type: type,
    text1: message,
    autoHide: true,
    visibilityTime: 1500
  });
};

export const timeout = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));
