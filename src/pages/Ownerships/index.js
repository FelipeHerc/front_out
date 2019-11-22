import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getAllStat } from '../../store/modules/getStat';
import { getAllSector } from '../../store/modules/getSector';
import { getAllCompany } from '../../store/modules/getCompany';
import { getAllEquip } from '../../store/modules/getEquip';
import { getAllCel } from '../../store/modules/getCel';
import { getAllOwnership } from '../../store/modules/getOwnership';
import { Loader, CelOwnershipCard } from '../../components'

const StyledListBox = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin: 20px 5vw 20px 10vw;
  padding: 10px;
  align-items: center;
  align-content: center;
  align-items: baseline;
  border-radius: 5px;
`;

const H2 = styled.h2`
  margin: 10px 0px 10px 20px;
`;

const Row = styled.div`
    display: flex;    
    flex-direction: row;
    justify-content: space-between;
`;

class Ownerships extends Component{

  findById = (obj, id) => {
        for(var i = 0; i <= Object.keys(obj).length ; i++){ // eslint-disable-next-line 
          if (obj[i].id == id){
            return obj[i];
          }
        }
    }

  componentDidMount() {
    this.props.getAllEquip();
    this.props.getAllStat();
    this.props.getAllSector();
    this.props.getAllCompany();
    this.props.getAllOwnership();
    this.props.getAllCel();
  }

  render()
  {
    const { equip, loadingEquip } = this.props;
    const { stat, loadingStat } = this.props;
    const { sector, loadingSector } = this.props;
    const { company, loadingCompany } = this.props;
    const { ownership, loadingOwnership } = this.props;
    const { cel, loadingCel } = this.props;

    return(
      <Fragment>
        { 
          (loadingEquip || loadingStat || loadingSector || loadingCompany || loadingOwnership || loadingCel) ? <Loader /> : (

            <StyledListBox>
              <Row>
                <H2>Posses</H2>
              </Row>
              
              { 
                ownership.map((item) => (
                  (item.attributes.cel_id !== 'undefined' &&
                  item.attributes.equip.cel_id !== null && 
                      <CelOwnershipCard key={item.id} cel={this.findById(cel, item.attributes.equip.cel_id)} owner={item.attributes.owner} />
                  )
                  //   if(item.attributes.cel_id !== 'undefined')
                  //   console.log('notebook');
                  
                  // if(item.attributes.notebook_id !== 'undefined')
                  //   console.log('notebook');
                  // if(item.attributes.chip_id !== 'undefined')
                  //   console.log('chip');
                ))
                
              }
            </StyledListBox>
          )
        }
      </Fragment>

    );
  }
};

const mapStateToProps = ({ 
  chip: { equip, getAllEquip, loadedEquip, loadingEquip }, 
  stat: { loadedStat, loadingStat, stat },
  sector: { sector, getAllSector, loadingSector },
  company: { company, getAllCompany, loadingCompany },
  ownership: { ownership, getAllOwnership, loadingOwnership },
  cel: { cel, getAllCel, loadingCel }
  } ) => ({
  equip,
  getAllEquip,
  loadedEquip,
  loadingEquip,
  stat,
  loadedStat, 
  loadingStat,
  sector, 
  getAllSector, 
  loadingSector,
  company,
  getAllCompany, 
  loadingCompany,
  ownership, 
  getAllOwnership, 
  loadingOwnership,
  cel, 
  getAllCel, 
  loadingCel
});

export default connect(mapStateToProps, { getAllEquip, getAllStat, getAllSector, getAllCompany, getAllOwnership, getAllCel } )(Ownerships);



