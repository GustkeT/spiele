import React from 'react';
import { Image, ButtonToolbar, ButtonGroup, Button, FormGroup, FormControl } from 'react-bootstrap';

class ToolBar extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     test: true,
   };
 }

  render() {
    return (
      <div className="btn-toolbar justify-content-between">
        <form>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Suche"
            />
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default ToolBar;
