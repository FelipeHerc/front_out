import React from 'react';
import { Alert } from '../../components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { string, array, integer } from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components'; 
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SaveIcon from '@material-ui/icons/Save';

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

const CreateOrUpdateCel = ({ celId, isEditing, label, brand, model, imei1, imei2, statList, statId }) => {
  const classes = useStyles();
  const [saved, setSaved] = React.useState(false);
  const [emptyField, setEmptyField] = React.useState(false);
  const [saveError, setSaveError] = React.useState(false);
  const [values, setValues] = React.useState({
    celBrand: brand || '',
    celModel: model || '',
    celImei1: imei1 || '',
    celImei2: imei2 || '',
    celStat: statId || '',
  });

  const handleChange = normalize => event => {
    setValues({ ...values, [normalize]: event.target.value });
  };

  return (
    <div>
      <h4>{label}</h4>
      <FormControl className={classes.formControl}>
        <Col>
          <Row>
            <TextField
              id="brand"
              label="Marca"
              className={classes.textField}
              value={values.celBrand}
              onChange={handleChange('celBrand')}
              margin="normal"
            />
            <TextField
              id="model"
              label="Modelo"
              className={classes.textField}
              value={values.celModel}
              onChange={handleChange('celModel')}
              margin="normal"
            />
          </Row>

          <Row>
            <TextField     
              id="imei1"
              label="Imei 1"
              className={classes.textFieldBig}
              value={values.celImei1}
              onChange={handleChange('celImei1')}
              margin="normal"
            />
          </Row>
          
          <Row>
            <TextField    
              id="imei2"
              label="Imei 2"
              className={classes.textFieldBig}
              value={values.celImei2}
              onChange={handleChange('celImei2')}
              margin="normal"
            />
          </Row>
          
          <StatBox>
            <h4>Status:</h4>
            <Row>
              <RadioGroup aria-label="position" name="position" value={values.celStat} onChange={handleChange('celStat')}>
                {
                  statList.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.id}
                      control={<Radio color="primary" />}
                      label={item.attributes.description}
                      labelPlacement="end"
                      checked={values.celStat == item.id}
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
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={() => {
            if (values.celBrand === undefined ||
                values.celModel === undefined ||
                values.celImei1 === undefined ||
                values.celImei2 === undefined ||
                values.celStat  === undefined ||
                values.celBrand === '' ||
                values.celModel === '' ||
                values.celImei1 === '' ||
                values.celImei2 === '' ||
                values.celStat  === ''
                ){
              setEmptyField(true);
              return;
            }
            if (!isEditing){
              axios.post('http://localhost:3000/cels',
              {  
                "brand": values.celBrand,
                "model": values.celModel,
                "imei1": values.celImei1,
                "imei2": values.celImei2,
                "stat_id": values.celStat,
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
              axios.patch(`http://localhost:3000/cels/${celId}`,
              {  
                "brand": values.celBrand,
                "model": values.celModel,
                "imei1": values.celImei1,
                "imei2": values.celImei2,
                "stat_id": values.celStat,
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

CreateOrUpdateCel.propTypes = {
  brand: string,
  model: string,
  imei1: string,
  imei2: string,
  statList: array,
  label: string,
}
export default withRouter(CreateOrUpdateCel);