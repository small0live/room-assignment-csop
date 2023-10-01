import React from "react";

import Room from "./Room.jsx";
import Timer from "./Timer.jsx";
import { HTMLTable } from "@blueprintjs/core";
import { StageTimeWrapper } from "meteor/empirica:core";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";

const TimedButton_1 = StageTimeWrapper((props) => {
  const { player, onClick, activateAt, remainingSeconds, stage } = props;

  const disabled = remainingSeconds > activateAt;
  return (
    <button
      type="button"
      className={`bp3-button bp3-icon-cross bp3-intent-danger bp3-large ${
        player.get("satisfied") ? "bp3-minimal" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      Unsatisfied
    </button>
  );
});

const TimedButton_2 = StageTimeWrapper((props) => {
  const { player, onClick, activateAt, remainingSeconds, stage } = props;

  const disabled = remainingSeconds > activateAt;
  return (
    <button
      type="button"
      className={`bp3-button bp3-icon-tick bp3-intent-success bp3-large ${
        player.get("satisfied") ? "" : "bp3-minimal"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      Satisfied
    </button>
  );
});

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeButton: false };
  }

  componentDidMount() {
    const { player } = this.props;
    setTimeout(() => this.setState({ activeButton: true }), 5000); //we make the satisfied button active after 5 seconds
    if (player.stage.submitted) {
      this.setState({ activeButton: false });
    }
  }

  handleSatisfaction = (satisfied, event) => {
    const { game, player, stage } = this.props;
    event.preventDefault();

    //if everyone submitted then, there is nothing to handle
    if (player.stage.submitted) {
      return;
    }

    //if it is only one player, and satisfied, we want to lock everything
    if (game.players.length === 1 && satisfied) {
      this.setState({ activeButton: false });
    } else {
      //if they are group (or individual that clicked unsatisfied), we want to momentarily disable the button so they don't spam, but they can change their mind so we unlock it after 1.5 seconds
      this.setState({ activeButton: false });
      setTimeout(() => this.setState({ activeButton: true }), 800); //preventing spam by a group
    }

    player.set("satisfied", satisfied);
    stage.append("log", {
      verb: "playerSatisfaction",
      subjectId: player._id,
      state: satisfied ? "satisfied" : "unsatisfied",
      // at: new Date()
      at: moment(TimeSync.serverTime(null, 1000)),
    });
    console.log("task moment", moment(TimeSync.serverTime(null, 1000)));
  };

  render() {
    const { game, stage, player } = this.props;

    const task = stage.get("task");
    const violatedConstraints = stage.get("violatedConstraints") || [];

    return (
      <div className="task">
        <div className="left">
          <div className="info">
            <Timer stage={stage} />
            <div className="score">
              <h5 className="bp3-heading">Score</h5>

              <h2 className="bp3-heading">{stage.get("score")}</h2>
            </div>
          </div>

          <div className="constraints">
            {stage.name === "practice" ? (
              <p>
              </p>
            ) : (
              ""
            )}

            <h5 className="bp3-heading">Constraints</h5>
            {player.id.includes("18_4_A") ? ( //16
                  <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">F and I can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
                  </ul>
                  ) : (player.id.includes("18_4_B") ? (
                    <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">N and R must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                    </ul>
                    ) : (player.id.includes("18_4_C") ? (
                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">N and R must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                      </ul>
                      ) : (player.id.includes("18_4_D") ? (
                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">N and R must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                      </ul>
                      ) : (player.id.includes("12_4_A") ? (//4
                                       <ul>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">F and I can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">N and R must live in the same room.</li>
                                       </ul>
                                       ) : (player.id.includes("12_4_B") ? (
                                        <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                        </ul>
                                        ) : (player.id.includes("12_4_C") ? (
                                          <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                          </ul>
                                          ) : (player.id.includes("12_4_D") ? (
                                            <ul>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                            </ul>
                                            ) : (player.id.includes("11_4_A") ? (//30
                                              <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">F and I can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                </ul>
                                ) : (player.id.includes("11_4_B") ? (
                                  <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
                                  </ul>
                                  ) : (player.id.includes("11_4_C") ? (
                                    <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
                                    </ul>
                                    ) : (player.id.includes("11_4_D") ? (
                                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">N and R must live in the same room.</li>
                                      </ul>
                                      ) : (player.id.includes("13_4_A") ? (//19
                                         <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">N and R must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                         </ul>
                                        ) : (player.id.includes("13_4_B") ? (
                                           <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">F and I can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                           </ul>
                                          ) : (player.id.includes("13_4_C") ? (
                                             <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">F and I can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                            </ul>
                                            ) : (player.id.includes("13_4_D") ? (
                                               <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">F and I can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                              </ul>
                                              ) : (player.id.includes("15_4_A") ? (//6
                                        <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">F and I can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">N and R must live in the same room.</li>
                                        </ul>
                                        ) : (player.id.includes("15_4_B") ? (
                                          <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                          </ul>
                                          ) : (player.id.includes("15_4_C") ? (
                                    <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                    </ul>
                                    ) : (player.id.includes("15_4_D") ? (
                                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                      </ul>
                                      ) : (player.id.includes("16_4_A") ? ( //34
                                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">N and R must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                      </ul>
                                      ) :
                                      (player.id.includes("16_4_B") ? (
                                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
                                      </ul>
                                      ) :
                                      (player.id.includes("16_4_C") ? (
                                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
                                      </ul>
                                      ) :
                                      (player.id.includes("16_4_D") ? (
                                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">F and I can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
                                      </ul>
                                      ) : (player.id.includes("17_4_A") ? ( //18
                                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">F and I can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">N and R must live in the same room.</li>
                                      </ul>
                                      ) :
                                      (player.id.includes("17_4_B") ? (
                                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
                                      </ul>
                                      ) :
                                      (player.id.includes("17_4_C") ? (
                                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
                                      </ul>
                                      ) :
                                      (player.id.includes("17_4_D") ? (
                                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                      </ul>
                                      ) : (player.id.includes("14_4_A") ? ( //35
                                            <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">F and I can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">N and R must live in the same room.</li>
                                            </ul>
                                            ) : (player.id.includes("14_4_B") ? (
                                            <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                            </ul>
                                            ) : (player.id.includes("14_4_C") ? (
                                            <ul>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                            </ul>
                                            ) : (player.id.includes("14_4_D") ? (
                                            <ul>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                                            </ul>
                                            ) : (player.id.includes("19_4_A") ? (//23
                        <ul>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                        </ul>
                        ) : (player.id.includes("19_4_B") ? (
                          <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
                          </ul>
                          ) : (player.id.includes("19_4_C") ? (
                            <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
                           </ul>
                            ) : (player.id.includes("19_4_D") ? (
                              <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">F and I can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">N and R must live in the same room.</li>
                              </ul>
                              ) : (player.id.includes("20_4_A") ? (
                  <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and B must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and H must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and E must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">I and N can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">L and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">N and R must live in the same room.</li>
                  </ul>
                  ) : (player.id.includes("20_4_B") ? (
                    <ul>
<li className="bp3-icon-standard bp3-icon-dot">A and J can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">F and I can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                    </ul>
                    ) : (player.id.includes("20_4_C") ? (
                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">C and J can't live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">G and J must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                      </ul>
                      ) : (player.id.includes("20_4_D") ? (
                      <ul>
<li className="bp3-icon-standard bp3-icon-dot">B and F must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">B and P can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">D and F can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">E and Q can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">J and K can't live in the same room or be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">K and R must be neighbors.</li>
<li className="bp3-icon-standard bp3-icon-dot">M and O must live in the same room.</li>
<li className="bp3-icon-standard bp3-icon-dot">O and P must be neighbors.</li>
                      </ul>
                      ) :
                                          ("") 
                                          )))))))))))))))))))))))))))))))))))))))}
          </div>

          <div className="payoff">
            <h5 className="bp3-heading">Payoff</h5>
            <HTMLTable className="bp3-table">
              <thead>
                <tr>
                  <th>Rooms</th>
                  {task.rooms.map((room) => (
                    <th key={room}>{room}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {task.students.map((student) => (
                  <tr key={student}>
                    <th>Student {student}</th>
                    {task.rooms.map((room) => (
                      <td
                        className={
                          stage.get(`student-${student}-room`) === room
                            ? "active"
                            : null
                        }
                        key={room}
                      >
                        {task.payoff[student][room]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </HTMLTable>
          </div>
        </div>

        <div className="board">
          <div className="all-rooms">
            <Room
              room="deck"
              stage={stage}
              game={game}
              player={player}
              isDeck
            />

            <div className="rooms">
              {task.rooms.map((room) => (
                <Room
                  key={room}
                  room={room}
                  stage={stage}
                  game={game}
                  player={player}
                />
              ))}
            </div>
          </div>

          <div className="response">
            <TimedButton_1
              stage={stage}
              player={player}
              activateAt={game.treatment.stageDuration - 5}
              onClick={this.handleSatisfaction.bind(this, false)}
            />

            <TimedButton_2
              stage={stage}
              player={player}
              activateAt={game.treatment.stageDuration - 5}
              onClick={this.handleSatisfaction.bind(this, true)}
            />

            {/* <button
                type="button"
                className={`bp3-button bp3-icon-cross bp3-intent-danger bp3-large ${
                  player.get("satisfied") ? "bp3-minimal" : ""
                }`}
                onClick={this.handleSatisfaction.bind(this, false)}
                disabled={!this.state.activeButton}
              >
                Unsatisfied
              </button>
            <button
              type="button"
              className={`bp3-button bp3-icon-tick bp3-intent-success bp3-large ${
                player.get("satisfied") ? "" : "bp3-minimal"
              }`}
              onClick={this.handleSatisfaction.bind(this, true)}
              disabled={!this.state.activeButton}
            >
              Satisfied
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}