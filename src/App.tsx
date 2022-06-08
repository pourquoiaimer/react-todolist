import { useState } from 'react'
import './scss/all.scss'
import Header from './component/header'
import Footer from './component/footer'
import Content from './component/content'
import { AllData } from "./js/main"


function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [userInfo, setUserInfo] = useState({ name: "" })
  console.log('now');
  
  function goLogin_out() {
    if (isLogin) {
      setIsLogin(false)
      setUserInfo({ name: "" })
    } else {
      setIsLogin(true)
      setUserInfo({ name: "test admin" })
    }
  }

  return (
    <div id="App">
      <AllData.Provider value={{ isLogin, userInfo, goLogin_out }}>
        <Header />
        <Content />
        <Footer />
      </AllData.Provider>
    </div>
  )
}

export default App
