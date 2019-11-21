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

const CreateOrUpdateNotebook = ({ notebookId, isEditing, label, brand, model, serialNumber, statList, statId }) => {
  const classes = useStyles();
  const [saved, setSaved] = React.useState(false);
  const [emptyField, setEmptyField] = React.useState(false);
  const [saveError, setSaveError] = React.useState(false);
  const [values, setValues] = React.useState({
    notebookBrand: brand               || '',
    notebookModel: model               || '',
    notebookSerialNumber: serialNumber || '',
    notebookStat: statId               || '',
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
              id="brand"
              label="Marca"
              className={classes.textField.toString()}
              value={values.notebookBrand}
              onChange={handleChange('notebookBrand')}
              margin="normal"
            />
            <TextField
              id="model"
              label="Modelo"
              className={classes.textField.toString()}
              value={values.notebookModel}
              onChange={handleChange('notebookModel')}
              margin="normal"
            />
          </Row>

          <Row>
            <TextField     
              id="serialNumber"
              label="Número de série"
              className={classes.textFieldBig.toString()}
              value={values.notebookSerialNumber}
              onChange={handleChange('notebookSerialNumber')}
              margin="normal"
            />
          </Row>
          
          <StatBox>
            <h4>Status:</h4>
            <Row>
              <RadioGroup aria-label="position" name="position" value={values.notebookStat} onChange={handleChange('notebookStat')}>
                {
                  statList.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.id}
                      control={<Radio color="primary" />}
                      label={item.attributes.description}
                      labelPlacement="end" // eslint-disable-next-line
                      checked={values.notebookStat == item.id} 
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
            if (values.notebookBrand        === undefined ||
                values.notebookModel        === undefined ||
                values.notebookSerialNumber === undefined ||
                values.notebookStat         === undefined ||
                values.notebookBrand        === '' ||
                values.notebookModel        === '' ||
                values.notebookSerialNumber === '' ||
                values.notebookStat         === ''
                ){
              setSaved(false);
              setEmptyField(true);
              return;
            }
            if (!isEditing){
              axios.post(`${config.REACT_APP_BASE_URL}/notebooks`,
              {  
                "brand": values.notebookBrand,
                "model": values.notebookModel,
                "serialNumber": values.notebookSerialNumber,
                "stat_id": values.notebookStat,
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
              console.log(notebookId);
              axios.patch(`${config.REACT_APP_BASE_URL}/notebooks/${notebookId}`,
              {  
                "brand": values.notebookBrand,
                "model": values.notebookModel,
                "serialNumber": values.notebookSerialNumber,
                "stat_id": values.notebookStat,
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

CreateOrUpdateNotebook.propTypes = {
  brand: string,
  model: string,
  serialNumber: string,
  statList: array,
  label: string,
}
export default withRouter(CreateOrUpdateNotebook);
