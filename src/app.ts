import express, { Request, Response } from 'express';
const venom = require('venom-bot');
const fs = require('fs');

interface Message {
  to: string;
  message: string;
}

const app = express();
const port = process.env.PORT || 3000;
let clientVenom: any;

app.use(express.json());


// venom
//   .create(
//     'henrique',
//     (base64Qr: string, asciiQR: any, attempts: any, urlCode: any) => {
//       console.log(asciiQR); // Optional to log the QR in the terminal
//            // Convertendo o QR code em base64
//            const base64QR = base64Qr.split(',')[1]; // Obtendo apenas a parte base64

//            // Use o base64QR como necessário, por exemplo, retornando-o como resposta de uma API
//           //  base = base64Qr;
//           console.log(base64QR);

//     },
//     undefined,
//     { logQR: true }
//   )
//   .then((client: any) => {
//     clientVenom = client
//     console.log("Conectado");
//   })
//   .catch((erro: any) => {
//     console.log(erro);
//   });

  

 function sendMessage(to: string, message: string) {
   clientVenom
    .sendText(to + '@c.us', message)
    .then((result: any) => {
      console.log('Result: ', result); // return object success
    })
    .catch((erro: any) => {
      console.error('Error when sending: ', erro); // return object error
    });
}

app.post('/sendMessage',  (req: Request, res: Response) => {
  const messages: Message[] = req.body;

  for (const message of messages) {
      sendMessage(message.to, message.message);
  }
});

app.get('/getQrCode', (req: Request, res: Response) => {
  var base = "";
  venom
  .create(
    'henrique',
    (base64Qr: string, asciiQR: any, attempts: any, urlCode: any) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
           // Convertendo o QR code em base64
           const base64QR = base64Qr.split(',')[1]; // Obtendo apenas a parte base64

           // Use o base64QR como necessário, por exemplo, retornando-o como resposta de uma API
           base = base64Qr;
           res.json(base);

    },
    undefined,
    { logQR: true }
  )
  .then((client: any) => {
    clientVenom = client
    console.log("Conectado");
  })
  .catch((erro: any) => {
    console.log(erro);
  });
  
  
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});