import * as React from "react";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Table from "../../blocks/Table";
import { GET_PEOPLES_QUERY } from "./queries";
import { ReactComponent as Protected } from "../../assets/protected.svg";
import { ReactComponent as Vulnerable } from "../../assets/vulnerable.svg";
import { IPeople } from "./types";
import TextField from "../../controls/TextField";
import Pagination from "../../blocks/Pagination";
import { history } from "../../utility/history";
import ButtonSquare from "../../controls/ButtonSquare";
import {
  Container,
  Heading1,
  Row,
  ContainerFlex,
  ContainerButtonDisplayMoreMobile,
  ContainerStatus,
  ContainerTextField,
} from "./styles";

const renderStatus = (status: string) => {
  if (!status) return null;

  return (
    <ContainerStatus>
      <ContainerFlex>
        {status === "PROTECTED" ? (
          <>
            <Protected />
            <span style={{ color: "#0C806B" }}>Protected</span>
          </>
        ) : (
          <>
            <Vulnerable />
            <span style={{ color: "#C70808" }}>Vulnerable</span>
          </>
        )}
      </ContainerFlex>
    </ContainerStatus>
  );
};

const getDataPeoples = (start: number, end: number, data: any) => {
  return data
    ?.map((item: IPeople) => ({
      "Created At": format(new Date(item.createdAt), "dd MMM, HH:MM"),
      Name: (
        <ContainerFlex>
          <img alt="media" src={item.profilePicture} />
          {item.fullName}
        </ContainerFlex>
      ),
      Id: item.id,
      Status: renderStatus(item.status),
      withActions: true,
    }))
    .slice(start, end);
};

const HomePage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [dataPeoples, setDataPeoples] = React.useState<any[] | null>(null);
  const [value, setValue] = React.useState("");

  const navigate = useNavigate();
  const historyPath = history;

  const { data } = useQuery(GET_PEOPLES_QUERY, {
    variables: {
      filter: value,
    },
  });

  React.useEffect(() => {
    const params = new URLSearchParams(historyPath.location.search);

    if (params.get("page")) {
      setCurrentPage(parseInt(params.get("page") as string));
    }

    if (params.get("search")) {
      setValue(params.get("search") as string);
    }
  }, [historyPath.location.search]);

  React.useEffect(() => {
    const start = 5 * (currentPage - 1);
    const end = start + 5;

    setDataPeoples(getDataPeoples(start, end, data?.people));
  }, [currentPage, data]);

  const onChangeTextField = (event: any) => {
    setValue(event.target.value);
    setCurrentPage(1);

    if (event.target.value.length === 0) {
      return navigate(`?page=${currentPage}`);
    }

    return navigate(`?page=${currentPage}&search=${event.target.value}`);
  };

  return (
    <Container>
      <Row>
        <Heading1>People</Heading1>
        <ContainerTextField>
          <TextField
            style={{ width: "100%" }}
            placeholder="Search..."
            value={value}
            onChange={(event) => onChangeTextField(event)}
          />
        </ContainerTextField>
      </Row>
      {dataPeoples && dataPeoples.length > 0 && (
        <Table body={dataPeoples} withSelectedChoice={true} />
      )}
      {dataPeoples && (
        <Pagination
          currentPage={currentPage}
          totalElements={dataPeoples.length}
          numberOfElements={data?.people?.length}
          onChangePagination={(currentPageChange) => {
            setCurrentPage(currentPageChange);
            navigate(`?page=${currentPageChange}`);
          }}
        />
      )}

      <ContainerButtonDisplayMoreMobile>
        <ButtonSquare
          style={{
            width: "100%",
            height: "64px",
          }}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <p>Afficher Plus</p>
        </ButtonSquare>
      </ContainerButtonDisplayMoreMobile>
    </Container>
  );
};

export default HomePage;
