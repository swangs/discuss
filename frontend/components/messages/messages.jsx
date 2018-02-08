import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ActionCable from 'actioncable';
import UsersContainer from '../users/users_container';
import EmotesMenu from './emotes_menu';
import validUrl from 'valid-url';

class Messages extends React.Component {
  constructor(props) {
    super(props);

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
  //   if (this.props.location !== newProps.location) {
  //     this.setState({ success: true });
  //     let serverId = newProps.location.pathname;
  //     serverId = serverId.slice(1);
  //     let index = serverId.indexOf('/');
  //     if (index < 0) {
  //       index = serverId.length;
  //     }
  //     let channelId = serverId.slice(index + 1);
  //     serverId = serverId.slice(0, index);
  //     serverId = newProps.location.pathname.includes("/@me") ?
  //       newProps.currentUser.myServer :
  //       serverId;
      // this.props.getChannels(serverId)
      //   .then(() => this.props.getChannel(channelId))
        // .then(() => {
        //   if (this.props.channels.includes(this.props.currentChannel.id)) {
        //     this.setState({
        //       currentChatMessage: '',
        //       currentChannel: this.props.currentChannel.id,
        //       currentUser: this.props.currentUser.id,
        //       chatLogs: this.props.messages,
        //       success: true,
        //     });
        //   } else {
        //     this.setState({ success: false });
        //   }
        // });

    //   this.props.getChannel(channelId)
    //   .then(() => {
    //     if (this.props.channels.includes(this.props.currentChannel.id)) {
    //       this.setState({
    //         currentChatMessage: '',
    //         currentChannel: this.props.currentChannel.id,
    //         currentUser: this.props.currentUser.id,
    //         chatLogs: this.props.messages,
    //         success: true,
    //       });
    //     } else {
    //       console.log("something failed");
    //       this.setState({ success: false });
    //     }
    //   });
  //   }
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
        if (chatContent.currentChannel === chatContent.myChannel) {
          const botResponses = [
            "Hello there!",
            "Are you talking to yourself?",
            "Be sure to check out the features of this site!",
            "I'm just a bot, don't mind me.",
            "What an insightful thought!",
            "Interesting...",
            "Doesn't look like anything to me...",
            "Where am I?",
            "Skynet is... oh wrong channel.",
            "Dont mind me.",
            "Welcome to Discuss!",
            "Navigate servers using the left sidebar. Create your own server or join a friend's by clicking the + .",
            "Open the Server Options to create new channels, delete your server, or leave servers!",
            "Click your friends in the channel member's list to send them a message!",
          ];
        setTimeout(() => {
          this.perform('create', {
            content: botResponses[Math.floor(Math.random() * botResponses.length)],
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
    this.chats.create(this.state);
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
        if (message.content.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
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
          <div className='chat-author'>{ message.author }&nbsp;&nbsp;<div className='chat-created-at'>{ date } { time }</div></div>
          <div className='chat-message'>{ messageContent }</div>
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
      userIndex = <UsersContainer />;
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
