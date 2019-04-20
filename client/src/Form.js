import React, { useState, useEffect } from 'react';
import { Card, Form, FormGroup, Input, Button, Spinner } from 'reactstrap';
import CustomTable from './CustomTable';

const CustomForm = () => {
  const [fileData, setFile] = useState({});
  const [sendData, setSendData] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataProcessed, setDataProcessed] = useState(null);

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
        .then(data => {
          if (!!Object.keys(data.meta).length) {
            setIsLoading(false);
            console.log('d:::', data);
            const {
              meta: { filteredData }
            } = data;
            setDataProcessed(filteredData);
          }
        });
    }
  }, [sendData]);

  console.log(Object.keys(fileData));
  return dataProcessed !== null ? (
    <CustomTable data={dataProcessed} />
  ) : !isLoading ? (
    <Form onSubmit={handleSubmit} className="custom-form">
      <FormGroup>
        <Input type="file" onChange={handleChange} />
        <Button color="success" type="submit" onSubmit={handleSubmit}>
          Enviar!
        </Button>
      </FormGroup>
    </Form>
  ) : (
    <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="danger" />
  );
};

export default CustomForm;
