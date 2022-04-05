export interface IProps {
  currentPage: number;
  totalElements: number;
  numberOfElements: number;
  onChangePagination: (currentPage: number) => void;
}
