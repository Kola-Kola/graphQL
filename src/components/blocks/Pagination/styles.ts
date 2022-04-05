import styled from "styled-components";
import { bodyBook16 } from "../../utility/typography";
import ButtonSquare from "../ButtonSquare";

export const PaginationInformations = styled.p`
  margin: 0;
  ${bodyBook16}
`;

export const ButtonSquareWithMarginRight = styled(ButtonSquare)`
  margin-right: 8px;
`;

export const Container = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top: 28px;
  padding: 0 28px;

  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    display: none;
  }
`;
