import React from 'react';
import { Image, Grid } from 'semantic-ui-react';

export default class Homepage extends React.Component {

    render() {
        return (
            <Grid>
                    <Grid.Row centered >
                        <Image size="massive" src={require('../assets/images/bannerPEBOLIM.png')} />
                    </Grid.Row>
                    <Grid.Row>
                        <div style={{ fontSize: 50, fontFamily: 'Teko', fontWeight: 600, paddingLeft: 50, paddingTop: 25 }}>
                            About us...
                     </div>
                        <div style={{ fontSize: 20, paddingLeft: 25, paddingTop: 30 }}>
                            We are a bunch of nerds who also play table football, so we wanted to create a platform that could help us organize and gather data about our games. The solution we came up to resolve those problems is Pebolim.
                     </div>
                    </Grid.Row>
                    <Grid.Row centered columns={4} style={{ paddingTop: 30 }}>
                        <Grid.Column>
                            <Image centered size='small' circular src={require('../assets/images/creatorImage.png')} />
                            <div style={{ fontSize: 30, textAlign: 'center', fontWeight: 600, paddingTop: 10 }}>
                                David Bernardo
                         </div>
                        </Grid.Column>
                        <Grid.Column>
                            <Image centered size='small' circular src={require('../assets/images/creatorImage.png')} />
                            <div style={{ fontSize: 30, textAlign: 'center', fontWeight: 600, paddingTop: 10 }}>
                                Diogo Mendes
                         </div>
                        </Grid.Column>
                        <Grid.Column>
                            <Image centered size='small' circular src={require('../assets/images/creatorImage.png')} />
                            <div style={{ fontSize: 30, textAlign: 'center', fontWeight: 600, paddingTop: 10 }}>
                                Luís Nunes
                         </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered columns={4} style={{ paddingTop: 30 }}>
                        <Grid.Column>
                            <Image centered size='small' circular src={require('../assets/images/creatorImage.png')} />
                            <div style={{ fontSize: 30, textAlign: 'center', fontWeight: 600, paddingTop: 10 }}>
                                Rafael Escudeiro
                         </div>
                        </Grid.Column>
                        <Grid.Column>
                            <Image centered size='small' circular src={require('../assets/images/creatorImage.png')} />
                            <div style={{ fontSize: 30, textAlign: 'center', fontWeight: 600, paddingTop: 10 }}>
                                Ricardo António
                         </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        );
    }
}


