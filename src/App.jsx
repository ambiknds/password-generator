import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

export default function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)
  //Logic for generating password we use reference to enable callpass method
  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (numberAllowed) str += '0123456789'
    if (specialCharAllowed) str += '!@#$%&*()+=[]{}|<>/?'

    //loop through all string
    for (let i = 0; i < length; i++) {
      //generate base on str length
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) //appending, charAt acting as index
    }
    setPassword(pass)
  }, [length, numberAllowed, specialCharAllowed])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, specialCharAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()//select all ? is optional
  }

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center font-bold text-3xl my-3'>
        Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type='text'
          value={password}
          className='outline-none w-full px-3 py-1'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outlinew-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>
      </div>
      <div className='flex sm:flex-row flex-col text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type='range'
            min={8}
            max={30}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            name=''
            id=''
          />
          <label htmlFor='length'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={numberAllowed}
            className='cursor-pointer'
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            //callback func to garantee prev value and all  the changes properly propagated so that we can also pickup prev value in case of multiple click
            name=''
            id=''
          />
          <label htmlFor='number'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={specialCharAllowed}
            className='cursor-pointer'
            onChange={() => {
              setSpecialCharAllowed((prev) => !prev)
            }}
            name=''
            id=''
          />
          <label htmlFor='characters'>Special Chars</label>
        </div>
      </div>
    </div>
  )
}
