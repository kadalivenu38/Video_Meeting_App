import React, { useEffect, useRef } from 'react'

const VideoTile = ({ stream, name, isLocal = false, audioEnabled = true, videoEnabled = true}) => {
    const videoRef = useRef(null);

    useEffect(()=>{
        if(videoRef.current && stream){
            videoRef.current.srcObject = stream;
        }
    }, [stream])

    return (
        <div className='relative w-full h-full min-h-50 bg-slate-900 rounded-2xl overflow-hidden border
        border-slate-800 shadow-md flex items-center justify-center group'>
            {/* Video Element */}
            <video ref={videoRef} autoPlay playsInline muted={isLocal}className={`w-full h-full object-cover transition-opacity
            duration-300 ${videoEnabled ? "opacity-100" : "opacity-0 pointer-events-none absolute"} ${isLocal ? "-scale-x-100" : ""}`}/>

            {/* Camera off placeholder */}
        </div>
    )
}

export default VideoTile