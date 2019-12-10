import React from 'react';
import { Alert } from '../../components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { string, array } from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components'; 
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { withRouter } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import config from '../../utils/config';

const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Sector = styled.div`
  margin: 20px 0 0 20px;

`

const Company = styled.div`
  margin: 20px 20px 0 0;
`

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 25
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  company: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingTop: 16,
    width: 200,
  },
  sector: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingTop: 16,
    width: 200,
  },
  textFieldBig: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 415,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const CreateOrUpdatePerson = ({ personId, isEditing, label, nome, cpf, email, empresa, setor, city, companyList, sectorList, cityList }) => {
  const classes = useStyles();
  const [saved, setSaved] = React.useState(false);
  const [emptyField, setEmptyField] = React.useState(false);
  const [saveError, setSaveError] = React.useState(false);

  const [values, setValues] = React.useState({
    personNome: nome         || '',
    personCpf: cpf           || '',
    personEmail: email       || '',
    personSetor: setor       || '',
    personEmpresa: empresa   || '',
    personCity: city         || '',
  });

  const handleChange = normalize => event => {
    setValues({ ...values, [normalize]: event.target.value });
  };
  console.log(values);
  return (
    <div>
      <h4>{label}</h4>
      <FormControl className={classes.formControl.toString()}>
        <Col>
          <Row>
            <TextField
              id="nome"
              label="Nome"
              className={classes.textFieldBig.toString()}
              value={values.personNome}
              onChange={handleChange('personNome')}
              margin="normal"
            />
          </Row>

          <Row>
            <TextField
              inputProps={{
                maxLength: 14,
              }}        
              id="cpf"
              label="Cpf"
              className={classes.textField.toString()}
              value={values.personCpf}
              onChange={handleChange('personCpf')}
              margin="normal"
            />
            <TextField
              id="email"
              label="Email"
              className={classes.textField.toString()}
              value={values.personEmail}
              onChange={handleChange('personEmail')}
              margin="normal"
            />
          </Row>
          <FormControl className={classes.formControl}>
            <InputLabel id="city-select">Cidade</InputLabel>
            <Select
              labelId="city-select"
              id="city-select"
              value={values.personCity}
              onChange={handleChange('personCity')}
            >
              {
                cityList.map((item) => (
                  <MenuItem 
                    key={item.id} 
                    value={item.id}>
                      {item.attributes.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="company-select">Empresa</InputLabel>
            <Select
              labelId="company-select"
              id="company-select"
              value={values.personEmpresa}
              onChange={handleChange('personEmpresa')}
            >
              {
                companyList.map((item) => (
                  <MenuItem 
                    key={item.id} 
                    value={item.id}>
                      {item.attributes.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="sector-select">Setor</InputLabel>
            <Select
              labelId="sector-select"
              id="sector-select"
              value={values.personSetor}
              onChange={handleChange('personSetor')}
            >
              {
                sectorList.map((item) => (
                  <MenuItem 
                    key={item.id} 
                    value={item.id}>
                      {item.attributes.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Col>

        <Button
          id="save"
          variant="contained"
          color="primary"
          size="large"
          className={classes.button.toString()}
          startIcon={<SaveIcon />}
          onClick={() => {
            if (values.personNome    === undefined ||
                values.personCpf     === undefined ||
                values.personEmail   === undefined ||
                values.personSetor   === undefined ||
                values.personEmpresa === undefined ||
                values.personCity    === undefined ||
                values.personNome    === '' ||
                values.personCpf     === '' ||
                values.personEmail   === '' ||
                values.personSetor   === '' ||
                values.personEmpresa === '' ||
                values.personCity    === ''
                ){
              setSaved(false);
              setEmptyField(true);
              return;
            }
            if (!isEditing){
              axios.post(`${config.REACT_APP_BASE_URL}/owners`,
              {  
                'name': values.personNome,
                'cpf': values.personCpf,
                'email': values.personEmail,
                'sector_id': values.personSetor,
                'company_id': values.personEmpresa,
                'city_id': values.personCity
              }).then(function(response){
                setSaved(true);
                setSaveError(false);
                setEmptyField(false);
              }).catch(function (error) {
                setSaved(false);
                setSaveError(true);
                setEmptyField(false);
              });
            }
            else{
              axios.patch(`${config.REACT_APP_BASE_URL}/owners/${personId}`,
              {  
                'name': values.personNome,
                'cpf': values.personCpf,
                'email': values.personEmail,
                'sector_id': values.personSetor,
                'company_id': values.personEmpresa,
                'city_id': values.personCity
              }).then(function(response){
                setSaved(true);
                setSaveError(false);
                setEmptyField(false);
              }).catch(function (error) {
                setSaved(false);
                setSaveError(true);
                setEmptyField(false);
              });
            }
          }}
        >
          Salvar
        </Button>
        { saved && !saveError && (<Alert text="Salvo com sucesso!" />)}
        { !saved && saveError && (<Alert text="Erro" />)}
        { emptyField && (<Alert text="Todos os campos devem ser preenchidos!" />)}
        </FormControl>
    </div>
  );
}

CreateOrUpdatePerson.propTypes = {
  nome: string,
  cpf: string,
  empresa: string,
  setor: string,
  company: array,
  companyList: array,
  SectorList: array,
}
export default withRouter(CreateOrUpdatePerson);
