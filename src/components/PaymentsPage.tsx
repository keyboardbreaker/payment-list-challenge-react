import { useEffect, useState } from "react";
import { ClearButton, Container, ErrorBox, FlexRow, SearchButton, SearchInput, Select, Spinner, TableWrapper, Title } from './components'
import { Payment } from "../types/payment";
import { I18N } from "../constants/i18n";
import { getPaymentsQuery } from "../api/api-service";
import { CURRENCIES } from "../constants";
import { PaymentsTable } from "./PaymentsTable";
import { Pagination } from "./Pagination";

export const PaymentsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currency, setCurrency] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getPayments = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const result = await getPaymentsQuery({
          search: searchTerm,
          currency,
          page,
          pageSize: 5
        });

        setPayments(result.payments);
        setTotal(result.total);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
  
    getPayments();
  }, [currency, page]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const result = await getPaymentsQuery({
        search: searchTerm,
        page: 1,
        pageSize: 5
      });

      setPayments(result.payments);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setCurrency("");
    setPage(1);
  }

  return (
    <Container>
      <FlexRow>
        <Title>All payments</Title>
      </FlexRow>
      <FlexRow style={{ justifyContent: "flex-start", alignItems: "center", gap: "0.75rem" }}>
        <SearchInput 
          name={I18N.SEARCH_LABEL} 
          aria-label={I18N.SEARCH_PLACEHOLDER} 
          placeholder={I18N.SEARCH_PLACEHOLDER}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm} />
        <Select
          aria-label={I18N.CURRENCY_FILTER_LABEL}
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
        >
          <option value="">Currency</option>
          {CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </Select>
        <SearchButton onClick={handleSearch}>Search</SearchButton>
        {
          searchTerm !== "" && currency !=="" && (
            <ClearButton onClick={handleClear}>{I18N.CLEAR_FILTERS}</ClearButton>
          )
        }
      </FlexRow>
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Spinner />
            <span>Loading payments...</span>
          </div>
        )}
        {error && (
          <ErrorBox>
            {error === "Payment not found"
              ? I18N.PAYMENT_NOT_FOUND
              : error === "Internal Server Error"
              ? I18N.INTERNAL_SERVER_ERROR
              : error}
          </ErrorBox>
        )}
        
        {!loading && !error && (
          <TableWrapper>
            <PaymentsTable payments={payments} />
            <Pagination
              page={page}
              pageSize={5}
              total={total}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </TableWrapper>
        )}
    </Container>
  );
};