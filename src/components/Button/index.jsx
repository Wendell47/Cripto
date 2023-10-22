/* eslint-disable react/prop-types */
import './styles.css'
export default function Button({id, onClick, title, type, disabled}) {

    return(
        <button
        className={type}
        id={id}
        onClick={onClick}
        disabled={disabled}
        aria-label={title}
        type='button'
        >
            {title}
        </button>
    )
}