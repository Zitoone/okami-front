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
            <div className={className}>
                <p>{text}</p>
                {onConfirm ? ( // Si onConfirm existe choix entre 2 boutons
                    <div style={{display: 'flex', gap: '1rem'}}> 
                        <Button className='btn' onClick={onClose}>Annuler</Button>
                        <Button className='btn btn-delete' onClick={onConfirm}>Confirmer</Button>
                    </div>
                ) : ( // Si onConfirm n'existe pas (modale simple d'information)
                    <Button className='btn' onClick={onClose}> {/* Un seul bouton pour fermer */}
                        {t("modale.close")}
                    </Button>
                )}
            </div>
        </div>   
    )
}

export default Modal