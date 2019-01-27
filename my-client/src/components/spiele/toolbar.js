import React from 'react';
import { Image, ButtonToolbar, ButtonGroup, Button, Form, FormGroup, FormControl } from 'react-bootstrap';

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
        <Form>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Suche"
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default ToolBar;
