

import { useState,useEffect } from "react"
import ShowCard from "./ShowCard"
import { nanoid } from 'nanoid'
export default function Home() {
    const [data,setData] = useState([])
    const [searchcountry, setSearchCountry] = useState([])
    const [formData, setFormData] = useState(
        {country:"x" }
    )
    const stockDivs =  []
    let searchDivs = []
    useEffect(() => {
       
        const fetchData = async () => {
            try{
                const request = await fetch("https://restcountries.com/v3.1/all")
                if(!request.ok) throw Error("Server Connnetion Error")
                const jsonData = await request.json()
                const dict = data.reduce((acc, curr) => {
                    acc[curr.alpha3Code] = curr.name;
                    return acc;
                  }, {});
                setData(jsonData)
            } catch(err) {
                console.log(err)
            }
            
        }
        fetchData()
    },[])
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await fetch(`https://restcountries.com/v3.1/name/${formData.country}`)
                if(!request.ok) throw Error("Match Not Found")
                const data = await request.json()
                setSearchCountry(data)
            
            } catch(err) {
                console.log("")
            }
        }
        fetchData()

    },[formData.country])

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function showSelector()  {
        const element = document.querySelector(".selectors")
        element.classList.toggle("p-4")
        element.classList.toggle("h-[11rem]")
       }
    if (data.length > 0) {
        for (let i = 0;i < 16; i++) {
            const randomNum = Math.floor(Math.random() * data.length)
            const item = data[randomNum]
            const model = nanoid()
            stockDivs.push(
                <ShowCard key= {model} item ={item} />
            )
        }
    }
    if (searchcountry.length === 1) {
        const model = nanoid()
        searchDivs.push(
            <ShowCard key={model}  item ={searchcountry[0]} />

        )
    }

    

   
    return (
        <section className="mt-8 w-[90%] mx-auto flex flex-col gap-8">
        <section className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="bg-[#ffffff] dark:bg-[#2b3945] px-4 shadow-xl  flex items-center gap-0 md:self-start" >
              <i className="fa-solid fa-magnifying-glass"></i>
              <input  type="text" onChange={handleChange} name="country" value={formData.country}   className="w-full p-4 outline-none border-none text-xl bg-[#ffffff] dark:bg-[#2b3945] text-[#858585] dark:text-[#ffffff] md:px-16" />
            </div>
            <div className="w-[200px] flex flex-col relative">
                <div className="bg-[#ffffff] dark:bg-[#2b3945] flex items-center justify-between p-2 shadow-xl cursor-pointer"  onClick={showSelector}>
                    <h3>Filter by Region</h3>
                    <i className="fa-solid fa-down-long" ></i>
                </div>
                <ul className=" absolute w-[200px] top-12 selectors bg-[#ffffff] dark:bg-[#2b3945] my-2  shadow-xl font-semibold h-0 overflow-hidden transition-all delay-300 ease-out">
                    <li className="hover:text-[#E77011]">All</li>
                    <li className="hover:text-[#E77011]">Africa</li>
                    <li className="hover:text-[#E77011]" >America</li>
                    <li className="hover:text-[#E77011]">Asia</li>
                    <li className="hover:text-[#E77011]">Europe</li>
                    <li className="hover:text-[#E77011]">Oceania</li>

                </ul>
            </div>
        </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-8 mb-12">
            { searchDivs.length > 0 ? searchDivs : stockDivs}
            </section>
        </section>
        
    )
}