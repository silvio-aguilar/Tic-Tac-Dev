import React from 'react'

export default function LevelSelect({onSelectLevel}) {
  return (
    <>
    
    
    <div>
     
    <h2>Selecciona la dificultad:</h2>
    <button onClick={() => onSelectLevel("easy")}>Fácil</button>
    <button onClick={() => onSelectLevel("medium")}>Medio</button>
    <button onClick={() => onSelectLevel("difficult")}>Dificil</button>
    
  </div>

  <div>
     
  <h2></h2>Powered by: <a target='_blank'  href='http://www.silvio-aguilar.com/'>Silvio Aguilar</a>
    
  </div>
  </>
  )
}
