import { render, screen, fireEvent } from "@testing-library/react"; // (or /dom, /vue, ...)
import Pagination from "./index";
import renderer from "react-test-renderer";
import Theme from "../../layout/Theme";
import "jest-styled-components";

describe("Pagination Component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Theme>
          <Pagination
            currentPage={1}
            totalElements={5}
            numberOfElements={50}
            onChangePagination={() => {}}
          />
        </Theme>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render Pagination with all features", () => {
    render(
      <Theme>
        <Pagination
          currentPage={1}
          totalElements={5}
          numberOfElements={50}
          onChangePagination={() => {}}
        />
      </Theme>
    );

    expect(screen.getByTestId("PaginationInformations")).toBeInTheDocument();
    expect(
      screen.getByTestId("ButtonSquareWithMarginRight")
    ).toBeInTheDocument();
    expect(screen.getByTestId("ButtonSquare")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("ButtonSquare"));
  });

  it("Should render Pagination with partial features", () => {
    render(
      <Theme>
        <Pagination
          currentPage={1}
          totalElements={5}
          numberOfElements={5}
          onChangePagination={() => {}}
        />
      </Theme>
    );

    expect(screen.getByTestId("PaginationInformations")).toBeInTheDocument();
    expect(
      screen.queryByTestId("ButtonSquareWithMarginRight")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("ButtonSquare")).toBeInTheDocument();
  });
});
