"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";

type Props = {
	amountInRupees: number;
	courseSlug: string;
	courseTitle: string;
};

function buildUpiUri({ amount, vpa, name, txnNote, txnRef }: { amount: number; vpa: string; name: string; txnNote: string; txnRef: string }) {
	const params = new URLSearchParams({
		pa: vpa,
		pn: name,
		am: amount.toFixed(2),
		cu: "INR",
		tn: txnNote,
		tr: txnRef,
	});
	return `upi://pay?${params.toString()}`;
}

export default function UpiPay({ amountInRupees, courseSlug, courseTitle }: Props) {
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [link, setLink] = useState("");
	const [paid, setPaid] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const vpa = process.env.NEXT_PUBLIC_MERCHANT_UPI_VPA || "test@upi";
	const merchant = process.env.NEXT_PUBLIC_MERCHANT_NAME || "Merchant";

	const txnRef = useMemo(() => `${courseSlug}-${Date.now()}`, [courseSlug]);

	useEffect(() => {
		const uri = buildUpiUri({ amount: amountInRupees, vpa, name: merchant, txnNote: courseTitle, txnRef });
		setLink(uri);
	}, [amountInRupees, vpa, merchant, courseTitle, txnRef]);

	useEffect(() => {
		if (!link || !canvasRef.current) return;
		QRCode.toCanvas(canvasRef.current, link, { width: 220 });
	}, [link]);

	async function confirmPayment() {
		if (!email) return alert("Enter email to receive access");
		const res = await fetch("/api/orders", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userEmail: email,
				userPhone: phone || undefined,
				courseSlug,
				amountInRupees,
				paymentProvider: "test",
				paymentStatus: "paid",
				paymentMeta: { upiIntent: true, txnRef },
				deliveredBy: phone ? "whatsapp" : "email",
			}),
		});
		if (res.ok) {
			setPaid(true);
			window.location.href = `/success?course=${courseSlug}`;
		} else {
			alert("Could not record order. Please contact support.");
		}
	}

	return (
		<div className="mt-6 rounded border p-4">
			<h3 className="font-semibold">Pay via UPI App</h3>
			<p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Scan QR or tap the button to open your UPI app. Then complete the payment and click Confirm Payment.</p>
			<div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
				<canvas ref={canvasRef} className="rounded bg-white p-2" />
				<div className="space-y-2">
					<a href={link} className="inline-block rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Open UPI App</a>
					<div className="grid gap-2">
						<input placeholder="Email (for access)" className="w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
						<input placeholder="WhatsApp (optional)" className="w-full rounded border px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
					</div>
					<button onClick={confirmPayment} className="rounded border px-4 py-2">Confirm Payment</button>
					{paid && <p className="text-sm text-green-600">Payment recorded. Redirecting...</p>}
				</div>
			</div>
			<p className="mt-2 text-xs text-gray-500">VPA: {vpa}</p>
		</div>
	);
}


