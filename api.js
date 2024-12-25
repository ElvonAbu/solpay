const {Keypair,Connection,PublicKey,Transaction,LAMPORTS_PER_SOL,SystemProgram,sendAndConfirmTransaction}=require("@solana/web3.js");
const {encodeURL,createQR,createTransfer, validateTransfer, findReference}=require("@solana/pay");
const splToken = require('@solana/spl-token');
const BigNumber = require("bignumber.js");
const bs58 = require('bs58');
const express=require('express');
const qrcode =require('qrcode-terminal');
const app = express();
require('dotenv').config();
const message='thanks for sending me funds';
const port =3000;
const label="Elvon pay";
const pic='https://unsplash.com/s/photos/cat';
const connection= new Connection(process.env.httpendpoint,{wss:process.env.wssendpoint},'confirmed');
const elvonadd="FC6eXCyAi8PB3qiNacFE82y2wCV9QDbPYyYQJ25A5HCH";
const elvpub=new PublicKey(elvonadd);
//console.log(process.env.httpendpoint);
const accmapp= new Map();
app.use(express.json());

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

app.listen(port,()=>{

    console.log("runnin on port",port);
    
    })

app.get("/generatepay",(req,res)=>{

try{
    const{sender}=req.body;
    if(!sender){
        res.status(400).send({message:"invalid request"});

    } 
    else{
       // const amount=new BigNumber(0.1);
       // const reference=Keypair.generate().publicKey;
        const url=encodeURL({elvpub, reference, label, message, memo});
        qrcode.generate(url.href,{small:true});
        // const enqr=createQR(url,20,'white','black');
       // const ref=reference.toBase58();
       // accmapp.set(ref,{elvpub, amount, memo });

        res.status(200).send({message:'qrcode generated'});
    }

}
catch(error){
    console.log("this is the error",error.message);
    res.status(500).send({ message: "Internal Server Error" });

}
}
  
)

app.get("/",(req,res)=>{
    res.status(200).send({label,pic});

})

app.post('/',(req,res)=>{
   console.log(req.body);
    res.send('this is a post request');

})

app.all("http://localhost:3000/tidy", async(req,res)=>{
    if(req.method==="get"){
        res.status(200).send({label,pic})
    }
    else{
        throw new error("this is an invalid request",req.method);
    }
})