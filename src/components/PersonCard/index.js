import React, { useState }  from 'react';
import { string } from 'prop-types';
import styled from 'styled-components'; 
import { FaUserAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { FaIndustry } from "react-icons/fa";
import { FaPaste } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import Button from '@material-ui/core/Button';
import Modal from 'react-responsive-modal';
import { CreateOrUpdatePerson } from '../../components'

const ButtonBox = styled.div`
  margin-left: 10px;
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

const PersonIcon = styled(FaUserAlt)`
  margin-right: 10px;
  width: 12px;
  height: 12px;
`;

const MailIcon = styled(FaMailBulk)`
  margin-left: 10px;
  margin-right: 10px;
  width: 12px;
  height: 12px;
`;

const KeyIcon = styled(FaKey)`
  margin-right: 10px;
  width: 12px;
  height: 12px;
`;

const CompanyIcon = styled(FaIndustry)`
  margin-right: 10px;
  margin-left: 10px;
  width: 12px;
  height: 12px;
`;

const HouseIcon = styled(FaWarehouse)`
  margin-right: 10px;
  margin-left: 10px;
  width: 12px;
  height: 12px;
`;

const SectorIcon = styled(FaPaste)`
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

const PersonCard = ({id, name, cpf, email, company_name, sector_name, companyList, sectorList, cityList, company, sector, city, city_name }) => {
  const [open, setOpen] = useState(0);
  return (
    <StyledBox>
      <Row>
        <Col>
          <Row>
            <PersonIcon/>
            <Text><strong>Nome:</strong> {name}</Text> 
            <MailIcon/>
            <Text><strong>Email:</strong> {email}</Text>
          </Row>
          <Row>
            <KeyIcon/>
            <Text><strong>Cpf:</strong> {cpf}</Text>
            <CompanyIcon/>
            <Text><strong>Empresa:</strong> {company_name}</Text>
            <SectorIcon/>
            <Text><strong>Setor:</strong> {sector_name}</Text>
            <HouseIcon/>
            <Text><strong>Cidade:</strong> {city_name}</Text>            
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
        {/* <ButtonBox>
          <Button variant="contained" color="secondary" size="small">
            Deletar
          </Button>
        </ButtonBox> */}
        <Modal open={Boolean(open)} onClose={() => setOpen(false)} center focusTrapped={false}>
          <CreateOrUpdatePerson
            personId={id}
            isEditing={true}
            label="Editar funcionário" 
            companyList={companyList} 
            sectorList={sectorList}
            cityList={cityList}
            nome={name}
            cpf={cpf}
            email={email}
            empresa={company}
            setor={sector}
            city={city}
          />
        </Modal>
      </Row>
    </StyledBox>
  )

}

PersonCard.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  cpf: string.isRequired,
  company_name: string.isRequired,
  sector_name: string.isRequired
};

export default PersonCard;