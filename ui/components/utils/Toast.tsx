import { ReactElement } from "react";
import { toast } from "react-hot-toast";

const showToast = (toastMessage: ReactElement) => toast(toastMessage, {
    duration: 1600,
    position: 'bottom-center',
    style: {
        boxShadow: 'none',
        background: '#f6f6f6f0',
        border: '1px solid #D2D2D2',
        borderRadius: '20px',
        position: 'relative',
        bottom: '2em',
    },
});

export default showToast