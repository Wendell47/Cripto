import { useEffect, useState } from 'react'
import './App.css'
import CryptoJS from 'crypto-js'

function App() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledSecondary, setIsDisabledSecondary] = useState(true);
  const [messageToEncrypt, setMessageToEncrypt] = useState('');
  const [messageToDecrypt, setMessageToDecrypt] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [secretKeyToDecrypt, setSecretKeyToDecrypt] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [fail, setFail] = useState('');
  

  const encryptMessage = () => {
    const encrypted = CryptoJS.AES.encrypt(messageToEncrypt, secretKey).toString();
    setEncryptedMessage(encrypted);
    setSecretKey('')
  };

  const decryptMessage = () => {
    const bytes = CryptoJS.AES.decrypt(messageToDecrypt, secretKeyToDecrypt);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (originalText == '') {
      setFail('error')
      setDecryptedMessage("Error: Failed to decrypt - a chave e/ou a mensagem está errada.");
      return
    }
    if (fail){
      setFail('')
    }
    setDecryptedMessage(originalText);
    console.log(originalText)
  };

  function cleanInput(inputName){
    if (inputName == 'clean_Message_input'){
      setMessageToEncrypt('')
    }
  }
  
  const copyMessage = (e) => {
    e.target.select();
    document.execCommand('copy');
  };

 
  useEffect(() => {
    if (messageToEncrypt && secretKey){
      setIsDisabled(false);
      
    }
    else{
      setIsDisabled(true)
    }

    if (messageToDecrypt && secretKeyToDecrypt){
      
      setIsDisabledSecondary(false)
    
    }
    else{
      setIsDisabledSecondary(true)
    }

    
  },[secretKey, messageToEncrypt,messageToDecrypt,secretKeyToDecrypt])
  
  return (
    <>
      <h1>Cripto  </h1>
     
      <div className='Content-Area'>
          <div>
              <label  htmlFor='input_message_Encrypt'>

                <p>Mensagem que você quer criptografar:</p>
                <textarea 
                value={messageToEncrypt}
                placeholder='Digite sua mensagem aqui'
                onChange={e => setMessageToEncrypt(e.target.value)} 
                id='input_message_Encrypt'/>
                <p> Chave para a criptografia:</p>
                <input type='text'
                value={secretKey}
                onChange={e => setSecretKey(e.target.value)}
                placeholder='exemplo: K4UIR3a8I/Yc-HI6A-II9pi!8=0xUbyAF9/2gHbAKRoYczYUykkfQw!XjaIh!Qta5-OR0KFInpqtk3FK/F37RT?oVy8qv-frwg?mG0Q8ZZnKdQF6bmr-F?FTTB7kt-Nc'
                />

              </label>
              
              <div className='buttons_area'>
              <button className='btn secondary'  id="clean_Message_input" onClick={() =>{cleanInput('clean_Message_input')}}>Limpar</button>
              <button className='btn primary' onClick={encryptMessage} disabled={isDisabled}>Criptografar</button>
              </div>
              <p>Mensagem criptografada:</p>
              <input 
              value={encryptedMessage} 
              onClick={copyMessage} 
              placeholder='A mensagem criptografada aparecerá aqui.'
              readOnly/>
            
          </div>
          <div>
          <label  htmlFor='input_message_Decrypt'>

                <p>Mensagem a ser descriptografada:</p>
                <textarea 
                value={messageToDecrypt}
                placeholder='Insira a mensagem criptografada aqui'
                onChange={e => setMessageToDecrypt(e.target.value)} 
                id='input_message_Decrypt'/>
                <p> Chave para a Descriptografia:</p>
                 <input type='text' 
                onChange={e => setSecretKeyToDecrypt(e.target.value)}
                placeholder='Insira a mesma chave utilizada para criptografia.'
                />

              </label>
              
              <div className='buttons_area'>
              <button className='btn secondary'  id="clean_Message_input" 
              onClick={() =>{cleanInput('clean_Message_input')}}
              >Limpar</button>
              <button className='btn primary' onClick={decryptMessage} disabled={isDisabledSecondary}>Descriptografar</button>
              </div>
              <p>Mensagem descriptografada:</p>
              <input 
              className={fail} 
              value={decryptedMessage} 
              onClick={copyMessage}
              placeholder='A mensagem descriptografada aparecerá aqui.'
              readOnly/>
          </div>
      </div>
    </>
  )
}

export default App
