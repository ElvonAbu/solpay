const {Keypair,Connection,PublicKey,Transaction,LAMPORTS_PER_SOL,SystemProgram,sendAndConfirmTransaction}=require("@solana/web3.js");
const {encodeURL,createQR,createTransfer, validateTransfer} = require("@solana/pay");
require('dotenv').config();
const qrcode=require('qrcode-terminal');
const BigNumber = require('bignumber.js');
// CONSTANTS
const myWallet = 'FC6eXCyAi8PB3qiNacFE82y2wCV9QDbPYyYQJ25A5HCH'; // Replace with your wallet address (this is the destination where the payment will be sent)
const recipient = new PublicKey(myWallet);
const quickNodeEndpoint =process.env.httpendpoint;
const connection = new Connection(quickNodeEndpoint, 'confirmed');
const amount = new BigNumber(0.1);// 0.1 SOL
const reference = new Keypair().publicKey;
const label = 'Elvon pay';
const message = 'send funds';
const memo = 'Tidy the untidy';
 const generatepay= async ()=>{

        const url=encodeURL({recipient, reference, label, message, memo});
    console.log("generating grcode.....",url.href);
    //qrcode.generate(url.href,{small:true});
    //const genqr= createQR(url,20,'white','black');


 };
 const accmapp=new Map();
 
const validatetx=async (reference)=>{

    const payreq=accmapp.get(reference.toBase58());
    if(!payreq){
        throw new Error('Payment request not found');
    }
    else{
        const {recipient,amount,memo}=payreq;
        console.log('recipient', recipient.toBase58());
        console.log('amount', amount);
        console.log('reference', reference.toBase58());
        console.log('memo', memo);  
    const found=findReference(connection,reference);
    console.log(found.signature);
    const valtr=await validateTransfer(connection,found.signature,{recipient,amount,splToken:undefined,memo},
        { commitment: 'confirmed' }
    );
        return valtr;
    }


};

const validtxre=Keypair.generate().publicKey;
 generatepay();
 //validatetx(validtxre.toBase58());