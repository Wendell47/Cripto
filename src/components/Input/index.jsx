/* eslint-disable react/prop-types */
export default function Input({value,placeholder,onChange,id,children}){
    return(
        <div className='input_key_wrapper'>
            <input 
            id={id}
            type='text'
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            />
            {children}
        </div>
    )
}