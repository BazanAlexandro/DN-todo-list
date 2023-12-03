import { createToast as createToastBase } from "mosha-vue-toastify"

export const createToast = (message: string) => {
    createToastBase(message, {
        type: 'info',
        toastBackgroundColor: '#ed762f',
        hideProgressBar: true,
    })
}