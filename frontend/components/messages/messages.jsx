import React from 'react';
import { Link } from 'react-router-dom';
import ActionCable from 'actioncable';

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentChatMessage: '',
      currentChannel: this.props.currentChannel.id,
      currentUser: this.props.currentUser.id,
      chatLogs: this.props.messages,
      refresh: true
    };
  }

  componentWillMount() {
    this.createSocket();
  }
  componentWillUnmount() {
    this.deleteSocket();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      let serverId = newProps.location.pathname;
      serverId = serverId.slice(1);
      let index = serverId.indexOf('/');
      if (index < 0) {
        index = serverId.length;
      }
      let channelId = serverId.slice(index + 1);
      serverId = serverId.slice(0, index);
      serverId = newProps.location.pathname.includes("/@me") ?
        newProps.currentUser.myServer :
        serverId;
      this.props.getServer(serverId)
        .then(() => this.props.getChannel(channelId))
        .then(() => (
          this.setState({
            currentChatMessage: '',
            currentChannel: this.props.currentChannel.id,
            currentUser: this.props.currentUser.id,
            chatLogs: this.props.messages
          })
        ));
    }
  }


  createSocket() {
    this.cable = ActionCable.createConsumer();
    this.chats = this.cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => {},
      received: (data) => {
        this.props.getChannel(this.props.currentChannel.id)
          .then(() => this.setState({ chatLogs: this.props.messages }));
      },
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent.currentChatMessage,
          author_id: chatContent.currentUser,
          channel_id: chatContent.currentChannel
        });
      }
    });
  }

  deleteSocket() {
    this.cable.subscriptions.remove(this.chats);
  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  handleChatInputKeyPress(event) {
    if(event.key === 'Enter') {
      this.handleSendEvent(event);
    }
  }

  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(this.state);
    this.setState({
      currentChatMessage: ''
    });
  }
  renderChatLog() {
    const log = this.state.chatLogs.slice().reverse();
    return log.map((message) => {
      const timestamp = new Date(message.created_at);
      const date = `${timestamp.toLocaleDateString()}`;
      const time = `${timestamp.toLocaleTimeString()}`;

      return (
        <li className="message" key={`chat_${message.id}`}>
          <div className='chat-created-at'>{ date } { time }</div>
          <div className='chat-author'>{ message.author }</div>
          <div className='chat-message'>{ message.content }</div>
        </li>
      );
    });
  }

  render() {

    return (
      <div className="messages">
        <nav className="messages-nav">
          <p><i className="fas fa-hashtag"></i> {this.props.currentChannel.name}</p>
          <div className="swang-links">
            <a href='https://github.com/swangs/discuss'>
              <i className="fab fa-github fa-2x"></i>
            </a>
            <a href='https://www.linkedin.com/in/s-wang/'>
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
        </nav>
          <div className='message-display'>
            <div className='chat-logs'>
              { this.renderChatLog() }
            </div>
            <div className="chat-form">
              <div className="input-box">
                <input
                  type='text'
                  placeholder={`Message #${this.props.currentChannel.name}`}
                  className='chat-input'
                  value={ this.state.currentChatMessage }
                  onKeyPress={ (e) => this.handleChatInputKeyPress(e) }
                  onChange={ (e) => this.updateCurrentChatMessage(e) }>
                </input>
              </div>
            </div>
          </div>
        <div className="messages-body">
        </div>
      </div>
    );
  }
}

export default Messages;
