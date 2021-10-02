const getFirebaseAdminConfig = () => {
    let adminConfig64 = process.env.GOOGLE_ADMIN;
    return JSON.parse(Buffer.from(adminConfig64, 'base64').toString('ascii'));
}

const getAAPrivateKey = () => {
    let aa64 = process.env.AA_PRIVATE_KEY;
    return Buffer.from(aa64, 'base64').toString('ascii');
}

const getAAPublicKey = () => {
    let aa64 = process.env.AA_PUBLIC_KEY;
    return Buffer.from(aa64, 'base64').toString('ascii');
}

const getSetuPublicKey = () => {
    let aa64 = process.env.SETU_PUBLIC_KEY;
    return Buffer.from(aa64, 'base64').toString('ascii');
}

module.exports = {
    getFirebaseAdminConfig,
    getAAPrivateKey,
    getAAPublicKey,
    getSetuPublicKey
}
