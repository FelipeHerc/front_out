import React from 'react';
import { Alert } from '../../components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { string, array } from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components'; 
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
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
    width: 400,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const CreateOrUpdatePerson = ({ personId, isEditing, label, nome, cpf, email, empresa, setor, companyList, sectorList }) => {
  const classes = useStyles();
  const [saved, setSaved] = React.useState(false);
  const [emptyField, setEmptyField] = React.useState(false);
  const [saveError, setSaveError] = React.useState(false);
  const [openEmpresa, setOpenEmpresa] = React.useState(false);
  const [openSector, setOpenSector] = React.useState(false);
  const [values, setValues] = React.useState({
    personNome: nome         || '',
    personCpf: cpf           || '',
    personEmail: email       || '',
    personSetor: setor       || '',
    personEmpresa: empresa   || '',
  });

  const handleChange = normalize => event => {
    setValues({ ...values, [normalize]: event.target.value });
  };

  const handleCloseEmpresa = () => {
    setOpenEmpresa(false);
  };

  const handleOpenEmpresa  = () => {
    setOpenEmpresa(true);
  };

  const handleCloseSector = () => {
    setOpenSector(false);
  };

  const handleOpenSector = () => {
    setOpenSector(true);
  };

  return (
    <div>
    {(personId)}
      <h4>{label}</h4>
      <FormControl className={classes.formControl}>
        <Col>
          <Row>
            <TextField
              id="nome"
              label="Nome"
              className={classes.textFieldBig}
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
              className={classes.textField}
              value={values.personCpf}
              onChange={handleChange('personCpf')}
              margin="normal"
            />
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              value={values.personEmail}
              onChange={handleChange('personEmail')}
              margin="normal"
            />
          </Row>
          <Row>
            <FormControl>
              <InputLabel id="company">Empresa</InputLabel>
              <Select
                className={classes.company}
                labelId="company"
                id="company"
                open={openEmpresa}
                onClose={handleCloseEmpresa}
                onOpen={handleOpenEmpresa}
                value={values.empresa}
                onChange={() => handleChange('personEmpresa')}
              >
              { 
                companyList.map((item) => (
                  <MenuItem value={item.id}>{item.attributes.name}</MenuItem>
                ))
              }
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="Setor">Setor</InputLabel>
              <Select
                className={classes.sector}
                labelId="setor"
                id="Setor"
                open={openSector}
                onClose={handleCloseSector}
                onOpen={handleOpenSector}
                value={values.setor}
                onChange={() => handleChange('personSetor')}
                >
              { 
                sectorList.map((item) => (
                  <MenuItem value={item.id}>{item.attributes.name}</MenuItem>
                ))
              }
              </Select>
            </FormControl>
          </Row>
        </Col>
        <Button
          id="save"
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={() => {
            if (values.personNome    === undefined ||
                values.personCpf     === undefined ||
                values.personEmail   === undefined ||
                values.personSetor   === undefined ||
                values.personEmpresa === undefined ||
                values.personNome    === '' ||
                values.personCpf     === '' ||
                values.personEmail   === '' ||
                values.personSetor   === '' ||
                values.personEmpresa === ''
                ){
              setEmptyField(true);
              return;
            }
            if (!isEditing){
              axios.post('http://localhost:3000/owners',
              {  
                'name': values.personNome,
                'cpf': values.personCpf,
                'email': values.personEmail,
                'sector_id': values.personSetor,
                'company_id': values.personEmpresa
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
              axios.patch(`http://localhost:3000/owners/${personId}`,
              {  
                'name': values.personNome,
                'cpf': values.personCpf,
                'email': values.personEmail,
                'sector_id': values.personSetor,
                'company_id': values.personEmpresa
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
