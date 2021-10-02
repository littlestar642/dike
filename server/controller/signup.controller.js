const SignUp = async (req, res) => {
    let userCreated = await req.firebase.createUser(req.user.uid, req.body.username, req.body.phoneNumber)
    if (userCreated.success) {
        res.status(200).send("user created successfully")
    } else {
        console.log(userCreated)
        errorMsg = userCreated.msg.details.split(":")[0]
        res.status(409).send(`error: ${errorMsg}`)
    }
}

module.exports = SignUp
