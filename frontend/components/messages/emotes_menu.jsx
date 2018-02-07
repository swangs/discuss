import React, { Fragment } from 'react';

class EmotesMenu extends React.Component {
  constructor(props) {
    super(props);

    this.emotes = [
      '😀','😁','😂','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😗',
      '😙','😚','🙂','🤗','🤔','😐','😑','😶','🙄','😏','😣','😥','😮','🤐',
      '😯','😪','😫','😴','😌','😛','😜','😝','😒','😓','😔','😕','🙃','🤑',
      '😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','😬',
      '😰','😱','😳','😵','😡','😠','😷','🤒','🤕','😇','🤓','😈','👿','👹',
      '👺','💀','👻','👽','🤖','💩','💪','👈','👉','☝️','👆','🖕','👇','✌️',
      '🖖','🤘','🖐','✋','👌','👍','👎','✊','👊','👋','✍️','👏','👐','🙌',
      '🙏' 
    ];
  }

  toggleDropdown() {
    document.getElementById("emotes-content").classList.toggle("show");
    document.getElementById("emotes-button").classList.toggle("show-button");
  }

  selectEmote(emote) {
    this.props.addEmote(emote);
  }



  render () {

    window.onclick = function(event) {
      if (!event.target.matches(".emotes-button")
        && !event.target.matches(".emotes-content")) {
        document.getElementById("emotes-content").classList.remove("show");
        document.getElementById("emotes-button").classList.remove("show-button");
      }
    };

    const emotes = this.emotes.map((emote, i) => (
      <li
        onClick={() => this.selectEmote(emote)}
        className="emotes"
        key={i}>
        {emote}
      </li>
    ));

    return (
      <Fragment>
        <div
          onClick={() => this.toggleDropdown()}
          id="emotes-button"
          className="emotes-button">
          😀
        </div>
        <ul id="emotes-content" className="emotes-content">
          {emotes}
        </ul>
      </Fragment>
    );
  }
}

export default EmotesMenu;