import { render, screen } from "@testing-library/react"; // (or /dom, /vue, ...)
import Table from "./index";
import renderer from "react-test-renderer";
import Theme from "../../layout/Theme";
import "jest-styled-components";

const TableData = [
  { firstName: "Jonathan", lastName: "IBOR" },
  { firstName: "Jean", lastName: "Dupond" },
];

describe("Table Component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Theme>
          <Table body={TableData} withSelectedChoice={false} />
        </Theme>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should render Table with partial features", () => {
    render(
      <Theme>
        <Table body={TableData} withSelectedChoice={false} />
      </Theme>
    );

    expect(screen.getByTestId("TableContainer")).toBeInTheDocument();
    expect(screen.getByTestId("TableHeader")).toBeInTheDocument();
    expect(screen.getByTestId("TableRow")).toBeInTheDocument();

    expect(screen.getByTestId("TableHead__0")).toBeInTheDocument();
    expect(screen.getByTestId("TableHead__1")).toBeInTheDocument();
    expect(screen.queryByTestId("TableHead__2")).not.toBeInTheDocument();

    expect(screen.getByTestId("TableBody")).toBeInTheDocument();
    expect(screen.getByTestId("TableRow__0")).toBeInTheDocument();
    expect(screen.getByTestId("TableRow__1")).toBeInTheDocument();
    expect(screen.queryByTestId("TableRow__2")).not.toBeInTheDocument();
  });
});
