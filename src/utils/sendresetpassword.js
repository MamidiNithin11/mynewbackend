import nodemailer from 'nodemailer';

export const sendResetPasswordEmail =async(email,resetToken)=>{
    const transporter =nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });``

    const reseturl =`${process.env.BASE_URL}/api/auth/reset-password/${resetToken}`;
    
    const mailOptions = {
        from:`"Nn-Shopings"<${process.env.EMAIL_USER}>`,
        to:email,
        subject:'Reset Password',
        html:`
        <div>
        <h3>Password Reset Request</h3>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${reseturl}">Reset Password</a>   
        <p>This link will expire in 1 hour.</p> 
        </div>`
    };
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
        }else{
            console.log('Email sent:',info.response);
        }
    });
}