import { toast } from 'react-toastify';

function toastMessage(type, message) {
    return toast[type](message, {
        position: "top-right",
        autoClose: 3000,
    });
}

export { toastMessage }