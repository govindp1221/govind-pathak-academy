import { connectToDatabase } from "@/lib/db";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
	await connectToDatabase();
	const orders = await Order.find().sort({ createdAt: -1 }).lean();
	return (
		<section className="mx-auto max-w-6xl px-4 py-10">
			<h1 className="text-2xl font-semibold">Orders</h1>
			<div className="mt-6 overflow-x-auto">
				<table className="min-w-full text-sm">
					<thead>
						<tr className="text-left">
							<th className="p-2">Email</th>
							<th className="p-2">Course</th>
							<th className="p-2">Amount</th>
							<th className="p-2">Status</th>
							<th className="p-2">Date</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((o: any) => (
							<tr key={o._id} className="border-t">
								<td className="p-2">{o.userEmail}</td>
								<td className="p-2">{o.courseTitleSnapshot}</td>
								<td className="p-2">₹{o.amountInRupees}</td>
								<td className="p-2">{o.paymentStatus}</td>
								<td className="p-2">{new Date(o.createdAt).toLocaleString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}


