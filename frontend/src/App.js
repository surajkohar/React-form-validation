//create a react form with fields(firstName,lname,phone,email,DOB,Gender,password)
//all fields are required
//Email should have email validation
//phone should accept only numbers
//on click save button should display all info at bottom

import {useState,useEffect} from 'react';
import Axios from 'axios'
import './App.css'

const App=()=>{
  
  const [users,setUser]=useState([]);
  const [form,setForm]=useState()
  const [phone, setPhone] = useState('');
  const [email,setEmail] =  useState(true);
  const [bottom,setBottom]=useState(false);
  const [bottomForm , setBottomForm]=useState('')
  const[errPhone,setErrPhone]=useState(true);


  const current=new Date().toISOString().split("T")[0];
  const handleChange=(e)=>{

      console.log(e.target.value,e.target.name)

    setForm({
      ...form,[e.target.name]:e.target.value
    })
  }
  const handleChange2=(e)=>{

      // var regexx = new RegExp('/\s+@\s+\.\s+/.')
      var regexx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var email1 = e.target.value;
     

     if (regexx.test(email1)){
      setForm({
       ...form,[e.target.name]:email1
      })
    setEmail(true);
    }

else {
  setEmail(false);
}
 if(email1==""){
  setEmail(true)
 }
  }

  const handleChange1=(e)=>{
   
    var regexx = new RegExp('^\s*-?[0-9]{0,10}\s*$')
    var phone1 = e.target.value;
   if (isNaN(phone1)){
     setPhone(phone+ '');
   }

  else {
   if (regexx.test(phone1) 
  
   ){
   
    setForm({
     ...form,[e.target.name]:phone1
    })
  setPhone(phone1);
    // }
}
if (phone1.length<10){
  setErrPhone(false)}
  else {
    setErrPhone(true)
  }
  if(phone1.length ==''){
    setErrPhone(true)
  }
    // console.log(form,'setform')
}
  }

  const handleSubmit=async(e)=>{              
    e.preventDefault();
    var regexx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexx.test(form.email)){
      }
      else {
        setEmail(false)
      }
     
      // }
      console.log("phone length",form.phone.length)
    //   var regexx = new RegExp('^\s*-?[0-9]{0,10}\s*$')
    if (form.phone.length==10){
     console.log("this is form",form)
     setBottom(true);
     setBottomForm(form);
    }
    else {
      console.log("use valid phone number")
      setBottom(false);
    }
    // var phone1 = e.target.value;

     
    

    const response = await Axios.post("http://localhost:8000/insertData",form);
    
    
  }
  

  return (
    <>
    <div className='form1'>

      <form onSubmit={handleSubmit}>
      {/* <p>{JSON.stringify(form)}</p> */}
      <span id='field'>First Name</span> &nbsp;
      <input type='String' maxLength={20} className='firstName' required
       placeholder="first name" size='30' name='firstName' onChange={handleChange}></input>   <br/><br/>

      <span id='field'>Last Name</span> &nbsp;
      <input type='text'  maxLength={20} className='lname' required
      name='lastName' placeholder="last name" onChange={handleChange}></input> <br/><br/>

      <span id='field'>Date Of Birth</span> &nbsp;
      <input type='date' max={current} placeholder="date of birth" className='dob' required
      name='dob' onChange={handleChange}></input><br/><br/>

      <span id='field'>Phone No</span> &nbsp;
      <input type='phone' value={phone} placeholder="phone number" className='phone'
           name='phone'
          required 
          onChange={handleChange1}
      ></input>  <br/><br/>
      {errPhone?<span></span>:<span className='emailValidation'>Enter valid phone number <br></br></span> } &nbsp;
     

      <span id='field'>Gender</span> &nbsp;
      <select name='gender' className='gender' onChange={handleChange}> 
      <option  disabled selected>Select</option>
      <option  value="Male">Male</option>
      <option  value="Female">Female</option>
      <option  value="Other">Other</option>
      </select> <br/><br/>

      <span id='field'>Email</span> &nbsp;
      <input type='email' required placeholder="email" name='email' className='email' 
       onChange={handleChange2}></input>   <br/><br/>
      {email?<span></span>:<span className='emailValidation'>enter valid email <br></br></span> } &nbsp;
     
      <span id='field'>Password</span> &nbsp;
      <input type='password' maxLength={15} name='password' placeholder="password" 
      className='password' required
       onChange={handleChange}></input>   <br/><br/>
      <button className='btn'>Save</button>
      </form>

    </div>
    { bottom?
      <div className='bottom'>
    <p>{JSON.stringify(bottomForm)}</p>
    </div>:<span></span>
    }
    
    </>
  )
}
export default App;