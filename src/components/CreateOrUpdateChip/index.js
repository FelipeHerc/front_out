import React from 'react';
import { Alert } from '../../components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { string, array } from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components'; 
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import config from '../../utils/config';

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

const CreateOrUpdateChip = ({ chipId, isEditing, label, operator, ddd, phoneNumber, value, statList, statId, costCenter, costCenterList, costCenterId }) => {
  const classes = useStyles();
  const [saved, setSaved] = React.useState(false);
  const [emptyField, setEmptyField] = React.useState(false);
  const [saveError, setSaveError] = React.useState(false);
  const [values, setValues] = React.useState({
    chipOperator: operator || '',
    chipDDD: ddd || '',
    chipPhoneNumber: phoneNumber || '',
    chipValue: value || '',
    chipStat: statId || '',
    chipCostCenter: costCenterId || '',
  });
console.log(values);
  const handleChange = normalize => event => {
    setValues({ ...values, [normalize]: event.target.value });
  };

  return (
    <div>
      <h4>{label}</h4>
      <FormControl className={classes.formControl.toString()}>
        <Col>
          <Row>
            <TextField
              id="operator"
              label="Operadora"
              className={classes.textField.toString()}
              value={values.chipOperator}
              onChange={handleChange('chipOperator')}
              margin="normal"
            />
            <TextField
              id="ddd"
              label="DDD"
              className={classes.textField.toString()}
              value={values.chipDDD}
              onChange={handleChange('chipDDD')}
              margin="normal"
            />
          </Row>

          <Row>
            <TextField     
              id="phoneNumber"
              label="Número"
              className={classes.textFieldBig.toString()}
              value={values.chipPhoneNumber}
              onChange={handleChange('chipPhoneNumber')}
              margin="normal"
            />
          </Row>
          
          <Row>
            <TextField    
              id="value"
              label="Valor"
              className={classes.textFieldBig.toString()}
              value={values.chipValue}
              onChange={handleChange('chipValue')}
              margin="normal"
            />
          </Row>

          <FormControl className={classes.formControl}>
            <InputLabel id="costCenter-select">Centro de custo</InputLabel>
            <Select
              labelId="costCenter-select"
              id="costCenter-select"
              value={values.chipCostCenter}
              onChange={handleChange('chipCostCenter')}
            >
              {
                costCenterList.map((item) => (
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
            <InputLabel id="stat-select">Status</InputLabel>
            <Select
              labelId="stat-select"
              id="stat-select"
              value={values.chipStat}
              onChange={handleChange('chipStat')}
            >
              {
                statList.map((item) => (
                  <MenuItem 
                    key={item.id} 
                    value={item.id}>
                      {item.attributes.description}
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
            if (values.chipOperator    === undefined ||
                values.chipDDD         === undefined ||
                values.chipPhoneNumber === undefined ||
                values.chipValue       === undefined ||
                values.chipStat        === undefined ||
                values.chipCostCenter  === undefined ||
                values.chipOperator    === '' ||
                values.chipDDD         === '' ||
                values.chipPhoneNumber === '' ||
                values.chipValue       === '' ||
                values.chipStat        === '' ||
                values.chipCostCenter  === ''
                ){
              setSaved(false);
              setEmptyField(true);
              return;
            }
            if (!isEditing){
              axios.post(`${config.REACT_APP_BASE_URL}/chips`,
              {  
                "operator": values.chipOperator,
                "ddd": values.chipDDD,
                "phoneNumber": values.chipPhoneNumber,
                "value": values.chipValue,
                "stat_id": values.chipStat,
                "costcenter_id": values.chipCostCenter,
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
              axios.patch(`${config.REACT_APP_BASE_URL}/chips/${chipId}`,
              {  
                "operator": values.chipOperator,
                "ddd": values.chipDDD,
                "phoneNumber": values.chipPhoneNumber,
                "value": values.chipValue,
                "stat_id": values.chipStat,
                "costcenter_id": values.chipCostCenter,
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

CreateOrUpdateChip.propTypes = {
  operator: string,
  ddd: string,
  phoneNumber: string,
  value: string,
  statList: array,
  label: string,
}
export default withRouter(CreateOrUpdateChip);
