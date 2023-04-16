import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';

const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(true);
  const connectionData = {
    appId: '2bd6ec4091d842cf9c4c35dfe7fc7f1c',
    channel: 'test',
  };
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };
  return videoCall ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  ) : null;
};

export default VideoCall;
