import React from 'react';

const formattedSeconds = (sec) => 
    Math.floor(sec / 60) +
    ':' +
    ('0' + sec % 60).slice(-2)


export default class Stopwatch extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            secondsElapsed: 0, 
            laps: [],
            lastClearedIncrementer: null
        };
        this.incrementer = null;  
        
        
    }  

    componentWillUnmount(){
        this.handleStopClick()
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.start_time != null && this.incrementer == null){         
            var start_time = parseInt(((new Date()- new Date(nextProps.start_time)) /1000).toFixed(0));
            this.setState({secondsElapsed: start_time});
            this.handleStartClick();
        }
        if(nextProps.finished_time != null && this.incrementer != null){
            var finished_time = parseInt(((new Date(nextProps.finished_time)-new Date(nextProps.start_time)) /1000).toFixed(0));
            this.setState({secondsElapsed: finished_time});
            this.handleStopClick();
        }       
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
        this.incrementer = 0;
        this.setState({
            lastClearedIncrementer: this.incrementer
        });
        console.log("timer stopped!")
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
            <div id="timer">{formattedSeconds(this.state.secondsElapsed)}</div>
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