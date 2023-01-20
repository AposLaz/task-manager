import axios from "axios";

const register = (name,age,email,password,role) =>{
    return axios.post('http://server-node:4000/users',{
        name: name,
        age: age,
        email: email,
        password: password,
        role: role
    }).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
}


const authService = {
    register
}

export default authService;