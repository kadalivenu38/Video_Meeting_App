import {MessageSquareIcon} from 'lucide-react'

const SessionChatTab = ({ messages = [] }) => {
    if(messages.length === 0){
        return (
            <div className='h-full flex flex-col items-center justify-center text-slate-400 text-sm py-12'>
                <MessageSquareIcon className='size-5 mb-2 text-slate-300'/>
                <p>No chat messages were recorded in this meeting session.</p>
            </div>
        )
    }
    
    return (
        <div className='space-y-1'>
            {messages.map((msg, idx) => (
                <div key={idx} className='bg-slate-100 px-4 py-2 rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <span className='text-xs font-semibold text-slate-800'>{msg.senderName}</span>
                        <span className='text-[10px] text-slate-400'>
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </span>
                    </div>
                    <p className='text-sm text-slate-700 font-normal leading-relaxed'>{msg.text}</p>
                </div>
            ))}
        </div>
    )
}

export default SessionChatTab