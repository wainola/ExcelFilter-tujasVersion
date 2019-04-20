import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';

const CustomTable = ({ data }) => {
  console.log('data::', data);
  const headers = data[0];
  const rest = data.filter((_, idx) => idx !== 0);

  console.log('rest', rest);
  return (
    <Container>
      <Row>
        <Col>
          <Table className="table-bordered table-hover table-responsive">
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
    </Container>
  );
};

export default CustomTable;
