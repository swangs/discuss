import React from 'react';

class UserAvatar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageFile: null,
      imageUrl: this.props.imageUrl,
    };
  }

  updateFile() {
    return (e) => {
      let file = e.currentTarget.files[0];
      let fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.setState({ imageFile: file, imageUrl: fileReader.result });
      };
      if (file) {
        fileReader.readAsDataURL(file);
      }
    };
  }

  handleSubmit() {
    return (e) => {
      let formData = new FormData();
      formData.append("user[avatar]", this.state.imageFile);
      this.props.updateUser(formData)
        .then(response => this.props.getChannel(this.props.currentChannel));
      this.props.onClose();
    };
  }

  close(e) {
    e.preventDefault();
    if (this.props.onClose) {
      this.setState({ user: "" });
      this.props.onClose();
    }
  }

  render() {
    if (this.props.isOpen === false) {
      return null;
    }

    return (
      <div>
        <div className="modal">
          <h1>Update User Icon</h1>
          <img src={this.state.imageUrl}></img>
          <input type="file" onChange={this.updateFile()}></input>
          <button onClick={this.handleSubmit()}>Update</button>
        </div>
        <div className="backdrop" onClick={e => this.close(e)}></div>
      </div>
    );
  }
}

export default UserAvatar;
