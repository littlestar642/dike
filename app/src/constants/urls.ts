const url = 'https://dike-aa.herokuapp.com/'

const URLs = Object.freeze({
    createUser: url + 'users/signup',
    redirect: url + 'redirect',
    getConsent: url + 'users/consent/',
    getScore: url + 'users/score',
    getTransactionDetails: url + 'users/transactions',
    getMutualFunds: url + 'users/mutualFunds',
    getProfileDetails : url + 'users/profile'
});

export default URLs;