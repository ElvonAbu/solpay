const {Keypair,Connection,PublicKey,Transaction,LAMPORTS_PER_SOL,SystemProgram,sendAndConfirmTransaction}=require("@solana/web3.js");
const {encodeURL,createQR,createTransfer, validateTransfer, findReference}=require("@solana/pay");
const splToken = require('@solana/spl-token');
const BigNumber = require("bignumber.js");
const bs58 = require('bs58');
const express=require('express');
const qrcode =require('qrcode-terminal');
const app = express();
const label="Elvon pay";
const pic='https://unsplash.com/s/photos/cat';
require('dotenv').config();
app.use(express.json());


const generatepay= async ()=>{
    const memo='elvon pay';
    const message="testing out shit";
    const label="olololo";
    const reference= Keypair.generate().publicKey;
    const elvonadd="FC6eXCyAi8PB3qiNacFE82y2wCV9QDbPYyYQJ25A5HCH";
    const recipient=new PublicKey(elvonadd);
    //const elvpubb=elvpub.toBase58();
    
    const url=encodeURL({recipient, reference, label, message, memo});
console.log("generating grcode.....");
qrcode.generate(url.href,{small:true});
//const genqr= createQR(url,20,'white','black');


};


const port=3000;
app.listen(port,()=>{

    console.log('sever running at',port);

})

app.get('/',async (req,res)=>{
    await generatepay();
   res.status(200).send({messag:'tidy the untidy'});


})

//generatepay();
app.get("/tidy",(req,res)=>{
    res.status(200).send({label,pic});

})


app.post("/tidy", async(req,res)=>{
    try{ 
        const sender= req.body;
        const senderr=new PublicKey(sender);
        console.log("this is the sender",senderr.toBase58());
        const tx = SystemProgram.transfer({
            fromPubkey:sender,
            toPubkey:recipient,
            amount:0.001*LAMPORTS_PER_SOL
        })
        const transaction = new Transaction().add(tx);
        const bha=await connection.getLatestBlockhash();
        transaction.feePayer=sender;
        transaction.recentBlockhash=bha.blockhash;
    
        const newserial=transaction.serialize({
            verifySignatures:false,
            requireAllSignatures:false
        });
        const neserial=newserial.toString('base64');
        const messagee="thanks for purchasing a product";
        
        res.status(200).send({
            transaction:neserial,
            messagee
        })}catch(error){
        res.status(500).send("this is a server error");
    }
   
})