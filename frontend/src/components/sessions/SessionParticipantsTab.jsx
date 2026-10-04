import { CrownIcon } from 'lucide-react';

const SessionParticipantsTab = ({ participants = [], host }) => {
    if (participants.length === 0) {
        return (
            <div className='h-full flex flex-col items-center justify-center text-slate-400 text-sm py-12'>
                <MessageSquareIcon className='size-5 mb-2 text-slate-300' />
                <p>No participant logs recorded.</p>
            </div>
        )
    }

    const hostId = host?.id;

    return (
        <div className='space-y-1'>
            {participants.map((p, idx) => {
                const participantId = p.user?.id || p.user;
                const isHost = Boolean(hostId && participantId && hostId.toString() === participantId.toString());

                return (
                    <div key={idx} className='flex items-center justify-between px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-100'>
                        <div className='flex items-center gap-3'>

                            <div className='size-8 rounded-full bg-cyan-50 border border-cyan-200 text-primary font-bold
                            flex items-center justify-center text-sm'>
                                {p.name ? p.name.charAt(0).toUpperCase() : "?"}
                            </div>

                            <div>
                                <span className='text-sm font-semibold text-slate-800 flex items-center gap-1.5'>
                                    {p.name}
                                    {isHost && <CrownIcon className='size-4 text-amber-500' title="Host" />}
                                </span>
                                {p.user?.email && <span className='text-xs text-slate-400'>{p.user.email}</span>}
                            </div>
                        </div>
                        
                        <span className='text-xs text-slate-500 font-mono'>
                            Joined: {new Date(p.joinedAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default SessionParticipantsTab