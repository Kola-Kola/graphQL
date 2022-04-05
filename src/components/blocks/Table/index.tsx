import * as React from "react";
import Checkbox from "../Checkbox";
import { IProps } from "./types";
import { ReactComponent as Information } from "../../assets/information.svg";
import { ReactComponent as Actions } from "../../assets/actions.svg";
import {
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableActionsContainer,
  TableActions,
  TableCheckboxHeaderContainer,
  Row,
} from "./styles";

import "./index.css";

const Table = ({ body, withSelectedChoice }: IProps) => {
  const [selectedAllRows, setSelectedAllRows] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  let keys = Object.keys(body[0]);

  const borderRadiusRow = (item: string, index: number) => {
    return item === "checkbox"
      ? {
          borderRadius: "10px 0 0 10px",
        }
      : {
          borderRadius: keys.length - 1 === index ? "0 10px 10px 0" : "none",
        };
  };

  if (withSelectedChoice) {
    keys = ["checkbox", ...keys];
  }

  const onSelectAllRows = () => {
    if (selectedRows.length > 0) {
      setSelectedRows([]);
    }

    setSelectedAllRows(!selectedAllRows);
  };

  const onSelectedRow = (element: string) => {
    if (selectedAllRows) {
      setSelectedAllRows(false);
    }

    if (selectedRows.includes(element)) {
      return setSelectedRows(selectedRows.filter((item) => item !== element));
    }

    return setSelectedRows([...selectedRows, element]);
  };

  const tableHeadContent = (item: string) => {
    if (item === "checkbox") {
      return (
        <TableCheckboxHeaderContainer>
          <Checkbox isChecked={selectedAllRows} onChange={onSelectAllRows} />
        </TableCheckboxHeaderContainer>
      );
    }

    if (item === "withActions") {
      return "";
    }

    if (item === "Id") {
      return (
        <Row>
          <Information />
          <span style={{ color: "#050505", marginLeft: "8px" }}>ID</span>
        </Row>
      );
    }

    return item;
  };

  const tableBodyContent = (item: string, id: string, parent: any) => {
    if (item === "checkbox") {
      return (
        <TableCheckboxHeaderContainer>
          <Checkbox
            isChecked={
              selectedRows.includes(`selectedRow__${id}`) || selectedAllRows
            }
            onChange={() => onSelectedRow(`selectedRow__${id}`)}
          />
        </TableCheckboxHeaderContainer>
      );
    }

    if (item === "withActions") {
      return (
        <TableActionsContainer style={{ width: "74px" }}>
          <TableActions>
            <Actions />
          </TableActions>
        </TableActionsContainer>
      );
    }

    return <>{parent[item]}</>;
  };

  return (
    <TableContainer role="table" data-testid="TableContainer">
      <TableHeader data-testid="TableHeader" role="rowgroup">
        <TableRow data-testid="TableRow" role="row">
          {keys.map((item: string, i: number) => (
            <TableHead
              data-testid={`TableHead__${i}`}
              style={borderRadiusRow(item, i)}
              key={`${item}__${i}`}
              role="columnheader"
            >
              {tableHeadContent(item)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody data-testid="TableBody" role="rowgroup">
        {body &&
          body.length &&
          body.map((item: any, i: number) => {
            return (
              <TableRow
                data-testid={`TableRow__${i}`}
                key={`${item}__${i}`}
                role="row"
                style={{
                  background:
                    selectedRows.includes(`selectedRow__${item.Id}`) ||
                    selectedAllRows
                      ? "#f0f0f0"
                      : "white",
                }}
              >
                {keys.map((k: string, j: number) => (
                  <TableCell
                    style={{
                      ...borderRadiusRow(k, j),
                    }}
                    key={k}
                    role="columnheader"
                  >
                    {tableBodyContent(k, item.Id, item)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
      </TableBody>
    </TableContainer>
  );
};

export default Table;
