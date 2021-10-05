const Success = (val) => {
    return {
        msg: val,
        success: true
    }
}

const Failure = (val) => {
    return {
        msg: val.details.split(":")[0],
        success: false
    }
}

module.exports = {
    Failure,
    Success
}
