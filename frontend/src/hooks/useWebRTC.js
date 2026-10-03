import { useCallback, useEffect, useRef, useState } from "react";
import { dummyRemoteParticipants } from "../assets/asset";
import toast from "react-hot-toast";

const useWebRTC = (_roomId, user, onMeetingEnded, _enabled = true) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState(dummyRemoteParticipants);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const localStreamRef = useRef(null);

  // Initialize local camera stream if available in browser
  const initLocalStream = useCallback(async () => {
    try {
      if (navigator?.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;
        setLocalStream(stream);
        return stream;
      }
    } catch (_err) {
      console.log("Mock WebRTC: Running in camera preview in fallback mode");
    }
    return null;
  }, []);

  useEffect(() => {
    initLocalStream();
    return () => {
      if (localStreamRef.current?.getTracks) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [initLocalStream]);

  // Toggle local microphone
  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = newState;
      }
    }
    toast(newState ? "Microphone Unmuted" : "Microphone muted");
  };

  const toggleVideo = () => {
    const newState = !videoEnabled;
    setVideoEnabled(newState);
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = newState;
      }
    }
    toast(newState ? "Camera turned on" : "Camera turned off");
  };

  // End meeting for everyone
  const endMeeting = useCallback(() => {
    if (onMeetingEnded) {
      onMeetingEnded("Meeting Ended");
    }
  }, [onMeetingEnded]);

  return {
    localStream,
    remoteUsers,
    audioEnabled,
    videoEnabled,
    toggleAudio,
    toggleVideo,
    endMeeting
  }
};

export default useWebRTC;
