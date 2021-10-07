const Ping = (req, res) => {
    res.send("Hello from AA sample app");
}

const Redirect = (req,res)=>{
    res.send("Redirecting...")
}

module.exports = {
    Ping,
    Redirect
}
