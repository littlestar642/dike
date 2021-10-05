const SignUp = async (req, res) => {
    let resp = await req.firestore.createUser(req.user.uid, req.body.username, req.body.phoneNumber)
    if (resp.success) {
        res.status(200).send("user created successfully")
    } else {
        console.log(resp)
        errorMsg = resp.msg.details.split(":")[0]
        res.status(409).send(`error: ${errorMsg}`)
    }
}

module.exports = SignUp