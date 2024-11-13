import { useState } from "react";


let registeredUsers =[];
let currentId = 1;

const addNewUser= (name,email,password)=>{
    const newUser ={
        id:currentId++,
        name,
        email,
        password
    }
    registeredUsers.push(newUser);
   
    console.log(registeredUsers)

}


const Registration = () => {
    const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

return(

    <form className="registration-form" onSubmit={(e)=>{e.preventDefault(); addNewUser(name,email,password)}}>
      <input type="text" value ={name} placeholder="give name" onChange={ (e)=>setName(e.target.value)}></input>
      <input type="text" value ={email}  placeholder="email" onChange={ (e)=>setEmail(e.target.value)}></input>
      <input type="text" value ={password} placeholder="password" onChange={ (e)=>setPassword(e.target.value)}></input>
      <button className ="register-button" type ="submit">register</button>
    </form>
 );
};

export default Registration;
