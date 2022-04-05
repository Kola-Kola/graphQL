import styled from "styled-components";

export const TableContainer = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
export const TableHeader = styled.thead`
  background: ${({ theme }) => theme.colors.neutral4Hover};
  height: 64px;
  border-radius: 8px;
`;
export const TableBody = styled.tbody`
  &:before {
    line-height: 24px;
    content: ".";
    display: block;
  }
`;
export const TableRow = styled.tr`
  text-align: left;
  height: 64px;
  transition: all ease-in-out 0.3s;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral4Hover} !important;
  }

  &:hover {
    td {
      background: ${({ theme }) => theme.colors.neutral4Hover} !important;
    }
  }
`;
export const TableHead = styled.th`
  color: ${({ theme }) => theme.colors.neutral2};
  text-align: left;
  font-family: "Maison Neue", arial;
`;

export const TableCell = styled.td`
  font-size: 16px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.neutral1};
  font-family: "Maison Neue", arial;
  transition: all ease-in-out 0.3s;
`;

export const TableActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 74px;
`;

export const TableActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  transition: all ease-in-out 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral4Hover};
  }
`;

export const TableCheckboxHeaderContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 48px;
  margin-left: 20px;
`;

export const Row = styled.p`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;
