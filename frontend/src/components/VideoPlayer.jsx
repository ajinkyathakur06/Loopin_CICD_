
import React from 'react';
import { FaVolumeHigh, FaVolumeXmark} from "react-icons/fa6";
import { useRef,useState } from 'react';


const VideoPlayer = ({media}) => {
    const videoTag=useRef();
    const [mute,setMute]=useState(true);
    const [isPlaying,setIsPlaying]=useState(true);

const handleClick=()=>{
    if(isPlaying){
        videoTag.current.pause();
        setIsPlaying(false);
    }else{
        videoTag.current.play();
        setIsPlaying(true);
    }
}   

    return (
      <div className="h-[100%] relative cursor-pointer max-w-full rounded-2xl overflow-hidden">
        <video
          ref={videoTag}
          src={media}
          type="video/mp4"
          autoPlay
          loop
          muted={mute}
          className="h-[100%] relative  
            cursor-pointer w-full object-cover rounded-2xl overflow-hidden "
          onClick={handleClick}
        />

        <div className='absolute bottom-[10px] right-[10px] ' onClick={()=>setMute(prev=>!prev)}>
            {mute ? <FaVolumeHigh /> : <FaVolumeXmark />}
            </div>
      </div>
    );
};

export default VideoPlayer;