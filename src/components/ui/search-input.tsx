import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import type { FC } from "react";

type SearchInputProps = {
  inputProps: React.ComponentProps<"input">;
  totalResults?: number;
};

const SearchInput: FC<SearchInputProps> = (props) => {
  const { inputProps, totalResults } = props;
  return (
    <InputGroup className="rounded-xl">
      <InputGroupInput {...inputProps} />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {!!totalResults && totalResults > 0 && (
        <InputGroupAddon align="inline-end">
          {totalResults} results
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};

export default SearchInput;
