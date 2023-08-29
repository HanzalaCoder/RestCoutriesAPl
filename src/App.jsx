
import { BrowserRouter, Routes,Route  } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./components/Home"
import CardDetail from "./components/CardDetail"
import { useState,useEffect } from "react"
function App() {

   const [oneTimeUse,seyOneTimeUSe] = useState({})

   useEffect(() => {
       
      const fetchData = async () => {
          try{
              const request = await fetch("https://restcountries.com/v3.1/all")
              if(!request.ok) throw Error("Server Connnetion Error")
              const jsonData = await request.json()
              const dict = jsonData.reduce((acc, curr) => {
                  acc[curr.cca3] = curr.name.common;
                  return acc;
                }, {});


              seyOneTimeUSe(dict)
          } catch(err) {
              console.log(err)
          }
          
      }
      fetchData()
  },[])



  return (
   <BrowserRouter>
      <Routes>
         <Route path="/" element = {<Layout />}> 
          <Route index element = {<Home />}  />
          <Route path=":id" element = {<CardDetail dick = {oneTimeUse} />} />
         </Route >

      </Routes>


   </BrowserRouter>
  )
}

export default App
