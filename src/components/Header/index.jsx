import {Link} from 'react-router-dom'
import './styles.css';
import { LuHome, LuInfo,} from 'react-icons/lu' 
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { useEffect, useState } from 'react';

export default function Header(){

    const [active, setActive] = useState('hide')

    function handleActive(link){
        const links = document.querySelectorAll('header ul li a')
       
        function activeLink(e){
            const parsedUrl = new URL(e.href)
            if(parsedUrl.pathname == link){
                e.classList.add('active')
            }else{
                e.classList.remove('active')
            }  
        }
        links.forEach(activeLink)
    }
    useEffect(() => {
        const url = location.pathname
        handleActive(url)
    },[])
    
    //links.forEach(ativarLink)
    
    function handleActiveMenuMobile(){
        active ? setActive('') : setActive('hide');
    }
    return(
        <header>
            <h1>Cripto</h1>
                <ul className='Menu'>
                <li>
                    <Link to={"/"}  onClick={() => handleActive('/')}><LuHome/> Início</Link>
                </li>
                <li>
                    <Link to={"/sobre"} onClick={() => handleActive('/sobre')}><LuInfo/> sobre</Link>
                </li>
               
                </ul>

                <div className='MenuMobileActive' onClick={() => handleActiveMenuMobile()}>
                    <BiDotsVerticalRounded/>
                    <div className={`MenuMobile ${active}`}>
                    <ul>
                    <li>
                        <Link to={"/"} onClick={() => handleActive('home')}><LuHome/> Início</Link>
                    </li>
                    <li>
                        <Link to={"/sobre"} onClick={() => handleActive('about')}><LuInfo/> sobre</Link>
                    </li>
                
                    </ul>
                </div>
                </div>
             
        </header>
    )
}