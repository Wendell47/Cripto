import { useEffect, useState } from 'react'
import '../styles/App.css'
import CryptoJS from 'crypto-js'
import { HiArrowPath, HiClipboard, HiClipboardDocument, HiCheckCircle } from 'react-icons/hi2';

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
  
  function pasterRandomKey(){
    if(secretKey){
      setSecretKeyToDecrypt(secretKey)
    }
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
    const button = document.querySelector('#paster_button');
    if(secretKey){
      button.classList.remove('hide')
    }else{
      button.classList.add('hide')
    }
    
  },[secretKey, messageToEncrypt,messageToDecrypt,secretKeyToDecrypt])
  
  setTimeout(()=>{
    const animation = document.querySelector('.random_key_btn')
    animation.classList.remove('animation2') 
  },1800)
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
                id='input_message_Encrypt'
                />
              </label>
              <label htmlFor='input_key_Encrypt'>
                    <p> Chave para a criptografia:</p>
                    <div className='input_key_wrapper'>
                    <input 
                    id='input_key_Encrypt'
                    type='text'
                    value={secretKey}
                    onChange={e => setSecretKey(e.target.value)}
                    placeholder='insirá um chave ou gere uma aleatória.'
                    />
                    <span className='random_key_btn animation2' onClick={generateRandomKey}><HiArrowPath/></span>
                    </div>
              </label>
              
              <div className='buttons_wrapper'>
                  <button className='btn secondary'  id="clean_Message_input" onClick={() =>{cleanInput('clean_Message_input')}}>Limpar tudo</button>
                  <button className='btn primary' onClick={() => encryptMessage('input_Encrypt_result')} disabled={isDisabled}>Criptografar</button>
              </div>
              <label htmlFor='input_Encrypt_result'>
              <p>Mensagem criptografada:</p>
              <div className='textarea_wrapper' id='encrypted_result_wrapper'>
              <textarea
              id='input_Encrypt_result'
              value={encryptedMessage} 
              placeholder='A mensagem criptografada aparecerá aqui.'
              readOnly></textarea>
               <span className='random_key_btn flex-bottom' onClick={() => copyMessage('encrypted_result_wrapper',encryptedMessage)}>
               <div className='icons_copy_wrapper'>
                  <HiClipboardDocument className='copy_icon'/>
                  <HiCheckCircle className='check_icon'/>
               </div>
              </span>
              </div>
              </label>
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
          </label>
          <label htmlFor='input_key_Decrypt'> 
                <p> Chave para a Descriptografia:</p>
                <div className='input_key_wrapper'>
                  <input 
                  id='input_key_Decrypt'
                  type='text'
                  value={secretKeyToDecrypt} 
                  onChange={e => setSecretKeyToDecrypt(e.target.value)}
                  placeholder='Insira a mesma chave utilizada para criptografia.'
                  />
                  <span className='random_key_btn hide' id ='paster_button'onClick={pasterRandomKey}><HiClipboard/></span>
                </div>
          </label>
              
              <div className='buttons_wrapper'>
              <button className='btn secondary'  id="clean_Message_input_secondary" 
              onClick={() =>{cleanInput('clean_Message_input_secondary')}}
              >Limpar tudo</button>
              <button className='btn primary' onClick={() =>decryptMessage('input_Decrypt_result')} disabled={isDisabledSecondary}>Descriptografar</button>
              </div>
              <label htmlFor='input_Decrypt_result'>
              <p>Mensagem descriptografada:</p>
              <div className='textarea_wrapper' id='decrypted_result_wrapper'>
              <textarea 
              type='text'
              id="input_Decrypt_result"
              value={decryptedMessage} 
              placeholder='A mensagem descriptografada aparecerá aqui.'
              readOnly/>
              <span className='random_key_btn flex-bottom' onClick={() => copyMessage('decrypted_result_wrapper',decryptedMessage)}>
               <div className='icons_copy_wrapper'>
                  <HiClipboardDocument className='copy_icon '/>
                  <HiCheckCircle className='check_icon '/>
               </div>
              </span>
              </div>
              </label>
          </div>
      </div>
    </>
  )
}

export default App
