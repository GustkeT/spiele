import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUserFriends, faClock } from '@fortawesome/free-solid-svg-icons'
import SpielKarteEdit from './spielkarteedit';

library.add(faEdit, faTrash, faUserFriends, faClock)


const Modal = ({ show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
      </section>
    </div>
  );
};

export default class SpielKarte extends Component {

  constructor(props) {
      super(props);
      this.state = {
        spiel: {},
        show: false,
      };
    }

    showModal = () => {
      this.setState({ show: true });
    }

    hideModal = () => {
      this.setState({ show: false });
    }

  render(){

    return(
        <div className="spiel-card">
            <Modal show={this.state.show}> <SpielKarteEdit removeSpiel={this.props.removeSpiel} updateSpiel={this.props.updateSpiel} spiel={this.props.spiel} hideModal={this.hideModal}/></Modal>
            <div onClick={this.showModal} className="spiel-card card">
              <Image className="card-img-top"
                src={"../images/spiel_" + this.props.spiel.id + ".jpg"}
                onError={(e)=>{
                  e.target.onerror = null;
                  e.target.src="../images/spiel_0.jpg"
                }} responsive />
                <div className="spiel-card-body card-body ">
                  <h4 className="card-title">{this.props.spiel.titel}</h4>
                  <h6 className="card-subtitle mb-2 text-muted">{this.props.spiel.autor}</h6>
                  <div className="align-self-end">
                    <div className="float-left">
                      <FontAwesomeIcon icon="user-friends" /> {this.props.spiel.minspieler}
                    </div>
                    <div className="float-right">
                      <FontAwesomeIcon icon="clock" /> {this.props.spiel.dauer} min
                    </div>
                  </div>
                </div>
            </div>
        </div>
      );
    }
}
