import React from 'react';

const formattedSeconds = (sec) => 
    Math.floor(sec / 60) +
    ':' +
    ('0' + sec % 60).slice(-2)


export default class Stopwatch extends React.Component {
    constructor(props) {
        super(props);

        var start_time = parseInt((((new Date().getTime()+ 1*60*1000) - props.start_time) /1000).toFixed(0));
        // console.log("now: "+new Date().getTime()+ ", prop: "+ props.start_time +" Total= "+x)
        this.state = { 
            secondsElapsed: start_time, 
            laps: [],
            lastClearedIncrementer: null
        };
        this.incrementer = null;
        this.handleStartClick();
    }  
    
    handleStartClick() {
        this.incrementer = setInterval( () =>
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1
            })
        , 1000);
    }

    handleStopClick() {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer
        });
    }

    handleResetClick() {
        clearInterval(this.incrementer);
        this.setState({
            secondsElapsed: 0,
            laps: []
        });
    }

    render() {
        return (        
            <div>{formattedSeconds(this.state.secondsElapsed)}</div>
            // {(this.state.secondsElapsed === 0 ||
            //     this.incrementer === this.state.lastClearedIncrementer
            //     ? <Button className="start-btn" onClick={this.handleStartClick.bind(this)}>start</Button>
            //     : <Button className="stop-btn" onClick={this.handleStopClick.bind(this)}>stop</Button>
            // )}
        );
    }
}

// const Button = (props) =>
// <button type="button" {...props} className={"btn " + props.className } />;