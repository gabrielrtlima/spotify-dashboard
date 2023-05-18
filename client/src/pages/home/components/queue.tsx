import { useEffect, useState } from "react"

export const Queue = (props: any) => {
  const [queue, setQueue] = useState<any>([])
  
  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/player/queue", {
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    })
    .then(res => res.json())
    .then(data => {
      setQueue(data.queue)
    })
  })

  return(
    <div className="block bg-opacity-75 rounded-xl col-span-1 bg-gray-800 p-2">
      <h1 className={"font-normal text-gray-400 font-sans text-xl"}>Fila</h1>
      <div className="flex flex-col gap-2 overflow-auto py-2 rounded-xl h-96">
        {queue.map((item: any, index: any) => {
          return (
            <div key={index} className="flex items-center bg-gray-700 rounded-xl my-1">
              <div className="flex flex-col p-2 w-16 h-16 items-center justify-center">
                <img src={item.album.images[0].url} alt="profile" className="rounded-full w-32 h-32 object-cover"/>
              </div>  
              <p className="text-gray-400 font-sans text-sm">{item.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}