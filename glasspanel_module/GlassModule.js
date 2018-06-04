import React from 'react';
import ReactDOM from 'react-dom';
import {Module} from 'react-360-web';
import MuteButton from "./MuteButton";


// Example implementation of a dom overlay. This is useful on web and mobile.

const WRAPPER_STYLES = {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    pointerEvents: 'none',
    userSelect: 'none',
};
const BUTTON_WRAPPER_STYLES = {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: '100%',
    height: '40px',
    marginTop: '-20px',
    padding: '5px',
    position: 'absolute',
    left: '15px',
    top: '80px',
    width: '40px',
};


const BUTTON_STYLES = {
    cursor: 'pointer',
    pointerEvents: 'initial',
    width: '100%',
    height: '100%',
    transformOrigin: '50% 50%',
};

export default class GlassModule extends Module {
    constructor(ctx, overlayContainer) {
        super('GlassModule');
        this._overlayContainer = overlayContainer;
        this._ctx = ctx;
        this.environmentalOnOff = this.environmentalOnOff.bind(this);
    }

    environmentalOnOff(vol) {
        if (this._ctx) {
            this._ctx.callFunction('RCTDeviceEventEmitter', 'emit', ['mutetoggle',vol]);
        }
    }


    openOverlay() {
        ReactDOM.render(
            <div style={WRAPPER_STYLES}>
                <MuteButton wrapperStyle={BUTTON_WRAPPER_STYLES} buttonStyle={BUTTON_STYLES}
                               icons={["/static_assets/Audio.png","/static_assets/Mute.png"]}
                               value={true} callback={this.environmentalOnOff}/>
            </div>,
            this._overlayContainer);
    }
}