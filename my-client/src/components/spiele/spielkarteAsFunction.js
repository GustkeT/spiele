import React from 'react';
import PropTypes from 'prop-types';
import { Image, ButtonToolbar, ButtonGroup, Button, FormGroup, FormControl} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUserFriends, faClock } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit, faTrash, faUserFriends, faClock)

    const SpielKarte = (props) => (
        //<div onClick={() => props.spiele.titel="Terr"} className="spiel-card">
        <div className="spiel-card">
            <div className="spiel-card card">
              <Image className="card-img-top"
                src={"../images/spiel_" + props.spiele.id + ".jpg"}
                onError={(e)=>{
                  e.target.onerror = null;
                  e.target.src="../images/spiel_0.jpg"
                }} responsive />
                <div className="spiel-card-body card-body ">
                  <h4 className="card-title">{props.spiele.titel}</h4>
                  <h6 className="card-subtitle mb-2 text-muted">{props.spiele.autor}</h6>
                  <div className="align-self-end">
                    <div className="float-left">
                      <FontAwesomeIcon icon="user-friends" /> {props.spiele.mitspieler}
                    </div>
                    <div className="float-right">
                      <FontAwesomeIcon icon="clock" /> {props.spiele.dauer} min
                    </div>
                  </div>
                </div>
                <div>
                  <ButtonToolbar className="float-right">
                    <ButtonGroup>
                      <Button>
                        <FontAwesomeIcon icon="edit" />
                      </Button>
                      <Button>
                        <FontAwesomeIcon icon="trash" />
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </div>
            </div>
        </div>
);

SpielKarte.defaultProps = {
    spiele: {}
};

SpielKarte.propTypes = {
    spiele: PropTypes.object
};

export default SpielKarte;
