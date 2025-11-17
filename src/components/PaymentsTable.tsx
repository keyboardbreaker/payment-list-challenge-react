import { Table, TableHeaderWrapper, TableHeaderRow, TableHeader, TableBodyWrapper, TableRow, TableCell, StatusBadge } from "./components";
import { Payment } from "../types/payment";
import { I18N } from "../constants/i18n";
import { formatCurrency } from "../utils/helpers";

interface PaymentsTableProps {
  payments: Payment[];
}

export const PaymentsTable = ({ payments }: PaymentsTableProps) => {
  return (
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
  );
};
