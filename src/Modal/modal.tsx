import React, {FC, ReactNode} from 'react';
import style from "./EditEventModal.module.css"

interface ModalProps {
    children: ReactNode;
    setActive: (pt:boolean)=>void;
    active: boolean;
}

const Modal: FC<ModalProps> = ({children, setActive, active}) => {
    const onActive = () =>{
        setActive(!active)
    }

    return (
        <div className={active ? `${style.active}` : `${style.modal}`} onClick={onActive}>
            {children}
        </div>
    );
};

export default Modal;