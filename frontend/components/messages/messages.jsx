import React from 'react';
import { Link } from 'react-router-dom';
import Cable from 'actioncable';

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentChatMessage: '',
      currentChannel: this.props.currentChannel.id,
      currentUser: this.props.currentUser.id,
      chatLogs: this.props.currentChannel.messages
    };
  }

  componentWillMount() {
    this.createSocket();
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
            chatLogs: this.props.currentChannel.messages
          })
        ));
    }
  }


  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:3000/cable');
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => {},
      received: (data) => {
        let chatLogs = this.state.chatLogs;
        chatLogs.push(data);
        this.setState({ chatLogs: chatLogs });
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
    return this.state.chatLogs.map((el) => {
      return (
        <li key={`chat_${el.id}`}>
          <span className='chat-message'>{ el.content }</span>
          <span className='chat-created-at'>{ el.created_at }</span>
        </li>
      );
    });
  }

  render() {

    return (
      <div className="messages">
        <nav className="messages-nav">
          <div className='App'>
            <div className='stage'>
              <h1>Chat</h1>
              <div className='chat-logs'>
                { this.renderChatLog() }
              </div>
              <input
                type='text'
                placeholder='Enter your message...'
                className='chat-input'
                value={ this.state.currentChatMessage }
                onKeyPress={ (e) => this.handleChatInputKeyPress(e) }
                onChange={ (e) => this.updateCurrentChatMessage(e) }/>
              <button
                onClick={ (e) => this.handleSendEvent(e) }
                className='send'>
                Send
              </button>
            </div>
          </div>
        </nav>
        <div className="messages-body">
        </div>
      </div>
    );
  }
}

export default Messages;
