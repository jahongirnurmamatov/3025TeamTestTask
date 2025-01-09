import crypto from 'crypto';

export const generateHash256 = (input) => {
    const hash = crypto.createHash('sha256') 
    .update(input)                         
    .digest('base64')                                                  
  return hash;
}