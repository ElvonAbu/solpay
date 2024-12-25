const qrcode = require('qrcode');

const solanaPayURL = 'solana:https://192.168.100.48:3000/solana-pay';

// Generate and log QR code in the terminal
qrcode.toString(solanaPayURL, { type: 'terminal' }, (err, qrCode) => {
    if (err) {
        console.error('Error generating QR code:', err);
        return;
    }
    console.log(qrCode); // QR code displayed in the terminal
});

// Generate QR code as an image
qrcode.toFile('solana-pay-qr.png', solanaPayURL, (err) => {
    if (err) {
        console.error('Error saving QR code image:', err);
        return;
    }
    console.log('QR code saved as solana-pay-qr.png');
});
