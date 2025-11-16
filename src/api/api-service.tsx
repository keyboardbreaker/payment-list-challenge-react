import { PaymentQueryParams, PaymentSearchResponse } from "../types/payment";

export const getPaymentsQuery = async (params: PaymentQueryParams): Promise<PaymentSearchResponse> => {

		const query = new URLSearchParams();
		
		if(params.search) query.append("search", params.search);
		if(params.currency) query.append("currency", params.currency);
		query.append("page", String(params.page ?? 1));
		query.append("pageSize", String(params.pageSize ?? 5));
	
		const response = await fetch(`/api/payments?${query.toString()}`);

		if(!response.ok) {
			const errData = await response.json();
			throw new Error(errData.message || "Failed to fetch payments");
		}

	return response.json();
}