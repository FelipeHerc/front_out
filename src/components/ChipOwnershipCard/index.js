import React, { useState }  from 'react';
import { object } from 'prop-types';
import styled from 'styled-components'; 
import { FaTag } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdPhonelinkSetup } from "react-icons/md";
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import { CreateOrUpdateCel } from '../../components'
import { FaSimCard } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

const ButtonBox = styled.div`
  margin-left: 10px;
`;

const PersonIcon = styled(FaUserTie)`
  width: 48px;
  height: 48px;
  fill: #ccc;
  position: relative;
  left: -10px;
`;

const KeyIcon = styled(FaKey)`
  margin-right: 10px;
  width: 12px;
  height: 12px;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 79vw;
  margin: 10px;
  padding: 10px 15px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: space-between;
`;

const ChipIcon = styled(FaSimCard)`
  width: 48px;
  height: 48px;
  fill: #ccc;
  position: relative;
  left: -10px;
`;

const BrandIcon = styled(FaBox)`
  margin-right: 10px;
  width: 12px;
  height: 12px;
`;

const ModelIcon = styled(MdPhonelinkSetup)`
  margin-right: 10px;
  width: 12px;
  height: 12px;
`;

const TinyPersonIcon = styled(FaUserAlt)`
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

const ChipOwnershipCard = ({ key, chip, owner, companyList, sectorList }) => {
  const [open, setOpen] = useState(0);
  return (
    <StyledBox>
      <Row>
      <ChipIcon />
        <Col>
          <Row>
            <BrandIcon />
            <Text><strong>Marca:</strong> {chip.attributes.operator}</Text>
          </Row>
          <Row>
            <ModelIcon />
            <Text><strong>Modelo:</strong> {chip.attributes.ddd}</Text>
            <ModelIcon />
            <Text><strong>Modelo:</strong> {chip.attributes['phone-number']}</Text>
          </Row>
        </Col>
      </Row>
      <Row>
        <PersonIcon />
        <Col>
          <Row>
            <TinyPersonIcon />
            <Text><strong>Nome:</strong> {owner.name}</Text>
          </Row>
          <Row>
            <KeyIcon />
            <Text><strong>Cpf:</strong> {owner.cpf}</Text>
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
        {/* <Modal open={Boolean(open)} onClose={() => setOpen(false)} center>
          <CreateOrUpdateCel 
            isEditing={false} 
            label="Criar Smartphone" 
            statList={statList}
            brand={brand}
            model={model}
            imei1={imei1}
            imei2={imei2}
            statId={statId}
          />
        </Modal> */}
      </Row>
    </StyledBox>
  )

}

ChipOwnershipCard.propTypes = {
  owner: object,
  chip: object,
  companyList: object,
  sectorList: object,
};

export default ChipOwnershipCard;