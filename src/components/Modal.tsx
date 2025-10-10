import type { FC } from 'react'
import Button from './Button'
import { useTranslation } from 'react-i18next'

type ModalProps={
    text: string
    type?: "success" | "error"
    onClose: ()=>void
}

const Modal: FC<ModalProps>=({text,type="success", onClose})=>{
    const {t} = useTranslation()

    let className='modal'
    if(type==="success") className += " success"
    if(type==="error") className +=" error"
    return(
        <div className='modal-container'>
            <div className={className}>
                <p>{text}</p>
                <Button
                className='btn'
                onClick={onClose}>{t("modale.close")}</Button>
            </div>
        </div>   
    )
}

export default Modal