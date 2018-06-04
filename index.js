import React from 'react';
import {
    AppRegistry, asset,
    StyleSheet,
    Text,
    View,
    NativeModules,
    VrButton,
} from 'react-360';
const RCTDeviceEventEmitter = require("RCTDeviceEventEmitter");
const {AudioModule} = NativeModules;

export default class AudioTest360 extends React.Component {

    constructor() {
        super();
        this.state = {
            sound: true,
        };
        NativeModules.GlassModule.openOverlay();
        RCTDeviceEventEmitter.addListener('mutetoggle', this.onMuteToggle.bind(this));

    };

    onMuteToggle(vol) {
        console.log("Environmental EMITTER " + vol);
        this.setState({sound: vol});
        this.handleEnvironmentalAudio();
    };

    componentDidMount() {
        this.handleEnvironmentalAudio();
    };

    handleEnvironmentalAudio() {
        console.log("handleEnvironmentalAudio");
        if (this.state.sound) {
            AudioModule.playEnvironmental({
                source: asset("mario.mp3"),
                loop: true,
                muted: false,
                volume: 1,
            });
        }
        else {
            AudioModule.stopEnvironmental();
        }
    }

  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Welcome to React 360
          </Text>
            <VrButton
                style={styles.postButton}
                onEnter={() => this.setState({hover: true})}
                onExit={() => this.setState({hover: false})}
                onClick={() => {
                    this.onMuteToggle(this.state.sound);
                }}>
                <View style={[styles.postButtonInfo, this.state.hover ? styles.postButtonInfoHover : null]}>
                    <View style={styles.postButtonLabel}>
                        <Text style={styles.postButtonName}>{this.state.sound?"Stop":"Play"}</Text>
                    </View>
                </View>
            </VrButton>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
    wrapper: {
        width: 300,
        height: 600,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: '#303050',
        borderWidth: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    postButton: {
        height: 120,
        backgroundColor: '#000000',
        overflow: 'hidden',
    },
    postButtonInfo: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'column',
    },
    postButtonPreview: {
        width: '100%',
        height: 225,
    },
    postButtonInfoHover: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    postButtonLabel: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
    },
    postButtonName: {
        fontSize: 24,
    },
    postButtonAuthor: {
        fontSize: 16,
    }
});

AppRegistry.registerComponent('AudioTest360', () => AudioTest360);
