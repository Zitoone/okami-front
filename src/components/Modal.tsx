import type { FC } from 'react'
import Button from './Button'
import { useTranslation } from 'react-i18next'

type ModalProps={
    text: string
    type?: "success" | "error"
    onClose: ()=>void
    onConfirm?: ()=>void  // Optionnel : si présent, affiche un bouton de confirmation
}

const Modal: FC<ModalProps>=({text,type="success", onClose, onConfirm})=>{
    const {t} = useTranslation()

    let className='modal'
    if(type==="success") className += " success"
    if(type==="error") className +=" error"
    return(
        <div className='modal-container'>
            <div className={className} style={{ position: 'relative' }}>
                <button 
                    className="close-btn" 
                    onClick={onClose} 
                    aria-label="Fermer"
                >✕</button>
                <p>{text}</p>
                {onConfirm ? (
                    <Button className='btn' onClick={onConfirm}>
                        Confirmer
                    </Button>
                ) : (
                    <Button className='btn' onClick={onClose}>
                        {t("modale.close")}
                    </Button>
                )}
            </div>
        </div>   
    )
}

export default Modal