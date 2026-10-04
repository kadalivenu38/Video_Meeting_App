import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from 'lucide-react';
import { useState } from "react";
import { dummySessions } from "../assets/asset.js";
import EmptySession from "../components/sessions/EmptySession.jsx";
import SessionCard from "../components/sessions/SessionCard.jsx";
import SessionDetailsModal from '../components/sessions/SessionDetailsModal.jsx';

const Sessions = () => {
  const [sessions, setSessions] = useState(dummySessions);
  const [selectedSession, setSelectedSession] = useState(null);
  const navigate = useNavigate();

  const openSessionDetails = (sessionId) => {
    const session = sessions.find((s) => s.id === sessionId || s.meetingId === sessionId);
    if(session){
      setSelectedSession(session);
    }
  }

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4">
      {/* Page Title & Navigation Header */}
      <Link to='/dashboard' className="w-fit flex items-center text-sm gap-1.5 mb-4 text-slate-500 hover:text-slate-900
      hover:bg-slate-300 rounded-md px-3 py-1 transition-colors">
        <ArrowLeftIcon size={16} /> Go to Dashboard
      </Link>
      <div className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight text-slate-900">Meeting Sessions.</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review your past and active meeting history, participant logs, and chat transactions.
        </p>
      </div>

      {/* Sessions Grid / Empty State */}
      {sessions.length === 0 ? (
        <EmptySession />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session)=> (
            <SessionCard key={session.id} session={session} onOpenDetails={openSessionDetails}
            onRejoin={(meetingId)=> navigate(`/meeting/${meetingId}`)}/>
          ))}
        </div>
      )}

      {/* Session detail modal */}
      <SessionDetailsModal session={selectedSession} onClose={()=> setSelectedSession(null)}/>
    </main>
  )
}

export default Sessions