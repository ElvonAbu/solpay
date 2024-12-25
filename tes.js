const { LAMPORTS_PER_SOL } = require('@solana/web3.js');
const axios = require('axios');

// URL of the server
const url = 'http://localhost:3000/pay';

// Transaction details
const amount = 0.001 * LAMPORTS_PER_SOL; // Convert 0.001 SOL to lamports
const label = 'sending elvon funds';    // A label for the transaction
const memo = '7654';                   // An optional memo for the transaction

// Request body
const reci='HUZ3KATSY2Lpti5HfwUo42c5aCwkTbtCDQWteK2KaTV2';
 const body = {
 account:'HUZ3KATSY2Lpti5HfwUo42c5aCwkTbtCDQWteK2KaTV2'
  };
  

// Function to send the POST request
const get = async () => {
  try {
    const result = await axios.post('http://localhost:3000/'); // Send get request
    console.log(result.data); // Log response data
  } catch (error) {
    console.error('Error sending Post request:', error.message);
  }
};

// Invoke the function
get();
