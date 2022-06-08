import { useState, useEffect, useContext } from 'react'
import { AllData } from '../js/main'
export default function Header() {
    // const [isLogin, setIsLogin] = useState(false)
    const { isLogin, userInfo, goLogin_out } = useContext(AllData)
    

    return (
        <div id='header'>
            <div className='login_info'>
                <button className='login_out' onClick={goLogin_out}>{isLogin ? "登出" : "登入"}</button>
                <div className='admin_name'>{isLogin ? `${userInfo.name} 您好` : `您好，請登入`}</div>
            </div>
            <div className="admin_info">

            </div>

        </div>
    )
}