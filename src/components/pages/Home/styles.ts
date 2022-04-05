import styled from "styled-components";
import { heading32 } from "../../utility/typography";

export const Container = styled.section`
  padding: 48px 84px;

  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    padding: 0;
  }
`;

export const Heading1 = styled.h1`
  margin: 0;
  margin-bottom: 40px;
  ${heading32}
`;

export const Row = styled.div`
  margin-left: 24px;

  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    margin: 0;
    padding: 20px;
  }
`;

export const ContainerFlex = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 14px;
  }

  span {
    margin-left: 8px;
  }
`;

export const ContainerButtonDisplayMoreMobile = styled.div`
  display: none;

  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    display: block;
    width: 100%;
    padding: 40px 20px 57px 20px;
    box-sizing: border-box;
  }
`;

export const ContainerStatus = styled.div`
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    margin-top: 16px;
  }
`;

export const ContainerTextField = styled.div`
  margin-bottom: 40px;
  width: 100%;
  max-width: 500px;
`;
