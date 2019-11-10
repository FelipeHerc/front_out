import React from 'react';
import { Alert } from '../../components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { string, array } from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components'; 
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

const StatBox = styled.div`
  border: 1px solid #3F51B5;
  margin: 10px 23px 10px 8px;
  padding: 15px 15px 10px 15px;
  border-radius: 7px;
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
    width: 400,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const CretaOrUpdateChip = ({ chipId, isEditing, label, operator, ddd, phoneNumber, value, statList, statId }) => {
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
  });

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
          
          <StatBox>
            <h4>Status:</h4>
            <Row>
              <RadioGroup aria-label="position" name="position" value={values.chipStat} onChange={handleChange('chipStat')}>
                {
                  statList.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.id}
                      control={<Radio color="primary" />}
                      label={item.attributes.description}
                      labelPlacement="end" // eslint-disable-next-line
                      checked={values.chipStat == item.id}
                  />
                  ))
                }
              </RadioGroup>
            </Row>
          </StatBox>
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
                values.chipOperator    === '' ||
                values.chipDDD         === '' ||
                values.chipPhoneNumber === '' ||
                values.chipValue       === '' ||
                values.chipStat        === ''
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

CretaOrUpdateChip.propTypes = {
  operator: string,
  ddd: string,
  phoneNumber: string,
  value: string,
  statList: array,
  label: string,
}
export default withRouter(CretaOrUpdateChip);
