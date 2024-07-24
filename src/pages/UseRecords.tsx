import React, { ReactElement } from "react";
import DataTable from "react-data-table-component";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { OperationAPI } from "../network/api";
import Alert from "react-bootstrap/Alert";
import { OperationRecord } from "../network/types";
import { AxiosError } from "axios";

export default function UseRecords() {
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [tableData, setTableData] = React.useState<OperationRecord[]>([]);

  const columns = [
    {
      name: "Id",
      selector: (row: OperationRecord) => row.id,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row: OperationRecord) => row.operationType,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: OperationRecord) => row.amount,
      sortable: true,
    },
    {
      name: "Response",
      selector: (row: OperationRecord) => row.operation_response,
      sortable: true,
    },
    {
      name: "Balance",
      selector: (row: OperationRecord) => row.userBalance,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: OperationRecord) => { return new Date(row.date).toISOString();},
      sortable: true,
    },
    {
      cell:(row : OperationRecord) => <Button size="sm" onClick={(e) => handleDeleteButtonClick(e)} id={row.id.toString()}>Delete</Button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  const handleDeleteButtonClick = (e : React.BaseSyntheticEvent) => {
    OperationAPI.deleteOperation(e.target.id)
    .then( () => {
      OperationAPI.listAll()
      .then( (response) => setTableData(response))
      .catch((e) => setErrorMessage(e.message));
    })
    .catch((e) => setErrorMessage(e.message))
  };

  React.useEffect(() => {
    OperationAPI.listAll()
    .then((data ) => {
      setTableData(data)
    } )
    .catch((e: AxiosError) => {
      const errx = e as AxiosError
      const msg = errx.response !== undefined && errx.response.data !== undefined ? errx.response!.data : errx.message ;
      setErrorMessage(msg as string);
    })
  }, []);

  let errorAlert: ReactElement | undefined;
  if (errorMessage !== "") {
    errorAlert = (
      <Row>
        <Col xl={4}></Col>
        <Col xl={4}>
          <Alert key="danger" variant="danger">
            {errorMessage}
          </Alert>
        </Col>
        <Col xl={4}></Col>
      </Row>
    );
  }
  return (
    <>
      {errorAlert}
      <Row>
        <Col xl={2}></Col>
        <Col xl={8}>
          <DataTable pagination={true} columns={columns} data={tableData} />
        </Col>
        <Col xl={2}></Col>
      </Row>
    </>
  );
}
