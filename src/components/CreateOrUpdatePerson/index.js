import React from 'react';
import { Alert } from '../../components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { string, array } from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components'; 
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { withRouter } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

const Col = styled.div`
  display: flex;
  flex-direction: column;
`
const Box = styled.div`
  border: 1px solid #3F51B5;
  margin: 10px 23px 10px 8px;
  padding: 15px 15px 10px 15px;
  border-radius: 7px;
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
  console.log(sectorList);
  console.log('cara');
  return (
    <div>
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
            <RadioBox>
              <Company>
                <h6>Empresa:</h6>
                <RadioGroup aria-label="position" name="position" value={values.personEmpresa} onChange={handleChange('personEmpresa')}>
                  {
                    companyList.map((item) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.id}
                        control={<Radio color="primary" />}
                        label={item.attributes.name}
                        labelPlacement="end"
                        checked={values.personEmpresa == item.id}
                    />
                    ))
                  }
                </RadioGroup>
              </Company>
              <Sector>
                <h6>Setor:</h6>
                <RadioGroup aria-label="position" name="position" value={values.personSetor} onChange={handleChange('personSetor')}>
                  {
                    sectorList.map((item) => (
                      <FormControlLabel
                        key={item.id}
                        value={item.id}
                        control={<Radio color="primary" />}
                        label={item.attributes.name}
                        labelPlacement="end"
                        checked={values.personSetor == item.id}
                    />
                    ))
                  }
                </RadioGroup>
              </Sector>
            </RadioBox>
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
