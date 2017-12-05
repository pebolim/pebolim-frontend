import React from 'react';
import { Image, Grid } from 'semantic-ui-react';

export default class Home extends React.Component {

    render() {
        return (
            <Grid>
                <Grid.Row centered stretched>
                    <Image src={require('../assets/images/bannerPEBOLIM.png')} />
                </Grid.Row>
                <Grid.Row>
                    <div style={{ fontSize: 50, fontFamily: 'Teko', fontWeight: 600, paddingLeft: 50, paddingTop: 25 }}>
                        About us...
                    </div>
                    <div style={{ fontSize: 20, paddingLeft: 25, paddingTop: 30 }}>
                        We are a bunch of nerds who also play table football, so we wanted to create a platform that could help us organize and gather data about our games, so we came up with Pebolim to resolve those problems.
                    </div>
                </Grid.Row>
                <Grid.Row centered columns={4} style={{ paddingTop: 30 }}>
                    <Grid.Column>
                        <Image src={require('../assets/images/creatorImage.png')} />
                        <div style={{ fontSize: 30, textAlign: 'center', fontWeight: 600, paddingTop: 10 }}>
                            Nabo1
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <Image src={require('../assets/images/creatorImage.png')} />
                        <div style={{ fontSize: 30, textAlign: 'center', fontWeight: 600, paddingTop: 10 }}>
                            Nabo2
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <Image src={require('../assets/images/creatorImage.png')} />
                        <div style={{ fontSize: 30, textAlign: 'center', fontWeight: 600, paddingTop: 10 }}>
                            Nabo3
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row centered columns={4} style={{ paddingTop: 30 }}>
                    <Grid.Column>
                        <Image src={require('../assets/images/creatorImage.png')} />
                        <div style={{ fontSize: 30, textAlign: 'center', fontWeight: 600, paddingTop: 10 }}>
                            Nabo4
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <Image src={require('../assets/images/creatorImage.png')} />
                        <div style={{ fontSize: 30, textAlign: 'center', fontWeight: 600, paddingTop: 10 }}>
                            Nabo5
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        );
    }
}


