import { IProps } from "./types";
import { ReactComponent as Previous } from "../../assets/previous.svg";
import { ReactComponent as Next } from "../../assets/next.svg";
import ButtonSquare from "../../controls/ButtonSquare";
import {
  Container,
  PaginationInformations,
  ButtonSquareWithMarginRight,
} from "./styles";

const Pagination = ({
  currentPage,
  totalElements,
  numberOfElements,
  onChangePagination,
}: IProps) => {
  const onChange = (state: string) => {
    const current = state === "previous" ? currentPage - 1 : currentPage + 1;

    if (current < 1) {
      return onChangePagination(1);
    }

    if (current > numberOfElements / 5) {
      onChangePagination(numberOfElements / 5);
    }

    onChangePagination(current);
  };
  return (
    <Container>
      <PaginationInformations data-testid="PaginationInformations">
        {currentPage} — {totalElements} of {numberOfElements}
      </PaginationInformations>
      <div>
        {numberOfElements / 5 > 1 && (
          <ButtonSquareWithMarginRight
            data-testid="ButtonSquareWithMarginRight"
            onClick={() => onChange("previous")}
          >
            <Previous />
          </ButtonSquareWithMarginRight>
        )}
        {totalElements === 5 && (
          <ButtonSquare
            data-testid="ButtonSquare"
            onClick={() => onChange("next")}
          >
            <Next />
          </ButtonSquare>
        )}
      </div>
    </Container>
  );
};

export default Pagination;
