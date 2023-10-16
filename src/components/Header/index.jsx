import {Link} from 'react-router-dom'
import './styles.css';
import { LuHome, LuInfo,} from 'react-icons/lu' 
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { useState } from 'react';

export default function Header(){

    const [active, setActive] = useState('hide')

    function handleActive(e){
        const rest = document.querySelectorAll('ul li a')
        
        for (let i = 0; i < rest.length; i++){
            rest[i].classList.remove('active');
        }

        const item = document.getElementById(e)
        item.classList.add('active')

        
        
    }

    function handleActiveMenuMobile(){
        active ? setActive('') : setActive('hide');
    }
    return(
        <header>
            <h1>Cripto</h1>
                <ul className='Menu'>
                <li>
                    <Link to={"/"} className='active' onClick={() => handleActive('home')} id='home'><LuHome/> Início</Link>
                </li>
                <li>
                    <Link to={"/sobre"} onClick={() => handleActive('about')} id='about'><LuInfo/> sobre</Link>
                </li>
               
                </ul>

                <div className='MenuMobileActive' onClick={() => handleActiveMenuMobile()}>
                    <BiDotsVerticalRounded/>
                    <div className={`MenuMobile ${active}`}>
                    <ul>
                    <li>
                        <Link to={"/"} onClick={() => handleActive('home')} id='home'><LuHome/> Início</Link>
                    </li>
                    <li>
                        <Link to={"/sobre"} onClick={() => handleActive('about')} id='about'><LuInfo/> sobre</Link>
                    </li>
                
                    </ul>
                </div>
                </div>
             
        </header>
    )
}