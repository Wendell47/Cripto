/* eslint-disable react/prop-types */

export default function Section({title,htmlFor,children}){
    return(
        <label htmlFor={htmlFor}>
            <p>{title}</p>
            {children}
        </label>
    )
}