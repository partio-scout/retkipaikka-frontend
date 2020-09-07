import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const askForConfirmation = (message, title, onYesClick, onNoClick) => {
    confirmAlert({
        title: title,
        message: message,
        buttons: [
            {
                label: 'Kyllä',
                onClick: onYesClick
            },
            {
                label: 'Ei',
                onClick: onNoClick

            }
        ]
    });
};


export { askForConfirmation }