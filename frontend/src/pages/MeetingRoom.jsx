import { useNavigate, useParams } from 'react-router-dom'
import { dummyMeetingDetails, dummyUser } from '../assets/asset';
import { useCallback, useState } from 'react';
import useWebRTC from '../hooks/useWebRTC.js';
import VideoGrid from '../components/meeting/VideoGrid.jsx';
import ChatPanel from '../components/meeting/ChatPanel.jsx';
import ParticipantsList from '../components/meeting/ParticipantsList.jsx';
import ControlBar from '../components/meeting/ControlBar.jsx'
import { useChat } from '../hooks/useChat.js';
import toast from 'react-hot-toast';

const MeetingRoom = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const isHost = true;
  const userData = dummyUser;

  const handleMeetingEnded = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  // Initialize WebRTC
  const { localStream, remoteUsers, audioEnabled, videoEnabled, toggleAudio, toggleVideo, endMeeting } = useWebRTC(meetingId, userData, handleMeetingEnded);

  // Initialize Chat
  const { messages, sendMessage, unreadCnt, isChatOpen, toggleChat } = useChat(meetingId, userData);

  const handleLeave = () => {
    toast("You left the meeting");
    navigate('/dashboard');
  }

  const handleEndMeeting = () => {
    endMeeting();
    toast("Meeting ended for all participants");
    navigate('/dashboard');
  }

  return (
    <div className='h-screen w-screen bg-slate-100  text-slate-900 flex flex-col overflow-hidden relative font-sans'>
      {/* Top bar */}
      <header className='w-full bg-white/90 backdrop-blur-md px-6 py-3 border-b border-slate-200 flex items-center
        justify-between z-30 shadow-xs'>
        <div className='flex items-center gap-2'>
          <h2 className='text-base font-semibold text-slate-900 tracking-tight'>
            {dummyMeetingDetails.title} ({meetingId || dummyMeetingDetails.meetingId})
          </h2>
          <span className='size-1.5 rounded-full bg-emerald-500 animate-pulse' />
        </div>
      </header>

      {/* Main content area (Video grid + side panels) */}
      <div className='flex-1 flex overflow-hidden relative'>
        {/* Video grid center */}
        <VideoGrid localStream={localStream} localUser={userData} remoteUsers={remoteUsers} audioEnabled={audioEnabled} videoEnabled={videoEnabled} />

        {/* In-Meeting chat panel */}
        <ChatPanel isOpen={isChatOpen} onClose={toggleChat} messages={messages} onSendMessage={sendMessage} currentUser={userData} />

        {/* participants panel */}
        <ParticipantsList isOpen={isParticipantsOpen} onClose={() => setIsParticipantsOpen(false)} localUser={userData} localAudio={audioEnabled}
          localVideo={videoEnabled} remoteUsers={remoteUsers} meetingHostId={dummyUser.id} />
      </div>

      {/* Bottom floating control bar */}
      <ControlBar roomId={meetingId || dummyMeetingDetails.meetingId} audioEnabled={audioEnabled} videoEnabled={videoEnabled}
        onToggleAudio={toggleAudio} onToggleVideo={toggleVideo} onToggleChat={toggleChat} isChatOpen={isChatOpen} unreadCnt={unreadCnt}
        onToggleParticipants={() => setIsParticipantsOpen((prev) => !prev)} isParticipantsOpen={isParticipantsOpen} isHost={isHost}
        participantsCnt={remoteUsers.length + 1} onLeave={handleLeave} onEndMeeting={handleEndMeeting} />
    </div>
  )
}

export default MeetingRoom