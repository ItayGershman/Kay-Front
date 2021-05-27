import { toast } from 'react-toastify';

export const notify = (text, status) => {
    const config = {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
    switch (status) {
      case 'success':
        toast.success(`🦄 ${text}`, config);
        break;
      case 'info':
        toast.info(`🦄 ${text}`, config);
        break;
      case 'error':
        toast.error(`${text}`, config);
    }
  };