const mobileRegex = /^[6-9]\d{9}$/;
const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
const otpRegex = /^\d{4}$/;

export const isMobileNoValid = (text : string)=> {
    return mobileRegex.test(text)
}

export const isPasswordValid = (text : string)=> {
    return (text && text.length>0) ?? false
}

export const isNameValid = (text : string)=> {
    return nameRegex.test(text)
}

export const isOtpValid = (text : string)=> {
    return otpRegex.test(text)
}

export const isTaskValid = (text : string|undefined)=> {
    return (text && text.length > 0) ?? false
}

export const isTaskListValid = (text : string|undefined)=> {
    return (text && text.length > 0) ?? false
}