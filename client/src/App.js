import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CustomForm from './Form';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <CustomForm />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
