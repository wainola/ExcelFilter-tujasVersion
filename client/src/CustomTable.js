import React from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';

const CustomTable = ({ data, resetApp }) => {
  console.log('data::', data);
  const headers = data.filterData[0];
  const rest = data.filterData.filter((_, idx) => idx !== 0);

  function handleClick(evt) {
    evt.preventDefault();
    console.log('data', data);
    fetch('http://localhost:3000/get-report', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: data.fileRoute })
    })
      .then(response => response.blob())
      .then(file => {
        const url = window.URL.createObjectURL(new Blob([file]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .then(() => resetApp());
  }

  console.log('rest', rest);
  return (
    <Container>
      <Row>
        <Col>
          <Table className="table-bordered table-hover table-responsive custom-table">
            <thead>
              <tr>
                <th>#</th>
                {headers.map((item, idx) => (
                  <th key={idx}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rest.map((item, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  {item.map(e => (
                    <td>{e}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button color="info" type="button" onClick={handleClick}>
            Descargar nuevo archivo
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomTable;
