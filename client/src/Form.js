import React, { useState, useEffect } from 'react';
import { Card, Form, FormGroup, Input, Button } from 'reactstrap';

const CustomForm = () => {
  const [fileData, setFile] = useState({});
  const [sendData, setSendData] = useState(false);
  const [data, setData] = useState(null);

  function handleChange(evt) {
    let data = new FormData();
    console.log('file', evt.target.files);
    setFile({
      file: evt.target.files[0],
      filename: evt.target.files[0].name
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    let data = new FormData();
    data.append('file', fileData.file);
    data.append('name', fileData.name);
    setSendData(!sendData);
    setData(data);
  }

  useEffect(() => {
    if (!!Object.keys(fileData).length) {
      fetch('http://localhost:3000/file', {
        method: 'POST',
        body: data
      })
        .then(response => response.json())
        .then(d => console.log('d:', d));
    }
  }, [sendData]);

  console.log(Object.keys(fileData));
  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input type="file" onChange={handleChange} />
          <Button color="success" type="submit" onSubmit={handleSubmit}>
            Enviar!
          </Button>
        </FormGroup>
      </Form>
    </Card>
  );
};

export default CustomForm;
