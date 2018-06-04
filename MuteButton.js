import React from 'react';

export default class MuteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIcon: props.icons[0],
            value: props.value || true,
        };
    }

    render() {
        return (
            <div style={this.props.wrapperStyle} onClick={() => {
                this.state.value = !this.state.value;
                this.props.callback(this.state.value);
                if (this.state.value)
                    this.state.activeIcon = this.props.icons[0];
                else
                    this.state.activeIcon = this.props.icons[1];

                this.setState(this.state);
            }}>
                <img src={this.state.activeIcon} style={this.props.buttonStyle}/>
            </div>
        );
    }
}