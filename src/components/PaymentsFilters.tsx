import { FlexRow, SearchInput, Select, SearchButton, ClearButton } from "./components";
import { I18N } from "../constants/i18n";
import { CURRENCIES } from "../constants";

interface PaymentsFiltersProps {
  searchTerm: string;
  currency: string;
  onSearchTermChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

export const PaymentsFilters = ({
  searchTerm,
  currency,
  onSearchTermChange,
  onCurrencyChange,
  onSearch,
  onClear
}: PaymentsFiltersProps) => {
  const shouldShowClear = searchTerm !== "" || currency !== "";

  return (
    <FlexRow style={{ justifyContent: "flex-start", alignItems: "center", gap: "0.75rem" }}>
      <SearchInput
        name={I18N.SEARCH_LABEL}
        aria-label={I18N.SEARCH_PLACEHOLDER}
        placeholder={I18N.SEARCH_PLACEHOLDER}
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />

      <Select
        aria-label={I18N.CURRENCY_FILTER_LABEL}
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        <option value="">Currency</option>
        {CURRENCIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Select>

      <SearchButton onClick={onSearch}>
        {I18N.SEARCH_BUTTON}
      </SearchButton>

      {shouldShowClear && (
        <ClearButton onClick={onClear}>
          {I18N.CLEAR_FILTERS}
        </ClearButton>
      )}
    </FlexRow>
  );
};
