import { createToast as createToastBase } from "mosha-vue-toastify"

export const createToast = (message: string, isError?: boolean) => {
    createToastBase(message, {
        type: 'info',
        toastBackgroundColor: isError ? '#ff3333' : '#ed762f',
        hideProgressBar: true,
    })
}