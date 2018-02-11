import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ActionCable from 'actioncable';
import UsersContainer from '../users/users_container';
import EmotesMenu from './emotes_menu';
import validUrl from 'valid-url';

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.botResponses = [
      "Hello there!",
      "Are you talking to yourself?",
      "Be sure to check out the features of this app!",
      "I'm just a bot, don't mind me.",
      "What an insightful thought!",
      "Interesting...",
      "Doesn't look like anything to me...",
      "Where am I?",
      "Skynet is... oh, wrong channel.",
      "Dont mind me.",
      "Can you repeat that?",
      "Welcome to Discuss!",
      "Navigate servers using the left sidebar. Create your own server or join a friend's by clicking the + .",
      "Open the Server Options to create new channels, delete your server, or leave servers!",
      "Click your friends in the channel member's list to send them a message!",
    ];
    this.randomBotMessage = this.randomBotMessage.bind(this);

    this.state = {
      currentChatMessage: '',
      currentChannel: this.props.currentChannel.id,
      currentUser: this.props.currentUser.id,
      chatLogs: this.props.messages,
      myChannel: this.props.currentUser.myChannel,
      success: true,
      selected: false
    };
  }

  componentWillMount() {
    this.createSocket();
  }
  componentWillUnmount() {
    this.deleteSocket();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
            currentChatMessage: '',
            currentChannel: newProps.currentChannel.id,
            currentUser: newProps.currentUser.id,
            chatLogs: newProps.messages,
            success: true,
          });
  }

  randomBotMessage() {
    return this.botResponses[Math.floor(Math.random() * this.botResponses.length)];
  }

  createSocket() {
    this.cable = ActionCable.createConsumer();
    this.chats = this.cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => {},
      received: (data) => {
        const currentChatMessage = this.state.currentChatMessage;
        this.props.getChannel(this.props.currentChannel.id)
          .then(() => this.setState({
             currentChatMessage,
             chatLogs: this.props.messages,
           }));
      },
      create: function(chatContent, randomBotMessage) {
        this.perform('create', {
          content: chatContent.currentChatMessage,
          author_id: chatContent.currentUser,
          channel_id: chatContent.currentChannel
        });
        if (chatContent.currentChannel === chatContent.myChannel && chatContent.currentChatMessage !== "") {
        setTimeout(() => {
          this.perform('create', {
            content: randomBotMessage(),
            author_id: 1,
            channel_id: chatContent.currentChannel
          });
        }, 500);
        }
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
    this.chats.create(this.state, this.randomBotMessage);
    document.getElementById("emotes-content").classList.remove("show");
    document.getElementById("emotes-button").classList.remove("show-button");
    this.setState({
      currentChatMessage: '',
      selected: false
    });
  }

  selectAction(type) {
    if (type === "toggle") {
      this.setState({ selected: !this.state.selected });
    } else {
      this.setState({ selected: false });
    }
  }

  addEmote(emote) {
    this.setState({ currentChatMessage: `${this.state.currentChatMessage}${emote}`});
    this.refs.chatInput.focus();
  }

  getYoutubeId(url) {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

  renderChatLog() {
    if (!this.state.chatLogs) {
      return null;
    }
    const log = this.state.chatLogs.slice().reverse();
    return log.map((message) => {
      const timestamp = new Date(message.created_at);
      const date = `${timestamp.toLocaleDateString()}`;
      const time = `${timestamp.toLocaleTimeString()}`;

      let messageContent;
      if (validUrl.isUri(message.content)){
        if (message.content.match(/\.(youtube.com)/) !== null) {
          let youtubeId = this.getYoutubeId(message.content);
          messageContent = (
            <a href={ message.content } target="_blank">
              { message.content }<br/><iframe src={ `//www.youtube.com/embed/${youtubeId}` } frameBorder="0" allowFullScreen></iframe>
            </a>
          );
        } else if (message.content.match(/\/.(giphy.com|media.giphy.com)/)) {
          messageContent = (
            <a href={ message.content } target="_blank">
              { message.content }<br/><iframe src={ message.content } frameBorder="0" scrolling="no"></iframe>
            </a>
          );
        } else if (message.content.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
          messageContent = (
            <a href={ message.content } target="_blank">
              { message.content }<br/><img src={ message.content }></img>
            </a>
          );
        } else {
          messageContent = <a href={message.content} target="_blank">{ message.content }</a>;
        }
      } else {
        messageContent = message.content;
      }

      return (
        <li className="message" key={`chat_${message.id}`}>
          <div className="message-image">
            <img className="author-avatar" src={message.image_url}></img>
          </div>
          <div className="message-text">
            <div className='chat-author'>{ message.author }&nbsp;&nbsp;<div className='chat-created-at'>{ date } { time }</div></div>
            <div className='chat-message'>{ messageContent }</div>
          </div>
        </li>
      );
    });
  }

  render() {
    if (!this.state.success) {
      return <Redirect to={`/@me/${this.props.currentUser.myChannel}`} />;
    }

    let userIndex = null;
    if (this.props.currentServer.id !== this.props.currentUser.myServer) {
      userIndex = <UsersContainer ownerId={this.props.currentServer.owner_id}/>;
    }

    let messagePlaceholder = `#${this.props.currentChannel.name}`;
    if (this.props.currentServer.id === this.props.currentUser.myServer) {
      messagePlaceholder = `@${this.props.currentChannel.name.replace(this.props.currentUser.username, "")}`;
    }

    let channelHeader = <p><i className="fas fa-hashtag"></i> {this.props.currentChannel.name}</p>;
    if (this.props.currentServer.id === this.props.currentUser.myServer) {
      channelHeader = <p><i className="fas fa-at"></i> {this.props.currentChannel.name.replace(this.props.currentUser.username, "")}</p>;
    }

    return (
      <div className="messages">
        <nav className="messages-nav">
          { channelHeader }
          <div className="swang-links">
            <a href='https://github.com/swangs/discuss' target="_blank">
              <i className="fab fa-github fa-2x"></i>
            </a>
            <a href='https://www.linkedin.com/in/s-wang/' target="_blank">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
        </nav>
        <div className="messages-body">
          <div className='message-display'>
            <div className='chat-logs'>
              { this.renderChatLog() }
            </div>
            <div className="chat-form">
              <div className="input-box">
                <input
                  autoFocus
                  ref="chatInput"
                  type='text'
                  placeholder={`Message ${messagePlaceholder}`}
                  className='chat-input'
                  value={ this.state.currentChatMessage }
                  onKeyPress={ (e) => this.handleChatInputKeyPress(e) }
                  onChange={ (e) => this.updateCurrentChatMessage(e) }>
                </input>
                <EmotesMenu
                  addEmote={emote => this.addEmote(emote)}
                  selected={ this.state.selected }
                  selectAction={(type) => this.selectAction(type)}
                  />
              </div>
            </div>
          </div>
          { userIndex }
        </div>
      </div>
    );
  }
}

export default Messages;
