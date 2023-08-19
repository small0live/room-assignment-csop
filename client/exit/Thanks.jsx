import React from "react";

import {Centered} from "meteor/empirica:core";

export default class Thanks extends React.Component {
  static stepName = "Thanks";
  
  render() {
    const { player, game } = this.props;
    return (
      <Centered>
        <div className="game finished">
          <div className="pt-non-ideal-state">
            <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
              <span className="pt-icon pt-icon-thumbs-up" />
            </div>
            <h4 className="pt-non-ideal-state-title">You have finished the room assignment game!</h4>
            <hr />
            <h4 className="pt-non-ideal-state-title">
              Next you will answer some questions about your experience in the team and about yourself. 
            </h4>
            
            <hr />
            <div className="pt-non-ideal-state-description">
              <a href="https://eccles.qualtrics.com/jfe/form/SV_d0VePiylkHMjaiG" target="_blank" rel="noopener noreferrer">Please click this link to begin the questionnaire.</a>
              <p></p>
              As a reminder, your identifier is <em>{player.id}</em> and your color is <em>{player.get("name")}</em>.

            </div>
          </div>
        </div>
      </Centered>
    );
  }
}
