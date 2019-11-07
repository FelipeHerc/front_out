import React, { useState }  from 'react';
import { string } from 'prop-types';
import styled from 'styled-components'; 
import { MdSettingsInputAntenna } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";
import { FaTag } from "react-icons/fa";
import { FaSimCard } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import { CreateOrUpdateChip } from '../../components'

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

const OperatorIcon = styled(MdSettingsInputAntenna)`
  margin-right: 10px;
  width: 14px;
  height: 14px;
`;

const DDDIcon = styled(MdContactPhone)`
  margin-left: 10px;
  margin-right: 10px;
  width: 17px;
  height: 17px;
  padding-bottom: 3px;
`;

const StatusIcon = styled(FaTag)`
  margin-left: 10px;
  margin-right: 10px;
  width: 12px;
  height: 12px;
`;

const PhoneIcon = styled(FaSimCard)`
  margin-right: 10px;
  width: 14px;
  height: 14px;
`;

const ValueIcon = styled(FaMoneyBill)`
  margin-left: 10px;  
  margin-right: 10px;
  width: 15px;
  height: 15px;
  padding-bottom: 3px;
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

const CelCard = ({ id, operator, ddd, phoneNumber, value, statId, stat, statList }) => {
  const [open, setOpen] = useState(0);
  return (
    <StyledBox>
      <Row>
        <Col>
          <Row>
            <OperatorIcon/>
            <Text><strong>Operadora:</strong> {operator}</Text> 
            <DDDIcon/>
            <Text><strong>DDD:</strong> {ddd}</Text>
            <StatusIcon/>
            <Text><strong>Status:</strong> {stat}</Text>
          </Row>
          <Row>
            <PhoneIcon/>
            <Text><strong>Número:</strong> {phoneNumber}</Text>
            <ValueIcon/>
            <Text><strong>Valor:</strong> {value}</Text>
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
        <Modal open={open} onClose={() => setOpen(false)} center>
          <CreateOrUpdateChip 
            isEditing={false} 
            label="Criar Smartphone" 
            statList={statList}
            operator={operator}
            ddd={ddd}
            phoneNumber={phoneNumber}
            value={value}
            statId={statId}
          />

        </Modal>
      </Row>
    </StyledBox>
  )

}

CelCard.propTypes = {
  operator: string.isRequired,
  ddd: string.isRequired,
  phoneNumber: string.isRequired,
  value: string.isRequired,
  stat: string.isRequired
};

export default CelCard;