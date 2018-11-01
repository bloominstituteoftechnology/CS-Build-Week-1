import React, { Component } from 'react';

export default class InfoOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverlayOpen: false
    };
  }

  onScrimClick = e => {
    e.preventDefault();
    const scrim = this.refs.scrim;
    const content = this.refs.content;
    const about = this.refs.about;
    const rules = this.refs.rules;
    scrim.classList.remove('is-active');
    content.classList.remove('is-active');
    about.classList.remove('is-active');
    rules.classList.remove('is-active');
  };

  onAboutClick = e => {
    e.preventDefault();
    const scrim = this.refs.scrim;
    const content = this.refs.content;
    const about = this.refs.about;
    const rules = this.refs.rules;
    const aboutContent = this.refs.aboutContent;
    const rulesContent = this.refs.rulesContent;
    scrim.classList.add('is-active');
    content.classList.add('is-active');
    about.classList.add('is-active');
    rules.classList.remove('is-active');
    aboutContent.classList.add('is-active');
    rulesContent.classList.remove('is-active');
  };

  onRulesClick = e => {
    e.preventDefault();
    const scrim = this.refs.scrim;
    const content = this.refs.content;
    const about = this.refs.about;
    const rules = this.refs.rules;
    const aboutContent = this.refs.aboutContent;
    const rulesContent = this.refs.rulesContent;
    scrim.classList.add('is-active');
    content.classList.add('is-active');
    about.classList.remove('is-active');
    rules.classList.add('is-active');
    aboutContent.classList.remove('is-active');
    rulesContent.classList.add('is-active');
  };

  render() {
    return (
      <div className="info-overlay">
        <div ref="scrim" className="info-overlay__scrim" onClick={e => this.onScrimClick(e)}></div>
        <div ref="content" className="info-overlay__content-layer">
          <div className="info-overlay-header">
            <span ref="about" className="info-overlay-header__about" onClick={e => this.onAboutClick(e)}>About</span>
            <span ref="rules" className="info-overlay-header__rules" onClick={e => this.onRulesClick(e)}>Rules</span>
          </div>
          <div className="info-overlay-content">
            <div ref="aboutContent" className="info-overlay-content__about">
              <h2>About</h2>
              <span className="info-content">
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
              </span>
            </div>

            <div ref="rulesContent" className="info-overlay-content__rules">
              <h2>Rules</h2>
              <span className="info-content">
                <p>In the <span className="emphasis">Game of Life</span>, each cell's existence is dependent on its neighboring cells.</p>
                <p>If a cell is alive and has 2 or 3 neighbors, then it remains alive. If it doesn't it dies. 😭</p>
                <p>If a cell is dead and has exactly 3 neighbors, then it comes to life! 👶 Otherwise, it remains dead.</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}