const ck = "ck_5625ce7e56f0343d516b4981df704b77124094bd";
const cs = "cs_ab71b7aeb92c730acbcb636ab2bf82d27c1834d3";

const auth = Buffer.from(`${ck}:${cs}`).toString("base64");

const payload = {
  payment_method: "cod",
  payment_method_title: "Cash on Delivery",
  set_paid: false,
  billing: {
    first_name: "Test",
    last_name: "Order",
    address_1: "Test Address",
    city: "Test City",
    state: "Sindh",
    postcode: "12345",
    country: "PK",
    email: "test@example.com",
    phone: "03000000000"
  },
  line_items: [
    {
      product_id: 395, // Assuming this is a valid product ID. Let's see if it works without a valid product id or we can just fetch products first.
      quantity: 1
    }
  ]
};

async function testOrder() {
  // Let's first try to list products to get a valid product_id
  try {
    console.log("Fetching products to get a valid ID...");
    const prodRes = await fetch("https://api.kaajofficial.com/wp-json/wc/v3/products?per_page=1", {
      headers: { "Authorization": `Basic ${auth}` }
    });
    const prods = await prodRes.json();
    if (prods && prods.length > 0) {
      payload.line_items[0].product_id = prods[0].id;
      console.log(`Using product ID: ${prods[0].id}`);
    }

    console.log("Creating test order...");
    const res = await fetch("https://api.kaajofficial.com/wp-json/wc/v3/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`
      },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    console.log("Order created! ID:", data.id);
  } catch (err) {
    console.error(err);
  }
}

testOrder();
