import styled from "styled-components";

export const ButtonContainer = styled.button`
  align-items: center;
  appearance: none;
  background-color: ${({ theme }) => theme.colors?.accent1};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  justify-content: center;
  padding: 0;
  vertical-align: middle;
  width: 32px;

  &:focus {
    outline: 1px dashed ${({ theme }) => theme.colors?.accent1};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent1Hover};
  }
`;