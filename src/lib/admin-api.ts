const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;
const WC_API_URL = "https://api.kaajofficial.com/wp-json/wc/v3";

function getAuthHeader() {
  if (!WC_KEY || !WC_SECRET) {
    throw new Error("Missing WooCommerce API credentials");
  }
  return {
    "Content-Type": "application/json",
    "Authorization": `Basic ${Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64")}`,
  };
}

export async function getAdminOrders(limit = 20) {
  try {
    const res = await fetch(`${WC_API_URL}/orders?per_page=${limit}&orderby=date&order=desc`, {
      headers: getAuthHeader(),
      next: { revalidate: 30 } // Cache for 30s so dashboard is relatively real-time but doesn't spam WP
    });
    
    if (!res.ok) throw new Error("Failed to fetch orders");
    return await res.json();
  } catch (error) {
    console.error("Admin API Error (Orders):", error);
    return [];
  }
}

export async function getAdminSalesSummary() {
  try {
    // Fetch reports/sales for this month
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0];
    
    const res = await fetch(`${WC_API_URL}/reports/sales?date_min=${firstDay}&date_max=${lastDay}`, {
      headers: getAuthHeader(),
      next: { revalidate: 300 } // Cache for 5 mins
    });

    if (!res.ok) throw new Error("Failed to fetch sales summary");
    
    const data = await res.json();
    return data[0] || null;
  } catch (error) {
    console.error("Admin API Error (Sales):", error);
    return null;
  }
}
