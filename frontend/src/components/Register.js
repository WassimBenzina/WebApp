import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from 'react';
import axios from 'axios';
function Register() {
  
  const [data,setData]=useState({
    
    Name:"",
    lastName:"",
    email:"",
    password:""
  })

    const navigate = useNavigate();
  
    const [error,setError]=useState("");
    
    const handlechange=({currentTarget:input})=>{
      setData({...data,[input.name]:input.value});
    }

    const handlesubmit = async (e) => {
      e.preventDefault();
      try{
        const url = "http://localhost:8080/api/users";
        const {data:res}= await axios.post(url,data);
        navigate("/login")
        console.log(res.message);
      }catch(error){
        if(error.response.status>=400&&error.response.status<=500)
        {setError(error.response.data.message)}
      }
    }
    const styleContainer={
        
        display: "flex",
	      alignItems: "center",
	      justifyContent: "space-evenly",
        backgroundColor:"#f2f2e6",
        minHeight:"92vh",
        position:"absolute",
        top:"7%",
        width:"100%",
    }
    
    const styleScreen={
      
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      position: "relative",	
      minHeight: "80vh",
      width: "30%",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      borderRadius:"15px",
      display: "flex",
      flexDirection:"column",
	    alignItems: "center",
      backgroundColor:"white",
      marginTop:"0%",
    }
    const styleinput={
        width:"100%",
        marginBottom:"1%",
        marginTop:"1%",
        borderRadius:"7px",
        border:"1px solid  #e1e1ea",
        minHeight:"6vh",
    }
    const styleRegister={
      fontFamily:"system-ui",
      fontSize:"30px",
      color:"#52527a",
      margin:"5%",
    }
    const styleLabel={
      fontFamily: "system-ui",
      fontSize:"17px"
    }
    const styleForm={
	    height: "60vh",
      width:"80%",
    }
    const styleButton={
      width:"100%",
      backgroundColor:"#0D3A68",
      border:"2px solid black",
      fontSize:"18px",
      fontFamily:"Verdana",
      color:"#f2f2e6",
      minHeight:"5vh",
      marginTop:"1%"
    }
    const login = () => {
      navigate(`/Login`);
    };
    return (
    <div>
    <div style={{position:"absolute",marginBottom:"5%"}}><NavBar/></div>
    <div style={styleContainer}>
    <div style={styleScreen}>
    <h3 style={styleRegister}>Register</h3> 
    <Form style={styleForm} onSubmit={handlesubmit} >
      <Form.Group className="mb-3" controlId="formBasicFirstNamename" style={styleLabel}>
        <Form.Label>Name</Form.Label><br/>
        <Form.Control type="text" name="
        Name" required value={data.
        Name} onChange={handlechange} style={styleinput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={styleLabel}>Email</Form.Label><br/>
        <Form.Control type="email" name="email" required value={data.email} onChange={handlechange} style={styleinput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={styleLabel}>Password</Form.Label><br/>
        <Form.Control type="password" name="password" required value={data.password} onChange={handlechange} style={styleinput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={styleLabel}>Confirm Password</Form.Label><br/>
        <Form.Control type="password" name="password" required value={data.password} onChange={handlechange} style={styleinput} />
      </Form.Group>
      {//error && <div>{error}</div>
      }
      <div style={{position:"absolute",width:"80%",bottom:"1%"}}><Button variant="primary" type="submit" style={styleButton}>
        Create account
      </Button>
    <div style={{fontWeight:"500",fontSize:"18px"}}>
    <p style={{textAlign:"center",marginTop:"4%"}}>Already a member?<a style={{color:"#0D3A68",marginLeft:"1%"}} onClick={login}>Login</a></p>
    </div></div>
      
    </Form>
    </div>
    <div style={{marginTop:"10%"}}>
    <img src="https://favtutor.com/resources/images/banner_front.png"></img>
    </div>
    </div>
    </div>
  );
}

export default Register;

