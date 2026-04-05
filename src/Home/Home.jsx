import React, { useEffect } from 'react'
import './Home.css'
import {useState} from 'react'

function Home() {
 const[form,setForm]=useState({
    name:'',
    age:'',
    city:'',
    error:'',
    gender:'',
    subject:[]
 });

 useEffect(()=>{
   if (!!form.name && !!form.age) {
    return;
} else if (form.name.length > 0 && form.name.length < 3) {
    setForm({ ...form, error: "Name must be at least 3 characters long" });
} else if (form.name.length > 20) {
    setForm({ ...form, error: "Name must be less than 20 characters long" });
} else if (form.age < 20) {
    setForm({ ...form, error: "Age must be at least 20 years old" });
} else if (form.age > 60) {
    setForm({ ...form, error: "Age must be less than 60 years old" });
} else {
    setForm({ ...form, error: "" });
}

 },[form.name,form.age,form.error])


 useEffect(()=>{
    const storedData=localStorage.getItem("userData");
    if(storedData){
        const parsedData=JSON.parse(storedData);

        if(parsedData.name===form.name){
            return
        }
        setForm({
            ...form,
            name:parsedData.name || "",
            age:parsedData.age ||"",
            error:"",
        })
    }
 },[])
 const saveName=()=>{
    if(form.error){
        alert(form.error);
        return;
    }
   
    localStorage.setItem("userData",JSON.stringify(form))

 }
  return (
    <div className='form'>
        <h1>Ragistration Form </h1>
        <p>Hello {form.name || "User"}❤️ You are {form.age || "User"} years old.</p>

        <div className="1">
        <input type='text' placeholder='Enter Your Name' className='input'
        onChange={(e)=>{
            console.log("chenged happpen",e.target.value);
            setForm({...form,name:e.target.value})
        }} value={form.name}/>
    </div>

    <div>
        <select onChange={(e)=>{
            setForm({...form,city:e.target.value})
        }} value={form.city} className='input'>
            <option >Select your city</option>
            <option value="loni">loni</option>
            <option value="nagpur">nagpur</option>
            <option value="pune">pune</option>
            <option value="mumbai">mumbai</option>
            <option value="chennai">chennai</option>
        </select>
    </div>

    <div>
        <p>Select Gender</p>
        <input type='radio' name='gender' value="female" checked={form.gender==="female"}
        onChange={(e)=>{
            setForm({...form,gender:e.target.value})
        }}
        />Female
        <input type='radio' name='gender' value="male"checked={form.gender==="male"}
        onChange={(e)=>{
        setForm({...form,gender:e.target.value})
        }}
        />male
    </div>


    <div>
       <p> Choose your favourite Subjects</p>
       <input type='checkbox' value="math" checked={form.subject.includes("math")}
       onChange={(e)=>{
        const val=e.target.value;
        if(form.subject.includes(val)){
            setForm({
                ...form,
                subject:form.subject.filter(
                    (subject)=>subject!==val
                )
            })
        }else{
         setForm({
                ...form,
            subject:[...form.subject,val]
         })
        }
       }}
       />{" "} Math
       <input type='checkbox' value="marathi" checked={form.subject.includes("marathi")}
              onChange={(e)=>{
        const val=e.target.value;
        if(form.subject.includes(val)){
            setForm({
                ...form,
                subject:form.subject.filter(
                    (subject)=>subject!==val
                )
            })
        }else{
         setForm({
                ...form,
            subject:[...form.subject,val]
         })
        }
       }}

       />hindi
       <input type='checkbox' value="hindi" checked={form.subject.includes("hindi")}
              onChange={(e)=>{
        const val=e.target.value;
        if(form.subject.includes(val)){
            setForm({
                ...form,
                subject:form.subject.filter(
                    (subject)=>subject!==val
                )
            })
        }else{
         setForm({
                ...form,
            subject:[...form.subject,val]
         })
        }   
       }}
/>hindi

    </div>

        
        <div className="2">
        <input type="number" placeholder='Enter your age' className='input' value={form.age} onChange={(e)=>{
            setForm({...form,age:e.target.value})
        }}/>
        </div> 

        <p className='error-text'>{form.error}</p>
        
        <div className="Button">
        <button className={`btn ${form.error?'btn-disabled':null}`} onClick={saveName}>Save</button>
        <button className='btn' onClick={()=>{
            setForm({
                name:"",
                age:"",
                error:"",
                city:"",
                gender:"",
                subject:[]
            })
             localStorage.clear()
        }}>Clear</button> 
        
        </div>
    </div>
  )
}

export default Home;