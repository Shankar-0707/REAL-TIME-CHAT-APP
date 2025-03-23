import { useState } from "react"
import "./Login.css";


const Login = ({ setUserName }) =>{

    const [login, setLogin] = useState("");

    return (
        <div className="form">

            <input value={login} onChange={(e) => setLogin(e.target.value)} type="text" placeholder="Enter Username" onKeyUp={(e)=> e.key === "Enter" && setUserName(login)}></input>
            <button onClick={()=> setUserName(login)}>Login</button>
        </div>
    )
}

export default Login;