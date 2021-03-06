
![alt text](https://raw.githubusercontent.com/swangs/discuss/master/app/assets/images/discusslogolong.png "https://aa-discuss.herokuapp.com")

[Discuss](https://aa-discuss.herokuapp.com) is a single page live chat app cloned from Discord.  Create servers to chat with teams or send private messages.  

Technologies used:
* React-Redux frontend
* Ruby on Rails backend
* PostgreSQL database
* Websockets integrated with Action Cable
* aws implemented for uploading images
# Features
## Chat supports text, links, image links, and youtube videos.
Input strings are automatically converted to links, embedded images, and embedded youtube videos.
## Servers and Channels
Users can join or create any server with a unique server name.  Servers are not private, however, only members of a server have access to the channels and messages.
### Joining and Creating Servers
Easily create and manage servers for your team or community.
![alt text](https://i.imgur.com/sbD2DkP.gif "server-navigation")
### Creating Channels in your Server
Channels can be created by everyone but only deleted by server owners.
![alt text](https://i.imgur.com/BsBSNJC.gif "channel-navigation")
## Direct Messages
### Direct Message Members of your Server
Send a member of your servers a direct message by clicking on their name in the Member's list.
![alt text](https://i.imgur.com/Wobr1zm.gif "direct-message")
### Search for Users
Send a message to users not in your servers by searching their name.
![alt text](https://i.imgur.com/7HRC40F.gif "search-users")
## Action Cable
Websocket subscriptions are created by ActionCable when the messages component mounts. This allows users to simultaneously send and receive messages.  
```javascript
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
```
Subscriptions are deleted when the component is unmounted.  During development users would randomly switch and post between channels because multiple sockets were open!
```javascript
componentWillUnmount() {
  this.deleteSocket();
}
deleteSocket() {
  this.cable.subscriptions.remove(this.chats);
}
```
Check out the app to discover more features!
