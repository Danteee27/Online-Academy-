import otpGenerator from 'otp-generator'
export default{
    generateOTP() {
        const OTP = otpGenerator.generate(6, {alphabets: false, uppercase: false, specialChar:false});
        return OTP;
    }
};


