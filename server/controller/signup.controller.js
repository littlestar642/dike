const SignUp = async (req, res) => {
    let resp = await req.firestore.createUser(req.user.uid, req.body.username, req.body.phoneNumber)
    if (resp.success) {
        res.status(200).send(resp)
    } else {
        console.log(resp)
        res.status(409).send(resp)
    }
}

module.exports = SignUp