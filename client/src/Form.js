import React, { useState, useEffect } from 'react';
import { Card, Form, FormGroup, Input, Button, Spinner } from 'reactstrap';

const CustomForm = () => {
  const [fileData, setFile] = useState({});
  const [sendData, setSendData] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(evt) {
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
      setIsLoading(!isLoading);
      fetch('http://localhost:3000/file', {
        method: 'POST',
        body: data
      })
        .then(response => response.json())
        .then(data => data)
        .then(d => {
          if (!!Object.keys(d.meta).length) {
            setIsLoading(false);
          }
        });
    }
  }, [sendData]);

  console.log(Object.keys(fileData));
  return (
    <Card>
      {!isLoading ? (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input type="file" onChange={handleChange} />
            <Button color="success" type="submit" onSubmit={handleSubmit}>
              Enviar!
            </Button>
          </FormGroup>
        </Form>
      ) : (
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="danger" />
      )}
    </Card>
  );
};

export default CustomForm;
