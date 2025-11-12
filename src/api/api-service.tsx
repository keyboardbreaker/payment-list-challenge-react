import { PaymentSearchResponse } from "../types/payment";

export const getPaymentsQuery = async (): Promise<PaymentSearchResponse> => {
	const response = await fetch(`/api/payments?page=1&pageSize=5`);

	if (!response.ok) {
		const errData = await response.json();
		throw new Error(errData.message || "Failed to fetch payments");
	}

	return response.json();
}