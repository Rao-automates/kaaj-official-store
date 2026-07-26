const { Configuration, AccountApi } = require('hostinger-mail-api-sdk');

const config = new Configuration({ accessToken: 'f982c94a7c9a6135a03909e7d118ddb853433531b21f4f1357609d72ada5dba4' });
const client = new AccountApi(config);

async function test() {
  try {
    const res = await client.getCurrentAccount();
    console.log('Success:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
}

test();
