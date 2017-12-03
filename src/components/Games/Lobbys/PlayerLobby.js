import React from 'react';
import Player from './Player';
import '../../../styles/lobby.css';
import { Grid } from 'semantic-ui-react';

//import { Grid ,Col , Row} from 'react-bootstrap';

export default class PlayerLobby extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            
        };

        // this.handleChange = this.handleChange.bind(this);     
    }

    render() {
        return ( 
            <Grid columns={2} className="lobby-container">
                <Grid.Row stretched className="clear">
                    <Grid.Column width={12} className="lobby-selection-box">
                        <Grid columns={3} className="clear">
                            <Grid.Row stretched className="clear lobby-selection-columns">
                                <Grid.Column width={6} className="team-red">
                                    <div className="team-box">
                                        <div className="header"><div>RED TEAM</div></div>
                                        <div className="attacker">
                                            <Player position="1" />                                       
                                        </div>
                                        <div className="empty"></div>
                                        <div className="defender">2</div>
                                    </div>
                                    
                                </Grid.Column>
                                <Grid.Column width={4} className="lobby-selection-details"></Grid.Column>
                                <Grid.Column width={6} className=""></Grid.Column>
                            </Grid.Row>
                        </Grid>  
                    </Grid.Column>
                    <Grid.Column width={4} className="lobby-details-box">
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>      
        );
    }
}

const Hover = ({ onHover, children }) => (
    <div className="hover">
        <div className="hover__no-hover">{children}</div>
        <div className="hover__hover">{onHover}</div>
    </div>
)

