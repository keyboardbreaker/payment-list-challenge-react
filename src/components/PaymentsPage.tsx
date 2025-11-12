import { useEffect, useState } from "react";
import { Container } from './components'
import { Payment } from "../types/payment";
import { I18N } from "../constants/i18n";
import { getPaymentsQuery } from "../api/api-service";

export const PaymentsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getPayments = async () => {
      setLoading(true);
      setError(null);
      const result = await getPaymentsQuery();
      setPayments(result.payments);
      setLoading(false);
    }
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