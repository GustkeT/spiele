import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ButtonToolbar, ButtonGroup, Button, Modal} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUserFriends, faClock, faStar } from '@fortawesome/free-solid-svg-icons'
import SpielKarteEdit from './spielkarteedit';

library.add(faEdit, faTrash, faUserFriends, faClock, faStar)

export default class SpielKarte extends Component {

  constructor(props) {
      super(props);
      this.state = {
        spiel: {},
        gesamtbewertung: 11,
        firstTime: true,
        show: false,
      };
      //console.log("Hallo - "+ this.props.spiel.bewertung);
    }

    showModal = () => {
      this.setState({ show: true });
    }

    hideModal = () => {
      this.setState({ show: false });
    }

    berechneBewertung = () => {
      if(this.state.firstTime){
        this.setState({firstTime: false});
        if (this.props.spiel.bewertung != null){
          const sum = this.props.spiel.bewertung.reduce((a, b) => a + b, 0);
          const avg = (sum / this.props.spiel.bewertung.length) || 0;
          const perc = avg/5*100; // 5 Sterne sind 100%
          const percRounded = Math.round(perc/10) * 10; //Wieviel Prozent der 5 gelben Sterne sollen angezeigt werden?
          this.setState({ gesamtbewertung: percRounded });
        }
        else{
          this.setState({ gesamtbewertung: 0 });
        }
      }
    }

  render(){
    this.berechneBewertung();
    // 'show' um die Karte SpielKarteEdit (modal) zu zeigen; 'onHide' um die Karte zu verbergen, wenn man auﬂerhalb klickt
    // 'hideModal' als callback um die Karte zu verbergen, wenn man das X klickt
    return(
        <div>
            <Modal show={this.state.show} onHide={this.hideModal}>
              <SpielKarteEdit removeSpiel={this.props.removeSpiel} updateSpiel={this.props.updateSpiel} spiel={this.props.spiel} hideModal={this.hideModal}/>
            </Modal>
            <div onClick={this.showModal} className="spiel-card card">
              <Image className="card-img-top"
                src={"../images/spiel_" + this.props.spiel.id + ".jpg"}
                onError={(e)=>{
                  e.target.onerror = null;
                  e.target.src="../images/spiel_0.jpg"
                }} responsive />
                <div className="spiel-card-body card-body ">
                  <FontAwesomeIcon icon="star" color='#ccc' />
                  <FontAwesomeIcon icon="star" color='#ccc' />
                  <FontAwesomeIcon icon="star" color='#ccc' />
                  <FontAwesomeIcon icon="star" color='#ccc' />
                  <FontAwesomeIcon icon="star" color='#ccc' />
                  <div className="stars-inner" width={this.state.gesamtbewertung}></div>
                  {this.state.gesamtbewertung}
                  <h4 className="card-title">{this.props.spiel.titel}</h4>
                  <h6 className="card-subtitle mb-2 text-muted">{this.props.spiel.autor}</h6>
                  <div className="align-self-end">
                    <div className="float-left">
                      <FontAwesomeIcon icon="user-friends" /> {this.props.spiel.minspieler} - {this.props.spiel.maxspieler}
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
