import { useEffect, useState } from 'react'
import { ShieldCheckIcon, PlusIcon, KeyboardIcon, ArrowRightIcon } from 'lucide-react'
import { dummyStats, dummyUser } from '../assets/asset';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const user = dummyUser;
  const userName = user.fullName;
  const userEmail = user.primaryEmailAddress.emailAddress;
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [currTime, setCurrTime] = useState(new Date());
  const [joinId, setJoinId] = useState("");
  const stats = dummyStats;

  useEffect(() => {
    const timer = setInterval(() => setCurrTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const MEETING_ID_PATTERN = /^[a-z0-9]{4}(?:-[a-z0-9]{4}){2}$/;

  const generateMeetingId = () => {
    const randomValues = new Uint32Array(12);
    crypto.getRandomValues(randomValues);

    return Array.from(randomValues, (value) => (value % 36).toString(36))
      .join('')
      .match(/.{1,4}/g)
      .join('-');
  };

  const handleCreateMeeting = () => {
    if (isCreating) return;

    setIsCreating(true);
    try {
      const newMeetingId = generateMeetingId();
      setIsCreating(false);
      toast.success("Meeting Created");
      navigate(`/meeting/${newMeetingId}`);
    } catch {
      setIsCreating(false);
      toast.error("Unable to create a meeting. Please try again.");
    }
  };

  const handleJoinMeeting = (event) => {
    event.preventDefault();

    if (isCreating) return;

    const meetingId = joinId.trim().toLowerCase();
    if (!MEETING_ID_PATTERN.test(meetingId)) {
      toast.error("Enter a valid meeting ID, such as a1b2-c3d4-e5f6.");
      return;
    }

    navigate(`/meeting/${encodeURIComponent(meetingId)}`);
  };

  return (
    <div className='flex-1 max-w-7xl w-full mx-auto p-6 md:p-12 flex flex-col justify-center'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>

        {/* Left Column - Actions */}
        <div className='lg:col-span-7 space-y-8'>
          <div className='space-y-3'>

            <div className='inline-flex items-center gap-2 px-4 py-4 rounded-full bg-white/25 text-sm font-medium'>
              <ShieldCheckIcon size={16} />
              Secure Peer-to-Peer Encryption
            </div>

            <h1 className='text-4xl sm:text-5xl text-slate-800 leading-tight font-medium'>
              High quality video calls.<br />
              <span className='text-primary'>Built for everyone.</span>
            </h1>

            <p className='text-slate-700 text-base sm:text-lg max-w-xl leading-relaxed'>
              Connect, collaborate, and celebrate from anywhere with ultra-low latency video, screen sharing, and real-time chat.
            </p>

            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2'>

              <button className='bg-primary hover:bg-primary-hover text-white font-medium px-6 py-3 rounded-full
                shadow-md shadow-primary/20 flex items-center justify-center gap-2 transition-all cursor-pointer
                disabled:opacity-50' disabled={isCreating} onClick={handleCreateMeeting}>
                <PlusIcon size={18} />
                <span>{isCreating ? "Creating..." : "New Meeting"}</span>
              </button>

              <form onSubmit={handleJoinMeeting} className='flex-1 flex items-center gap-2'>
                <div className='relative flex-1'>
                  <KeyboardIcon className='w-5 h-5 text-primary/90 absolute left-4 top-1/2 -translate-y-1/2' />
                  <input type="text" value={joinId} onChange={(e) => setJoinId(e.target.value)} placeholder='Enter meeting code (e.g: abc-def-ghi)'
                    className='w-full bg-white/75 border border-primary-border/80 focus:border-primary/60 focus:ring-1
                   focus:ring-primary/60 rounded-full pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400
                   outline-none transition-colors'/>
                </div>

                <button type='submit' disabled={!joinId.trim()} className='bg-slate-900 hover:bg-slate-800 disabled:opacity-40
                  disabled:hover:bg-slate-900 text-white font-medium px-6 py-3 rounded-full transition-all flex items-center
                  justify-center cursor-pointer shadow-xs'>
                  <span>Join</span>
                  <ArrowRightIcon className='w-4 h-4 ml-1.5' />
                </button>
              </form>

            </div>
          </div>
        </div>

        {/* Right Column - Hero Graphic & Clock Card */}
        <div className='lg:col-span-5 flex flex-col items-center justify-center space-y-4'>
          <div className='w-full bg-white/25 backdrop-blur rounded-4xl p-8 border border-slate-200 text-center
            space-y-6 relative overflow-hidden'>

            <div className='space-y-1'>
              <p className='mb-5 text-xl text-left'>Hi, <span className='font-medium'>{userName}</span></p>

              <h2 className='text-xl xl:text-3xl text-slate-900 tracking-wide'>
                {currTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </h2>
              <p className='font-medium tracking-wide text-primary'>
                {currTime.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>

            <div className=' border-t text-sm text-slate-600'>
              <div className='flex items-center justify-between py-4 px-6'>
                <p>Logged In as: <span className='text-slate-900'>{userEmail}</span></p>
                <span className={`px-4 py-1 rounded-full font-semibold text-xs uppercase
                  ${stats?.plan === "premium" ? "bg-blue-700 text-white" : "bg-white/70 text-slate-800"}`}>
                  {stats?.plan || "Free"}
                </span>
              </div>

              {stats && (
                <div className='w-full bg-white/50 rounded-2xl px-5 py-4 border border-slate-100'>
                  <div className='flex items-center justify-between text-sm'>
                    <span>Monthly Meetings</span>
                    <span className='text-xs text-slate-600 font-mono'>
                      {stats.monthlyLimit ? `${stats.monthlyCount} / ${stats.monthlyLimit} Used` : `${stats.monthlyCount} Created (Unlimited)`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard