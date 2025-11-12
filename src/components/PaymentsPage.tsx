import { useEffect, useState } from "react";
import { Container } from './components'
import { Payment } from "../types/payment";
import { I18N } from "../constants/i18n";

export const PaymentsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getPayments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/payments?page=1&pageSize=5`);

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to fetch payments");
        }

        const data = await response.json();
        setPayments(data.payments);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    getPayments();
  }, []);

  return (
    <Container>
        {loading && <p>Loading payments...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
                  <table className="min-w-full border mt-4">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 text-left">{I18N.TABLE_HEADER_PAYMENT_ID}</th>
                      <th className="border px-4 py-2 text-left">{I18N.TABLE_HEADER_DATE}</th>
                      <th className="border px-4 py-2 text-left">{I18N.TABLE_HEADER_AMOUNT}</th>
                      <th className="border px-4 py-2 text-left">{I18N.TABLE_HEADER_CUSTOMER}</th>
                      <th className="border px-4 py-2 text-left">{I18N.TABLE_HEADER_CURRENCY}</th>
                      <th className="border px-4 py-2 text-left">{I18N.TABLE_HEADER_STATUS}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id}>
                        <td className="border px-4 py-2">{p.id}</td>
                        <td className="border px-4 py-2">{p.date.toString()}</td>
                        <td className="border px-4 py-2">{p.amount}</td>
                        <td className="border px-4 py-2">{p.customerName}</td>
                        <td className="border px-4 py-2">{p.currency}</td>
                        <td className="border px-4 py-2">{p.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
        )}
    </Container>
  );
};