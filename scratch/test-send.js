const { Configuration, SendApi } = require('hostinger-mail-api-sdk');

const config = new Configuration({ accessToken: 'f982c94a7c9a6135a03909e7d118ddb853433531b21f4f1357609d72ada5dba4' });
const client = new SendApi(config);

async function test() {
  try {
    const res = await client.sendEmail('AC5ecff592b2c510d1d1e30c90b10f', {
      to: ['raomohyuddin75@gmail.com'],
      subject: 'Test Hostinger API',
      text: 'This is a test from the Hostinger Mail API SDK',
    });
    console.log('Success:', res.data);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
}

test();
