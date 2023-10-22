import { useEffect, useState } from 'react'
import '../styles/App.css'
import CryptoJS from 'crypto-js'
import Section from '../components/Section';
import Input from '../components/Input';
import SecondaryButton from '../components/SecondaryButton';
import Button from '../components/Button';

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

  function generateRandomKey(){

    const animation = document.querySelector('.secondaryButton');
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
    const animation = document.querySelector('.secondaryButton')
    animation.classList.remove('animation2') 
  },1800)
  return (
      <div className='Content-Area'>
          <div>
            <Section
              title='Mensagem a ser criptografada:'
              htmlFor='input_message_Encrypt'
              >
                <textarea 
                value={messageToEncrypt}
                placeholder='Digite sua mensagem aqui'
                onChange={e => setMessageToEncrypt(e.target.value)} 
                id='input_message_Encrypt'
                />
            </Section>
            <Section 
              title='Chave para a criptografia:'
              htmlFor='input_key_Encrypt'
              >
                <Input 
                  id='input_key_Encrypt'
                  placeholder='insira um chave ou gere uma aleatória.'
                  value={secretKey}
                  onChange={e => setSecretKey(e.target.value)}
                  >
                    <SecondaryButton
                    isRandomButton={true}
                    onClick={generateRandomKey}
                    />
                </Input>
            </Section>

              <div className='buttons_wrapper'>
                <Button
                  type='secondary'
                  title='Limpar tudo'
                  onClick={() =>{cleanInput('clean_Message_input')}}
                />
                <Button
                  type='primary'
                  title='Criptografar'
                  onClick={() => encryptMessage('input_Encrypt_result')}
                  disabled={isDisabled}                
                />
              </div>
              <Section 
                title='Mensagem criptografada:'
                htmlFor='input_Encrypt_result'
                >
              <div 
                className='textarea_wrapper' 
                id='encrypted_result_wrapper'
                >
                <textarea
                id='input_Encrypt_result'
                value={encryptedMessage} 
                placeholder='A mensagem criptografada aparecerá aqui.'
                readOnly/>
                <SecondaryButton
                id='encrypted_result_wrapper'
                text={encryptedMessage}
              />
              </div>
              </Section>
          </div>
          <span className='line_divisor'></span>
          <div>
          <Section 
            title='Mensagem a ser descriptografada:'
            htmlFor='input_message_Decrypt'
            >
              <textarea 
              value={messageToDecrypt}
              placeholder='Insira a mensagem criptografada aqui'
              onChange={e => setMessageToDecrypt(e.target.value)} 
              id='input_message_Decrypt'
              />
          </Section>

          <Section 
          title='Chave para a Descriptografia:'
          htmlFor='input_key_Decrypt'
            > 
              <Input
                id='input_key_Decrypt'
                value={secretKeyToDecrypt} 
                onChange={e => setSecretKeyToDecrypt(e.target.value)}
                placeholder='Insira a mesma chave utilizada para criptografia.'
                >
                <SecondaryButton
                buttonID ='paster_button'
                onClick={pasterRandomKey}
                isPasterButton={true}
                />
              </Input>
          </Section>
              <div className='buttons_wrapper'>
                <Button
                  type='secondary'
                  title='Limpar tudo'
                  onClick={() =>{cleanInput('clean_Message_input_secondary')}}
                />
                <Button
                  type='primary'
                  title='Descriptografar'
                  onClick={() => decryptMessage('input_Decrypt_result')}
                  disabled={isDisabledSecondary}                
                />
              </div>
          <Section
            title='Mensagem descriptografada:'
            htmlFor='input_Decrypt_result'
            >
              <div className='textarea_wrapper' id='decrypted_result_wrapper'>
              <textarea 
              type='text'
              id="input_Decrypt_result"
              value={decryptedMessage} 
              placeholder='A mensagem descriptografada aparecerá aqui.'
              readOnly/>
              <SecondaryButton
              id='decrypted_result_wrapper'
              text={decryptedMessage}
              />
              </div>
          </Section>
          </div>
      </div>
  )
}

export default App
