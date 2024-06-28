function generateInvoiceNumber() {
    const prefix = "HD";
    const suffix = Math.floor(100000 + Math.random() * 900000).toString();
    return prefix + suffix;
}

document.getElementById('maHang').value=generateInvoiceNumber()
// for (let i = 0; i < 10; i++) {
//     console.log(generateInvoiceNumber());
// }