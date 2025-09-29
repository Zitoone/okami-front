import type { FC } from 'react'
import Button from './Button'


type ModalProps={
    text: string
    type?: "success" | "error"
    onClose: ()=>void
}

const Modal: FC<ModalProps>=({text,type="success", onClose})=>{
    let className='modal'
    if(type==="success") className += " success"
    if(type==="error") className +=" error"
    return(
        <div className='modal-container'>
            <div className={className}>
                <p>{text}</p>
                <Button onClick={onClose}>Fermer</Button>
            </div>
        </div>   
    )
}

export default Modal