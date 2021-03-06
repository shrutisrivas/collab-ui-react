import React from 'react';
import PropTypes from 'prop-types';
import DeviceListCall from './DeviceListCall';
import {
  Avatar,
  Button,
  Icon
} from '@collab-ui/react';

/**
 * @category communication
 * @component alert-call
 * @variations collab-ui-react
 */

const AlertCall = props => {
  const {
    avatar,
    caller,
    defaultSelectedDevice,
    deviceListHeader,
    devices,
    onAnswerVideo,
    onAnswerVoice,
    onDeviceSelect,
    onReject,
    rejectAriaLabel,
    show,
    title,
    videoAriaLabel,
    voiceAriaLabel,
  } = props;

  const getAvatar = () => {
    if (avatar) {
      return avatar;
    } else {
      switch(caller.type) {
        case 'number': return <Avatar title='#' alt={caller.title} size='xlarge'/>;
        case 'device': return <Avatar icon={<Icon name='spark-board_32' />} alt={caller.title} size='xlarge'/>;
        default: return <Avatar title={caller.title} alt={caller.title} size='xlarge'/> ;
      }
    }
  };

  const getDeviceList = () => {
    return devices.length > 0 && (
      <DeviceListCall
        devices={devices}
        header={deviceListHeader}
        onSelect={onDeviceSelect}
        defaultSelected={defaultSelectedDevice}
      />
    );
  };

  return (
    show && (
      <div className='cui-alert cui-alert--call'>
        <div className='cui-alert__title'>
          {title}
        </div>
        <div className='cui-alert__caller'>
          {getAvatar()}
          <div className='cui-alert__caller-title'>
            {caller.title}
          </div>
          <div className='cui-alert__caller-subtitle'>
            {caller.alt}
          </div>
        </div>
        {getDeviceList()}
        <div className='cui-alert--call--buttons'>
          <Button
            children={<Icon name='camera_24'/>}
            onClick={onAnswerVideo}
            ariaLabel={videoAriaLabel}
            color='green'
            circle
            size={44}
          />
          {onAnswerVoice &&
            <Button
              children={<Icon name='handset_24'/>}
              onClick={onAnswerVoice}
              ariaLabel={voiceAriaLabel}
              color='green'
              circle
              size={44}
            />
          }
          <Button
            children={<Icon name='cancel_24'/>}
            onClick={onReject}
            ariaLabel={rejectAriaLabel}
            color='red'
            circle
            size={44}
          />
        </div>
      </div>
    )
  );
};

AlertCall.defaultProps = {
  avatar: null,
  caller: null,
  defaultSelectedDevice: 0,
  deviceListHeader: 'Device selection',
  devices: [],
  onAnswerVideo: null,
  onAnswerVoice: null,
  onDeviceSelect: null,
  onReject: null,
  rejectAriaLabel: 'reject call',
  title: '',
  videoAriaLabel: 'answer call with voice and video',
  voiceAriaLabel: 'answer call with voice only',
};

AlertCall.propTypes = {
  /**
   * optional avatar prop
   */
  avatar: PropTypes.node,
  /**
   * required caller object
   */
  caller: PropTypes.shape({
    title: PropTypes.string.isRequired,
    alt: PropTypes.string,
    src: PropTypes.string,
    type: PropTypes.oneOf(['', 'number', 'device']),
  }).isRequired,
  /**
   * optional default selected device
   */
  defaultSelectedDevice: PropTypes.number,
  /**
   * optional header string for device selection list
   */
  deviceListHeader: PropTypes.string,
  /**
   * optional list of devices to answer call with.
   */
  devices: PropTypes.array,
  /**
   * callback function invoked when the video button is clicked.
   */
  onAnswerVideo: PropTypes.func,
  /**
   * callback function invoked when the handset button is clicked.
   */
  onAnswerVoice: PropTypes.func,
  /**
   * optional callback function when device is selected
   */
  onDeviceSelect: PropTypes.func,
  /**
   * callback function invoked when the reject button is clicked.
   */
  onReject: PropTypes.func,
  /**
   * optional aria-label reject
   */
  rejectAriaLabel: PropTypes.string,
  /**
   * required show/hide AlertCall.
   */
  show: PropTypes.bool.isRequired,
  /**
   * optional title of AlertCall
   */
  title: PropTypes.string,
    /**
   * optional aria-label video
   */
  videoAriaLabel: PropTypes.string,
  /**
   * optional aria-label voice
   */
  voiceAriaLabel: PropTypes.string,
};

AlertCall.displayName = 'AlertCall';

export default AlertCall;

/**
* @name Call
* @description Control the avatar type by passing in the type of caller to the caller.type prop.  There can only be 2 Call Alerts active at one time.
*
* @category communication
* @component alert
* @section call
*
* @js

import {
  Button,
  AlertCall,
  AlertCallContainer
} from '@collab-ui/react';
import {
  uniqueId,
  reject
} from 'lodash';

export default class Default extends React.PureComponent {
  state = {
    alertList: [],
    caller: {title: 'Jefe Guadelupe', alt: '+ 1 972-555-1212'},
    devices: [
      {name: 'SJC21-Babelfish', value: '1010101', type: 'device'},
      {name: 'Use my computer', value: '2020202'}
    ]
  }

  handleOnReject = key => {
    console.log(`onRejectCall ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  handleOnAnswerVoice = key => {
    console.log(`onAnswerVoice ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  handleOnAnswerVideo = key => {
    console.log(`onAnswerVideo ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  renderPersonCaller = () => {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title='Incoming Call'
        caller={this.state.caller}
        onReject={() => this.handleOnReject(key)}
        onAnswerVoice={() => this.handleOnAnswerVoice(key)}
        onAnswerVideo={() => this.handleOnAnswerVideo(key)}
        onDeviceSelect={() => console.log("onDeviceSelect")}
        show
      />
    );
  };

  renderDeviceCaller = () => {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title='Incoming Call'
        caller={{title: 'SJC21-Babelfish', alt: '+ 1 408-555-1212', type: 'device'}}
        onReject={() => this.handleOnReject(key)}
        onAnswerVoice={() => this.handleOnAnswerVoice(key)}
        onAnswerVideo={() => this.handleOnAnswerVideo(key)}
        onDeviceSelect={() => console.log("onDeviceSelect")}
        show
      />
    );
  };

  renderNumberOnlyCaller = () => {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title='Incoming Call'
        caller={{title: '+ 1 408-555-1212', type: 'number'}}
        onReject={() => this.handleOnReject(key)}
        onAnswerVoice={() => this.handleOnAnswerVoice(key)}
        onAnswerVideo={() => this.handleOnAnswerVideo(key)}
        onDeviceSelect={() => console.log("onDeviceSelect")}
        show
      />
    );
  };

  renderCallerWithDevices = () => {
    const key = uniqueId('call_alert_');
    return (
      <AlertCall
        key={key}
        title='Incoming Call'
        caller={this.state.caller}
        devices={this.state.devices}
        onReject={() => this.handleOnReject(key)}
        onAnswerVoice={() => this.handleOnAnswerVoice(key)}
        onAnswerVideo={() => this.handleOnAnswerVideo(key)}
        onDeviceSelect={() => console.log("onDeviceSelect")}
        show
      />
    );
  };

  render() {
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderPersonCaller()]
                }));
              }}
              children='Person Caller'
              color='primary'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderDeviceCaller()]
                }));
              }}
              children='Device Caller'
              color='primary'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderNumberOnlyCaller()]
                }));
              }}
              children='Number Only Caller'
              color='primary'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderCallerWithDevices()]
                }));
              }}
              children='Caller with Device List'
              color='primary'
            />
          </div>
          <br />
          <AlertCallContainer
            alertList={this.state.alertList}
          />
        </div>
      </section>
    );
  }
}

**/
