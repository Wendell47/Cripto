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

    function handleActiveMenuMobile(){
        active ? setActive('') : setActive('hide');
    }

    const menuItens = [
        {
            url:"/",
            title:"Início",
            icon: <LuHome/>
        },
        {
            url:"/sobre",
            title:"Sobre",
            icon: <LuInfo/>
        }
    ]
   
    return(
        <header>
            <h1>Cripto</h1>
                <ul className='Menu'>
                    {
                        menuItens.map((item,index) =>(
                            <li key={index}>
                                <Link to={item.url} onClick={() => handleActive(item.url)}>{item.icon}{item.title}</Link>
                            </li>
                        ))
                    }
                </ul>

                <div className='MenuMobileActive' onClick={() => handleActiveMenuMobile()}>
                    <BiDotsVerticalRounded/>
                    <div className={`MenuMobile ${active}`}>
                        <ul>
                            {
                                menuItens.map((item,index) =>(
                                    <li key={index}>
                                        <Link to={item.url} onClick={() => handleActive(item.url)}>{item.icon}{item.title}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                </div>
                </div>
             
        </header>
    )
}