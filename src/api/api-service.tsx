export const getPaymentsQuery = async () => {
	try {
		const response = await fetch(`/api/payments?page=1&pageSize=5`);

		if (!response.ok) {
			const errData = await response.json();
			throw new Error(errData.message || "Failed to fetch payments");
		}

		const data = await response.json();
		return data;
	} catch (err: unknown) {
		if (err instanceof Error) {
			return err.message;
		} else {
			return "An unexpected error occurred";
		}
	}
}