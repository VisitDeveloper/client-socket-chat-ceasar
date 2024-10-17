import React, { useEffect, useState } from 'react';
import { caesarDecrypt } from '../lib/caesarCode';

const Cryptanalyst = (props) => {
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessages, setDecryptedMessages] = useState([]);
  const [findeCurrentDecrypted, setFindCurrentDecrypted] = useState()

  const analyzeMessage = () => {
    const results = [];
    for (let shift = 1; shift < 26; shift++) {
      console.log('encryptedMessageencryptedMessage', encryptedMessage)
      const decrypted = caesarDecrypt(encryptedMessage, shift);
      console.log('decrypted', decrypted)
      results.push({ shift, decrypted });
      console.log('decrypted', decrypted, results)
    }
    setDecryptedMessages(results);
  };

  console.log('decryptdecryptdecryptdecrypt', props.decrypt)
  useEffect(() => {
    ((decrypt) => {
      console.log('de', decryptedMessages)
      const deepCopy = [...decryptedMessages]
      console.log('decrypt', decrypt)
      const findCurrentShift = deepCopy.find((item) => item.decrypted === props.decrypt)
      console.log("findCurrentShift", findCurrentShift?.decrypted)
      setFindCurrentDecrypted(findCurrentShift)
    })()

  }, [decryptedMessages])

  return (
    <div>
      <h2>Cryptanalysis of Caesar Cipher</h2>
      <input
        type="text"
        value={encryptedMessage}
        onChange={(e) => setEncryptedMessage(e.target.value)}
        placeholder="Enter encrypted message..."
      />
      <button onClick={analyzeMessage}>Analyze</button>

      <h3>Decrypted Messages:</h3>
      <span>
        current analysis : {findeCurrentDecrypted ? findeCurrentDecrypted?.decrypted : ''}
      </span>
      <span>
        shift : {findeCurrentDecrypted ? findeCurrentDecrypted?.shift : ''}
      </span>
      <ul>
        {decryptedMessages.length !== 0 && decryptedMessages.map((result, index) => (
          <li key={index}>
            Shift {result.shift}: {result.decrypted}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cryptanalyst;
