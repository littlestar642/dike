const firebaseUtil = require("../util/firestore")

const Ping = (req, res) => {
    res.send("Hello from AA sample app");
}

const GetData = async (req, res) => {
    let val = await firebaseUtil.GetInstance().get("fidata/doc")
    res.send(val);
}

module.exports = {
    Ping,
    GetData
}