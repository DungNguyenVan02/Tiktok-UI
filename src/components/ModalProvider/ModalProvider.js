import { useState, createContext } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };
    const value = {
        open,
        openModal,
        closeModal,
    };
    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export { ModalProvider, ModalContext };
