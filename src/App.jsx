import React, { useState } from 'react'
import { Route, useNavigate, Routes } from 'react-router-dom'

import 'startbootstrap-freelancer/dist/css/styles.css'

import DashBoard from './pages/DashBoard'
import Home from './pages/Home'
import HostChooseTrivia from './pages/HostChooseTrivia'
import HostLobby from './pages/HostLobby'
import Podium from './pages/Podium'
import Trivia from './pages/Trivia'
import TriviaUser from './pages/TriviaUser'
import UserHome from './pages/UserHome'
import UserLobby from './pages/UserLobby'

let BASE_URL

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'inmental-kahoot-clone.herokuapp.com'
} else if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:5000'
}

function App() {
  const [trivia, setTrivia] = useState(null)
  const [socket, setSocket] = useState(null)
  const [socketUser, setSocketUser] = useState(null)
  const [triviaData, setTriviaData] = useState(null)
  const [triviaDataUser, setTriviaDataUser] = useState({ options: [] })
  const [podium, setPodium] = useState([])
  const history = useNavigate()

  const onGameEnd = (result) => {
    setPodium(result)
    history.push('/podium')
  }

  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route
          path='/podium'
          element={
            <Podium
              socket={socket}
              socketUser={socketUser}
              setSocketUser={setSocketUser}
              setSocket={setSocket}
              ranking={podium}
            />
          }
        />

        <Route
          path='/host/chooseTrivia'
          element={
            <HostChooseTrivia
              onClickTriviaButton={(selectedTrivia) =>
                setTrivia(selectedTrivia)
              }
            />
          }
        />

        <Route
          path='/host/lobby'
          element={
            <HostLobby
              BASE_URL={BASE_URL}
              trivia={trivia}
              setSocket={setSocket}
              setTriviaData={setTriviaData}
              socket={socket}
            />
          }
        />

        <Route exact path='/user' element={<UserHome />} />

        <Route
          path='/user/lobby'
          element={
            <UserLobby
              BASE_URL={BASE_URL}
              setSocketUser={setSocketUser}
              socketUser={socketUser}
              setTriviaDataUser={setTriviaDataUser}
            />
          }
        />

        <Route
          path='/user/trivia'
          element={
            <TriviaUser
              socket={socketUser}
              socketUser={socketUser}
              onGameEnd={onGameEnd}
              triviaData={triviaDataUser}
              setSocketUser={setSocketUser}
              setSocket={setSocket}
            />
          }
        />
        <Route
          path='/host/trivia'
          element={
            <Trivia
              socketHost={socket}
              onGameEnd={onGameEnd}
              triviaData={triviaData}
              setSocketUser={setSocketUser}
              setSocket={setSocket}
            />
          }
        />
        <Route path='/admin/stats' element={<DashBoard />} />
      </Routes>
    </div>
  )
}

export default App
