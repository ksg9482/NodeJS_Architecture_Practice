// config/index.js
import dotenv from 'dotenv';
dotenv.donfig();

//이렇게 하면 process.env 명령어들이 난무하는 것을 막을 수 있고, 코드 자동완성을 이용할 수 있다.
export default {
    port: process.env.PORT,
    databaseURL:process.env.DATABASE_URL,
    paypal:{
        publicKey:process.env.PAYPAL_PUBLIC_KEY,
        seceretKey:process.env.PAYPAL_SECRET_KEY
    },
    mailchimp: {
        apiKey:process.env.MAILCHIMP_API_KEY,
        sender:process.env.MAILCHIMP_SENDER
    }
}