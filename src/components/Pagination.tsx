
import { I18N } from "../constants/i18n";
import { PaginationButton, PaginationRow } from "./components";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({ page, pageSize, total, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <PaginationRow>
      <PaginationButton
        disabled={page === 1}
        onClick={handlePrevious}
      >
        {I18N.PREVIOUS_BUTTON}
      </PaginationButton>

      <span>
        {I18N.PAGE_LABEL} {page} / {totalPages}
      </span>

      <PaginationButton
        disabled={page === totalPages}
        onClick={handleNext}
      >
        {I18N.NEXT_BUTTON}
      </PaginationButton>
    </PaginationRow>
  );
};
