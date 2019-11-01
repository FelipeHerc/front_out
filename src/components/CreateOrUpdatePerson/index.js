import React from 'react';
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
    margin: theme.spacing(1),
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
  select: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  textFieldBig: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  label: {
    marginTop: 144,
    marginLeft: 7,    
  },
  label2: {
    marginTop: 144,
    marginLeft: 224,    
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const CreateOrUpdatePerson = ({ label, nome, cpf, email, empresa, setor, companyList, sectorList }) => {
  const classes = useStyles();
  const [openEmpresa, setOpenEmpresa] = React.useState(false);
  const [openSector, setOpenSector] = React.useState(false);
  const [values, setValues] = React.useState({
    personNome: nome,
    personCpf: cpf,
    personEmail: email,
    personEmpresa: empresa,
    personSetor: setor,
  });

  console.log(values);
  
  const handleChange = normalize => event => {
    setValues({ ...values, [normalize]: event.target.value });
  };

  const handleCloseEmpresa = () => {
    setOpenEmpresa(false);
  };

  const handleOpenEmpresa = () => {
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
              onChange={handleChange('cpf')}
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
            <InputLabel className={classes.label} id="demo-controlled-open-select-label">Empresa</InputLabel>
            <Select
              className={classes.select}
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openEmpresa}
              onClose={handleCloseEmpresa}
              onOpen={handleOpenEmpresa}
              value={values.empresa}
              onChange={handleChange('personEmpresa')}
            >
            { 
              companyList.map((item) => (
                <MenuItem value={item.id}>{item.attributes.name}</MenuItem>
              ))
            }
            </Select>

            <InputLabel className={classes.label2} id="setor">Setor</InputLabel>
            <Select
              className={classes.select}
              labelId="setor"
              id="Setor"
              open={openSector}
              onClose={handleCloseSector}
              onOpen={handleOpenSector}
              value={values.setor}
              onChange={handleChange('personSetor')}
              >
            { 
              sectorList.map((item) => (
                <MenuItem value={item.id}>{item.attributes.name}</MenuItem>
                ))
              }
            </Select>
          </Row>
        </Col>
        <Button
          id="save"
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={() => { console.log('a'); }}
        >
          Save
        </Button>
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

export default CreateOrUpdatePerson;