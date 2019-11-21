import React, { useState }  from 'react';
import { string } from 'prop-types';
import styled from 'styled-components'; 
import { FaTag } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdLaptopWindows } from "react-icons/md";
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import { CreateOrUpdateNotebook } from '../../components'

const ButtonBox = styled.div`
  margin-left: 10px;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 75vw;
  margin: 10px;
  padding: 10px 15px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: space-between;
`;

const BrandIcon = styled(FaBox)`
  padding-left: 1px;
  margin-right: 10px;
  width: 14px;
  height: 14px;
`;

const ModelIcon = styled(MdLaptopWindows)`
  padding-bottom: 1px;
  margin-right: 10px;
  width: 16px;
  height: 16px;
`;

const StatusIcon = styled(FaTag)`
  margin-left: 10px;
  margin-right: 10px;
  width: 12px;
  height: 12px;
`;

const Imei1Icon = styled(FaLock)`
  margin-left: 10px;
  margin-right: 10px;
  width: 12px;
  height: 12px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding: auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: Row;
  align-items: center;
`;

const Text = styled.div`
  margin: 0 10px 0 0;
`;

const NotebookCard = ({ id, brand, model, serialNumber, statId, stat, statList }) => {
  const [open, setOpen] = useState(0);
  return (
    <StyledBox>
      <Row>
        <Col>
          <Row>
            <BrandIcon/>
            <Text><strong>Marca:</strong> {brand}</Text> 
            <StatusIcon/>
            <Text><strong>Status:</strong> {stat}</Text>
          </Row>
          <Row>
            <ModelIcon/>
            <Text><strong>Modelo:</strong> {model}</Text>
            <Imei1Icon/>
            <Text><strong>Imei 1:</strong> {serialNumber}</Text>
          </Row>
        </Col>
      </Row>
      <Row>
      <ButtonBox>
          <Button variant="contained" color="primary" size="small" onClick={
          () => {
            setOpen(true)
          }
          } >
            Editar
          </Button>
        </ButtonBox>
        <ButtonBox>
          <Button variant="contained" color="secondary" size="small">
            Deletar
          </Button>
        </ButtonBox>
        <Modal open={Boolean(open)} onClose={() => setOpen(false)} center>
          <CreateOrUpdateNotebook
            notebookId={id} 
            isEditing={true} 
            label="Criar Smartphone" 
            statList={statList}
            brand={brand}
            model={model}
            serialNumber={serialNumber}
            statId={statId}
          />
        </Modal>
      </Row>
    </StyledBox>
  )

}

NotebookCard.propTypes = {
  brand: string.isRequired,
  model: string.isRequired,
  serialNumber: string.isRequired,
  stat: string.isRequired
};

export default NotebookCard;