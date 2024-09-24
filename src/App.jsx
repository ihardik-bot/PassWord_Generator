import { useCallback, useEffect, useRef, useState } from 'react';


function App() {
  const [length, setLength]=useState(8)
  //We are using usestate here to tack default lrngth of Password.
  const [numberAllowed , setNumberAllowerd]=useState(false);
  //Initially the password does not contain number hence we have given false in usestate.
  const [charAllowed , setCharAllowerd]=useState(false);
  const [password , setPassword] = useState("")
  //Here the default password will be generated when the page is loaded.
  //The hook use callback is used to generate random password at begin where fn is passed and the dependency will be passes on which the password will be dependent.
//------------------->Copying pass into clpBoard<----------
  //Use ref hook is used for taking reference.
  const passwordRef=useRef(null)


  const passwordGenerator=useCallback(()=>{
    //Creating the function to generate the random password ::
    let pass=""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str+="0123456789"
    }
    if(charAllowed){
      str+="!@#$%^&*()?><~`"
    }
    for(let i=1;i<=length;i++){
      let char =Math.floor(Math.random()*str.length +1)
      pass+=str.charAt(char)
      //we are generating password of length 'l' specified by the user .. we are adding +1 here so that the 0th value does not come back.

    }
    //reading the value(password)
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

//writitng method for copying to clipboard
const copyPasswordtoClipboard=useCallback(()=>{
  //Writing the func..
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,70);
  window.navigator.clipboard.writeText(password)//This will help in copying the pass but we will hover mouse when it gets to copy .. and we can also dark the text which is getting selected for bring copyied.
},[password])

  //We have given setPassword here in dependency because whenever we will change any other dependency my password will load auto.
//We have created a password gen method above now we want to call it .. so for calling our method we will use useEffect hook.
useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator]) 
return (
    //max widhth of med size is 448px.
    <>
     <div className='w-full max-w-md mx-auto shadow-md
     round-lg px-2 my-10 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-2'>Password Generator</h1>
      <div className='flex shadow rounded-lg
      overflow-hidden mb-4'>
        <input type="text"
        value={password}
        //We will generate the value which we have set into the usestate
        className='outline-none w-full py-1 px-3 margin-bottom: 2px'
        placeholder='Password'
        //we use readonly so no one can write into it.
        readOnly
        //Passing reference into useref
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordtoClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >
          copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={70}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          //The command upper is used to change the value of length of the password.
          />
          <label>Length:{length}</label>
        </div>
        <div
        className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{setNumberAllowerd((prev)=>!prev);}}
          //This is used to reverse the prev cond (if Number were allowed and we check it then number will not be allowed and vice-versa.)
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div
        className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={()=>{setCharAllowerd((prev)=>!prev);}}
          //This is used to reverse the prev cond (if Number were allowed and we check it then number will not be allowed and vice-versa.)
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
