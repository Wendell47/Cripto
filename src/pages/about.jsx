import {AiFillGithub} from "react-icons/ai"
export default function About(){

    return(
        <>
        <div className="about">
            <h2>Sobre o projeto</h2>
            <p>
                O Cript é um pequeno projeto desenvolvido visando mostrar o funcionamento da criptografia e descriptografia de uma menssagem atráves do  método AES(Advanced Encryption Standard).
                O algoritmo AES é uma cifra de bloco simétrico que pode criptografar (codificar) e descriptografar (decifrar) informações.
            </p>
            <p>
                 A criptografia converte os dados em uma forma ininteligível chamada texto cifrado. Ao descriptografar o texto cifrado, é convertido os dados de volta em sua forma original, chamada de texto simples.

            </p>
            <p>
                O algoritmo AES é capaz de usar chaves criptográficas de 128, 192 e 256 bits para criptografar e descriptografar dados em blocos de 128 bits.” – NIST

            </p>

            <ul>
                <li>
                    <a href="https://github.com/Wendell47"><AiFillGithub/></a>
                </li>
                </ul>
        </div>
        </>
    )
}