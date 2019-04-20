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
              meta: { filteredData },
              path
            } = data;
            setDataProcessed({ filterData: filteredData, path });
          }
        });
    }
  }, [sendData]);

  console.log(Object.keys(fileData));
  return dataProcessed !== null ? (
    <CustomTable data={dataProcessed} />
  ) : !isLoading ? (
    <Form onSubmit={handleSubmit} className="custom-form d-flex flex-column">
      <h3>Cargue datos</h3>
      <FormGroup className="d-flex justify-content-center">
        <Input type="file" onChange={handleChange} />
      </FormGroup>
      <FormGroup className="d-flex justify-content-center">
        <Button className="custom-button" color="success" type="submit" onSubmit={handleSubmit}>
          Enviar!
        </Button>
      </FormGroup>
    </Form>
  ) : (
    <div className="custom-spinner">
      <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="danger" />
      <p>Cargando...</p>
    </div>
  );
};

export default CustomForm;
