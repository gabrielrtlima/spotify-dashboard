import { useEffect, useState } from "react"
import { FaPlay, FaPause } from 'react-icons/fa'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb"

export const Player = (props: any) => {
  const [currentPlaying, setCurrentPlaying] = useState<any>({})
  const [timePlaying, setTimePlaying] = useState<any>(12)
  const [timeTotal, setTimeTotal] = useState<any>(0)
  const [progress, setProgress] = useState<any>(0)


  useEffect(() => {
    fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    })
    .then(res => res.json())
    .then(data => {
      setCurrentPlaying(data)
      var time = musicTime(data.item.duration_ms, data.progress_ms)
      setTimePlaying(time)
      setTimeTotal(convertMs(data.item.duration_ms))
      setProgress(convertMs(data.progress_ms))
    })

  })

  const playerHandler = () => {
    if(currentPlaying.is_playing){
      fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + props.token
        }
      })
    } else {
      fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + props.token
        }
      })
    }
  }

  const previusTrack = () => {
    fetch('https://api.spotify.com/v1/me/player/previous', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    })
  }

  const nextTrack = () => {
    fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    })
  }

  return(
    <div className="bg-gray-800 h-1/6 p-2 grid grid-cols-3 ">
      <div className="flex gap-2 items-center">
        <img src={currentPlaying.item ? currentPlaying.item.album.images[0].url : ''} alt="album" className="w-20 h-20 rounded-xl"/>
        <div className="flex flex-col">
          <p className="text-gray-400 font-sans text-sm">{currentPlaying.item ? currentPlaying.item.name : ''}</p>
          <p className="text-green-400 font-sans text-sm">{currentPlaying.item ? currentPlaying.item.artists[0].name : ''}</p>
        </div>
      </div>      
      <div className="flex flex-col justify-center items-center ">
        <div className="flex gap-12 items-center justify-center py-7">
          <TbPlayerTrackPrev size={32} onClick={previusTrack} className={"cursor-pointer"}/>
          {currentPlaying.is_playing ? <FaPause size={32} onClick={playerHandler} className={"cursor-pointer"}/> : <FaPlay size={32} onClick={playerHandler} className={"cursor-pointer"}/>}
          <TbPlayerTrackNext size={32} onClick={nextTrack} className={"cursor-pointer"}/>
        </div>
        <div className="flex rounded-xl bg-gray-600 h-2" style={{width: "24rem"}}>
          <div className="flex items-center">
            <div style={{width: `${timePlaying}rem`}}/>
            <div className="rounded-full h-4 w-4 bg-green-500"/>
          </div>
        </div>
        <div style={{width: "24rem"}} >
          <div className="flex justify-between">
          {currentPlaying.item ? <p className="text-gray-400 font-sans text-sm">{progress}</p> : ''}
          {currentPlaying.item ? <p className="text-gray-400 font-sans text-sm">{timeTotal}</p> : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

const musicTime = (finalTime: number, timeNow: number) => {
  var musicTime = (timeNow * 24) / finalTime
  return musicTime
}

const convertMs = (ms: number) => {
  const date = new Date(ms);

  const formattedTime = date.toISOString().substr(11, 8).slice(3,8);
  return formattedTime;
}