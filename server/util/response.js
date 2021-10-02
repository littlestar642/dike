const Success = (val) => {
    return {
        msg: val,
        success: true
    }
}

const Failure = (val) => {
    return {
        msg: val,
        success: false
    }
}

module.exports = {
    Failure,
    Success
}
