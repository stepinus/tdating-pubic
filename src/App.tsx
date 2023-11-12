import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [userData, setUserData] = useState(null)
    useEffect(()=>{
              // Получение данных пользователя из initDat
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
        const initData = window.Telegram.WebApp.initData;
        setUserData(initData);
    },[])
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
          <pre>{userData && JSON.stringify(userData,null,2)}</pre>
      </div>
    </>
  )
}

export default App
