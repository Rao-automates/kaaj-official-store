import { getAdminOrders, getAdminSalesSummary } from "@/lib/admin-api";
import { formatPKR } from "@/lib/utils";

// Make this route dynamic so it doesn't cache statically at build time
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [orders, salesSummary] = await Promise.all([
    getAdminOrders(15),
    getAdminSalesSummary(),
  ]);

  return (
    <div className="space-y-10">
      <header>
        <h2 className="font-serif text-3xl text-[#DCD8D0]">Overview</h2>
        <p className="text-[#A9A499] text-sm mt-1">
          Welcome back. Here is what is happening with KAAJ today.
        </p>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#252525] p-6 border border-[#363832] rounded-sm">
          <p className="text-[10px] uppercase tracking-widest text-[#A9A499] mb-2">Net Sales (This Month)</p>
          <p className="font-serif text-3xl text-[#C9A84C]">
            {salesSummary ? formatPKR(salesSummary.net_sales || "0") : "..."}
          </p>
        </div>
        <div className="bg-[#252525] p-6 border border-[#363832] rounded-sm">
          <p className="text-[10px] uppercase tracking-widest text-[#A9A499] mb-2">Total Orders (This Month)</p>
          <p className="font-serif text-3xl text-[#DCD8D0]">
            {salesSummary ? salesSummary.total_orders : "..."}
          </p>
        </div>
        <div className="bg-[#252525] p-6 border border-[#363832] rounded-sm">
          <p className="text-[10px] uppercase tracking-widest text-[#A9A499] mb-2">Avg. Order Value</p>
          <p className="font-serif text-3xl text-[#DCD8D0]">
            {salesSummary && salesSummary.total_orders > 0
              ? formatPKR(
                  (parseFloat(salesSummary.net_sales) / salesSummary.total_orders).toString()
                )
              : "..."}
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <h3 className="font-serif text-xl text-[#DCD8D0] mb-4">Recent Orders</h3>
        <div className="bg-[#252525] border border-[#363832] rounded-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#363832] bg-[#1A1A18]/50">
                <th className="p-4 text-[10px] uppercase tracking-widest text-[#A9A499] font-medium">Order</th>
                <th className="p-4 text-[10px] uppercase tracking-widest text-[#A9A499] font-medium">Date</th>
                <th className="p-4 text-[10px] uppercase tracking-widest text-[#A9A499] font-medium">Customer</th>
                <th className="p-4 text-[10px] uppercase tracking-widest text-[#A9A499] font-medium">Status</th>
                <th className="p-4 text-[10px] uppercase tracking-widest text-[#A9A499] font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#A9A499] text-sm">
                    No recent orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr key={order.id} className="border-b border-[#363832] hover:bg-[#363832]/30 transition-colors">
                    <td className="p-4 text-sm font-medium text-[#DCD8D0]">
                      #{order.id}
                    </td>
                    <td className="p-4 text-xs text-[#A9A499]">
                      {new Date(order.date_created).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm text-[#DCD8D0]">
                      {order.billing.first_name} {order.billing.last_name}
                      <span className="block text-xs text-[#A9A499] mt-0.5">{order.billing.email}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm ${
                          order.status === "processing"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : order.status === "on-hold"
                            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            : order.status === "completed"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-[#1A1A18] text-[#A9A499] border border-[#363832]"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-serif text-[#DCD8D0]">
                      {formatPKR(order.total)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
