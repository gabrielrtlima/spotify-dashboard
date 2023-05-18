import { getAccessToken } from "../../services/AuthService"
import { General } from "./components/general"
import { Me } from "./components/me"
import { Player } from "./components/player"
import { Queue } from "./components/queue"

export const Home = () => {
  const token = getAccessToken()
      
  return (
    <div className="h-screen">
      <div className="py-0.5 px-1 grid grid-cols-6 gap-0.5 bg-gray-900 h-5/6">
        <Queue token={token} />
        <General token={token} />
        <Me token={token} />
      </div>
      <Player token={token} />
    </div>
  )
}