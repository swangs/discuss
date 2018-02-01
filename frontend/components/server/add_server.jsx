import React from 'react';

class AddServer extends React.Component {

  close(e) {
    e.preventDefault();
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render () {
    if (this.props.isOpen === false) {
      return null;
    }

    return (
      <div>
        <div className="modal">
          <h1>Add or Join Server</h1>
          <form>
          </form>
        </div>
        <div className="backdrop" onClick={e => this.close(e)}></div>
      </div>
    );
  }

}

export default AddServer;
