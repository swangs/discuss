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
    this.props.selectAction("toggle");
  }

  selectEmote(emote) {
    this.props.addEmote(emote);
  }

  render () {

    window.onclick = (event) => {
      if (!event.target.matches(".emotes-button")
        && !event.target.matches(".emotes-content")
        && !event.target.matches(".emote")) {
        document.getElementById("emotes-content").classList.remove("show");
        document.getElementById("emotes-button").classList.remove("show-button");
        this.props.selectAction("close");
      }
      if (!event.target.matches('.dropdown')
        && !event.target.matches('.dropdown-p')
        && !event.target.matches('.fa-cog')
        && !event.target.matches('.add-channel-input')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
          let openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
        let cog = document.getElementsByClassName("fa-cog");
        for (var j = 0; j < cog.length; j++) {
          let spinningCog = cog[j];
          if (spinningCog.classList.contains('fa-spin')) {
            spinningCog.classList.remove('fa-spin');
          }
        }
      }
    };

    const emotes = this.emotes.map((emote, i) => (
      <li
        onClick={() => this.selectEmote(emote)}
        className="emote"
        key={i}>
        {emote}
      </li>
    ));

    let button = !this.props.selected ? '😀' : '🤔';

    return (
      <Fragment>
        <div
          onClick={() => this.toggleDropdown()}
          id="emotes-button"
          className="emotes-button">
          { button }
        </div>
        <ul id="emotes-content" className="emotes-content">
          {emotes}
        </ul>
      </Fragment>
    );
  }
}

export default EmotesMenu;
