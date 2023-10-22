/* eslint-disable react/prop-types */
import { HiArrowPath,HiClipboardDocument,HiCheckCircle,HiClipboard } from "react-icons/hi2"
import './styles.css'

export default function SecondaryButton({onClick,isRandomButton,isPasterButton,buttonID,id,text}){

    function copyMessage(id,text){
      
        if (text !== '' && !text.includes('err')){
          
          const icon_copy = document.querySelector(`#${id} .icons_copy_wrapper svg:first-child`)
          const icon_check = document.querySelector(`#${id} .icons_copy_wrapper svg:last-child`)
          icon_copy.classList.add('transition_icon');
          icon_check.classList.add('transition_icon_hide');
        setTimeout(() => {
          icon_copy.classList.remove('transition_icon');
          icon_check.classList.remove('transition_icon_hide');
        },480)
        navigator.clipboard.writeText(text)
        } 
      }
    

    if (isRandomButton){
        return(
            <button
            className="secondaryButton animation2"
            onClick={onClick}
            aria-label="Gerar chave aleatória"
            >
            <HiArrowPath/>
            </button>
        )
    }
    else if (isPasterButton){
        return(
            <button
            className="secondaryButton hide"
            id={buttonID}
            onClick={onClick}
            >
            <HiClipboard/>
            </button>
        )
    }
    else{
        return(
            
            <button
            className="secondaryButton flex-bottom"
            onClick={() => copyMessage(id,text)}
            >
                <div className='icons_copy_wrapper'>
                  <HiClipboardDocument className='copy_icon'/>
                  <HiCheckCircle className='check_icon'/>
                </div>
            </button> 
        
        )
    }
}