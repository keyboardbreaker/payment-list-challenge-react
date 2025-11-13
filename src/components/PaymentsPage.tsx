import { useEffect, useState } from "react";
import { Container, FlexRow, SearchButton, SearchInput, Spinner, StatusBadge, Table, TableBodyWrapper, TableCell, TableHeader, TableHeaderRow, TableHeaderWrapper, TableRow, TableWrapper, Title } from './components'
import { Payment } from "../types/payment";
import { I18N } from "../constants/i18n";
import { getPaymentsQuery } from "../api/api-service";
import { formatCurrency } from "../utils/helpers";

export const PaymentsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPayments = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const result = await getPaymentsQuery();
        setPayments(result.payments);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
  
    getPayments();
  }, []);

  const handleSearch = () => {

  }

  return (
    <Container>
      <FlexRow>
        <Title>All payments</Title>
      </FlexRow>
      <FlexRow style={{ justifyContent: "flex-start", alignItems: "center", gap: "0.75rem" }}>
        <SearchInput name={I18N.SEARCH_LABEL} aria-label={I18N.SEARCH_PLACEHOLDER} placeholder={I18N.SEARCH_PLACEHOLDER} />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </FlexRow>
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Spinner />
            <span>Loading payments...</span>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <TableWrapper>
            <Table>
                  <TableHeaderWrapper>
                    <TableHeaderRow>
                      <TableHeader>{I18N.TABLE_HEADER_PAYMENT_ID}</TableHeader>
                      <TableHeader>{I18N.TABLE_HEADER_DATE}</TableHeader>
                      <TableHeader>{I18N.TABLE_HEADER_AMOUNT}</TableHeader>
                      <TableHeader>{I18N.TABLE_HEADER_CUSTOMER}</TableHeader>
                      <TableHeader>{I18N.TABLE_HEADER_CURRENCY}</TableHeader>
                      <TableHeader>{I18N.TABLE_HEADER_STATUS}</TableHeader>
                    </TableHeaderRow>
                  </TableHeaderWrapper>
                  <TableBodyWrapper>
                    {payments.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{new Date(p.date).toLocaleString()}</TableCell>
                        <TableCell>{formatCurrency(p.amount)}</TableCell>
                        <TableCell>{p.customerName}</TableCell>
                        <TableCell>{p.currency}</TableCell>
                        <TableCell>
                          <StatusBadge status={p.status.toLowerCase() as "completed" | "pending" | "failed"}>
                            {p.status}
                          </StatusBadge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBodyWrapper>
                </Table>
          </TableWrapper>

        )}
    </Container>
  );
};