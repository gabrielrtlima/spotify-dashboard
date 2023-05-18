import { useEffect, useState } from "react";

export const General = (props: any) => {
  const [topItems, setTopItems] = useState<any[]>([]);
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [recentPlayeds, setRecentPlayeds] = useState<any[]>([]);

  const addToQueue = (uri: string) => {
    fetch('https://api.spotify.com/v1/me/player/queue?uri=' + uri, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    }).finally(() => {
      fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + props.token
        }
      })
    })
  }

  useEffect(() => {
    fetch('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    })
    .then(res => res.json())
    .then(data => {
      setTopItems(data.items)
    })

    fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.items)
      setTopTracks(data.items)
    })

    fetch('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.items)
      setRecentPlayeds(data.items)
    })
  }, [])
  
  return(
    <div className="bg-opacity-75 overflow-auto rounded-xl col-span-4 bg-gray-800 p-3">
      <h1 className={"font-normal text-gray-400 font-sans text-xl"}>Top Artistas</h1>
      <div className="flex gap-2 overflow-auto py-2 rounded-xl">
        {topItems.map((item, index) => {
          return (
            <div key={index} className="flex items-center bg-gray-700 rounded-xl my-1 ">
              <div className="flex flex-col p-2 w-48 h-52 items-center justify-center">
                <img src={item.images[0].url} alt="profile" className="rounded-full w-32 h-32 object-cover"/>
                <p className="text-gray-400 font-sans text-sm">{item.name}</p>
                <p className="text-gray-400 font-sans text-sm"><span className="text-green-500">{item.genres[0]}</span></p>
              </div>
            </div>
          )
        })}
      </div>
      <h1 className={"font-normal text-gray-400 font-sans text-xl"}>Top Músicas</h1>
      <div className="flex gap-2 overflow-auto py-2 rounded-xl">
        {topTracks.map((track, index) => {
          return (
            <div key={index} onClick={(() => addToQueue(track.uri))} className="flex items-center bg-gray-700 rounded-xl my-1 cursor-pointer" >
              <div className="flex flex-col p-2 w-48 h-64 items-center justify-center">
                <img className="rounded-xl w-32 h-32" src={track.album.images[0].url} alt=""/>
                <p className="text-gray-400 font-sans text-sm py-1">{track.name}</p>
                <p className="text-gray-400 font-sans text-sm"><span className="text-green-500">{track.artists[0].name}</span></p>
              </div>
            </div>
          )
        })}
      </div>
      <h1 className={"font-normal text-gray-400 font-sans text-xl"}>Tocadas Recentementes</h1>
      <div className="flex gap-2 overflow-auto py-2 rounded-xl">
        {recentPlayeds.map((recentPlayed, index) => {
          return (
            <div key={index} onClick={(() => addToQueue(recentPlayed.track.uri))} className="flex items-center bg-gray-700 rounded-xl my-1 cursor-pointer">
              <div className="flex flex-col p-5 w-48 h-64 content-center items-center justify-center">
                <img className="rounded-xl w-32 h-32" src={recentPlayed.track.album.images[0].url} alt=""/>
                <p className="text-gray-400 font-sans text-sm">{recentPlayed.track.name}</p>
                <p className="text-gray-400 font-sans text-sm"><span className="text-green-500">{recentPlayed.track.artists[0].name}</span></p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}