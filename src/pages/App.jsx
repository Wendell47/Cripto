import { useEffect, useState } from 'react'
import '../styles/App.css'
import CryptoJS from 'crypto-js'
import { HiArrowPath } from 'react-icons/hi2';

function App() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledSecondary, setIsDisabledSecondary] = useState(true);
  const [messageToEncrypt, setMessageToEncrypt] = useState('');
  const [messageToDecrypt, setMessageToDecrypt] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [secretKeyToDecrypt, setSecretKeyToDecrypt] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  
 
  function getInputResult(id,result){
    const inputResult = document.getElementById(id)

    if (result == '') {
      inputResult.classList.contains('success') && inputResult.classList.remove('success')
      inputResult.classList.add('error')     
      return "Error: Failed to decrypt - a chave e/ou a mensagem está errada." 
    }

    inputResult.classList.contains("error") && inputResult.classList.remove('error')

    if (id){
      const item = document.getElementById(id)
      item.classList.add('success')

    }
    return result
  }
  const encryptMessage = (inputId) => {
    const encrypted = CryptoJS.AES.encrypt(messageToEncrypt, secretKey).toString();
    setEncryptedMessage(getInputResult(inputId,encrypted));
  };

  const decryptMessage = (inputId) => {
    const bytes = CryptoJS.AES.decrypt(messageToDecrypt, secretKeyToDecrypt);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    
    setDecryptedMessage(getInputResult(inputId, originalText));
  };

  function cleanInput(inputName){
    if (inputName == 'clean_Message_input'){
      setMessageToEncrypt('')
      setSecretKey('')
    }
    if (inputName == 'clean_Message_input_secondary'){
      setMessageToDecrypt('')
      setSecretKeyToDecrypt('')
    }
  }

    function copyMessage(id,text){
      
    if (text !== '' && !text.includes('err')){
      const copyDiv = document.querySelector(`#${id} .copy_alert`)
    copyDiv.classList.add('active');
    setTimeout(() => {copyDiv.classList.remove('active')},580)
    navigator.clipboard.writeText(text)
    } 
    
  }


  function generateRandomKey(){
    const animation = document.querySelector('.random_key_btn');
    animation.classList.add('animation');

    setTimeout(() => {animation.classList.remove('animation')},180)

    let chave = '';
    for(let i = 0; i < 32; i++) {
        chave += Math.floor(Math.random() * 16).toString(16);
    }
    setSecretKey(chave)
  }
 
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
     
      <div className='Content-Area'>
          <div>
              <label  htmlFor='input_message_Encrypt'>

                <p>Mensagem a ser criptografada:</p>
                <textarea 
                value={messageToEncrypt}
                placeholder='Digite sua mensagem aqui'
                onChange={e => setMessageToEncrypt(e.target.value)} 
                id='input_message_Encrypt'/>
                    <p> Chave para a criptografia:</p>
                    <div className='input_key_wrapper'>
                    <input type='text'
                    value={secretKey}
                    onChange={e => setSecretKey(e.target.value)}
                    placeholder='exemplo: K4UIR3a8I/Yc-HI6A-II9pi!8=0xUbyAF9/2gHbAKRoYczYUykkfQw!XjaIh!Qta5-OR0KFInpqtk3FK'
                    />
                    <span className='random_key_btn' onClick={generateRandomKey}><HiArrowPath/></span>
                    </div>
              </label>
              
              <div className='buttons_area'>
                  <button className='btn secondary'  id="clean_Message_input" onClick={() =>{cleanInput('clean_Message_input')}}>Limpar tudo</button>
                  <button className='btn primary' onClick={() => encryptMessage('input_Encrypt_result')} disabled={isDisabled}>Criptografar</button>
              </div>
              <p>Mensagem criptografada:</p>
              <div className='textarea_wrapper' id='encrypted_result_wrapper'>
              <textarea
              id='input_Encrypt_result'
              value={encryptedMessage} 
              onClick={() => copyMessage('encrypted_result_wrapper',encryptedMessage)} 
              placeholder='A mensagem criptografada aparecerá aqui.'
              readOnly></textarea>
              <div className='copy_alert'>Copiado ✓</div>
            </div>
          </div>
          <span className='line_divisor'></span>
          <div>
          <label htmlFor='input_message_Decrypt'>

                <p>Mensagem a ser descriptografada:</p>
                <textarea 
                value={messageToDecrypt}
                placeholder='Insira a mensagem criptografada aqui'
                onChange={e => setMessageToDecrypt(e.target.value)} 
                id='input_message_Decrypt'/>
                <p> Chave para a Descriptografia:</p>
                <input 
                type='text'
                value={secretKeyToDecrypt} 
                onChange={e => setSecretKeyToDecrypt(e.target.value)}
                placeholder='Insira a mesma chave utilizada para criptografia.'
                />

              </label>
              
              <div className='buttons_area'>
              <button className='btn secondary'  id="clean_Message_input_secondary" 
              onClick={() =>{cleanInput('clean_Message_input_secondary')}}
              >Limpar tudo</button>
              <button className='btn primary' onClick={() =>decryptMessage('input_Decrypt_result')} disabled={isDisabledSecondary}>Descriptografar</button>
              </div>
              <p>Mensagem descriptografada:</p>
              <div className='textarea_wrapper' id='decrypted_result_wrapper'>
              <textarea 
              type='text'
              id="input_Decrypt_result"
              value={decryptedMessage} 
              onClick={() => copyMessage('decrypted_result_wrapper',decryptedMessage)}
              placeholder='A mensagem descriptografada aparecerá aqui.'
              readOnly/>
              <div className='copy_alert'>Copiado ✓</div>
              </div>
          </div>
      </div>
    </>
  )
}

export default App
