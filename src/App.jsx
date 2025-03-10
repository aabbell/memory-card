import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Nav from './Nav.jsx'
import './App.css'
;
function App() {
  const [poki, setPoki] = useState([])
  const arr = []
  for (let i = 0; i < 10; i++){
    const randomNumber = Math.floor(Math.random()*100)
        arr.push(randomNumber);
  }
  
  
  useEffect(()=>{
    async function fetchPockman(){
      try{ 
      const generater = arr.map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()
        return data.sprites.front_default
      })
      const images = await Promise.all(generater)    
      setPoki(images)
    }catch(error){
      console.log("error has happened", error)
    }
  
    }

    fetchPockman()
   },[] )
  
  return (
    <>
      <Nav/>
      <div style = {{display: 'flex', gap : '10px', flexWrap: 'wrap'}}>
      {poki.length > 0 ? poki.map((img, index) => <img src = {img} key={index} width= '100'  />) : <p>loading...</p>}
      </div>
    </>
  )
}

export default App
