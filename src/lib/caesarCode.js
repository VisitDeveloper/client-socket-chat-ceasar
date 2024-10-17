export function caesarDecrypt(encryptedMessage, shift) {
  shift = shift % 26; 
  let decryptedMessage = '';

  for (let i = 0; i < encryptedMessage?.length; i++) {
    const char = encryptedMessage[i];

    if (char >= 'A' && char <= 'Z') {
      decryptedMessage += String.fromCharCode((char.charCodeAt(0) - 65 - shift + 26) % 26 + 65);
    } else if (char >= 'a' && char <= 'z') {
      decryptedMessage += String.fromCharCode((char.charCodeAt(0) - 97 - shift + 26) % 26 + 97);
    } else {
      decryptedMessage += char;
    }
  }

  return decryptedMessage;
}
  
  // Example usage
  const encryptedMessage = "Khoor Zruog"; // "Hello World" encrypted with a shift of 3
  const shift = 3;
  const decryptedMessage = caesarDecrypt(encryptedMessage, shift);
  console.log(decryptedMessage); // Output: "Hello World"
  