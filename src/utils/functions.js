const sendSms = async (data) => {
    const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

    await client.messages.create({
        body: data.body,
        from: 'whatsapp:+14155238886',
        to: process.env.MY_PHONE
    })
}

module.exports = sendSms