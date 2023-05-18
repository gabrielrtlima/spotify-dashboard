import { Link } from 'react-router-dom'
import { ImSpotify } from 'react-icons/im'

function App() {
  console.log(import.meta.env.VITE_REACT_APP_API_URL)

  return (
    <div className={"w-screen h-screen items-center flex bg-green-600"}>
      <div className={"w-screen flex flex-col items-center justify-center gap-3"}>
          <ImSpotify size={200} color={"white"}/>
          <div className={"w-96 items-center flex flex-col gap-12 p-5 rounded-lg "}>
              <h1 className={"font-sans text-3xl text-gray-900"}>SPOTIFY DASHBOARD</h1>
              <button className={"rounded-full bg-gray-900 p-4 flex gap-2"} >
                  <Link className={"text-green-600 font-sans"} to={`${import.meta.env.VITE_REACT_APP_API_URL}/login`}>ENTRAR</Link>
              </button>
          </div>
      </div>
    </div>
  )
}

export default App
