import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Button, Spinner } from 'reactstrap';
import CustomTable from './CustomTable';

const { REACT_APP_BACKEND_URL } = process.env;

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

  function resetApp() {
    setDataProcessed(null);
  }

  useEffect(() => {
    if (!!Object.keys(fileData).length) {
      setIsLoading(!isLoading);
      fetch(`${REACT_APP_BACKEND_URL}/file`, {
        method: 'POST',
        body: data
      })
        .then(response => response.json())
        .then(data => {
          if (!!Object.keys(data.meta.filteredData).length) {
            setIsLoading(false);
            console.log('d:::', data);
            const {
              meta: {
                filteredData,
                reportCreated: { fileRoute }
              }
            } = data;
            setDataProcessed({ filterData: filteredData, fileRoute });
          }
        });
    }
  }, [sendData]);

  console.log(Object.keys(fileData));
  return dataProcessed !== null ? (
    <CustomTable data={dataProcessed} resetApp={resetApp} />
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
