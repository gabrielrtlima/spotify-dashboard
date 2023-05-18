import { useEffect, useState } from "react";
import './../../../App.css'

export const Me = (props: any) => {
  const [me, setMe] = useState<any>({});
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    })
    .then(res => res.json())
    .then(data => {
      setMe(data)
    })

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    })
    .then(res => res.json())
    .then(data => {
      setPlaylists(data.items)
    }
    )
  }, [])

  return (
    <div className={"bg-opacity-75 col-span-1 rounded-xl flex flex-col bg-gray-800 content-center items-center py-5"}>
      <img src={me.images ? me.images[0].url : ''} alt="profile" className="rounded-full w-32 h-32 object-cover"/>
      <h1 className={"font-normal text-gray-400 font-sans text-xl"}>{me.display_name}</h1>
      <div className="w-5/6 py-4">
        <p className={"font-normal text-gray-400 font-sans text-sm"}>Seguidores: <span className="text-green-500">{me.followers ? me.followers.total : ''}</span></p>
        {me.product ? <p className={"font-normal text-gray-400 font-sans text-sm"}>Plano: <span className="text-green-500">{me.product.toUpperCase()}</span></p> : ''}
      </div>
      <div className="w-5/6 h-80 flex flex-col gap-2">
        <h1 className={"font-normal text-gray-400 font-sans text-xl"}>Playlists</h1>
        <div className="flex-col overflow-auto h-full py-2 rounded-xl">
          {playlists.map((playlist, index) => {
            return (
              <div key={index} className="flex bg-gray-700 rounded-xl my-1">
                <div className="p-2">
                  <p className="text-gray-400 font-sans text-sm">{playlist.name}</p>
                  <p className="text-gray-400 font-sans text-sm"><span className="text-green-500">{playlist.tracks.total}</span> músicas</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}