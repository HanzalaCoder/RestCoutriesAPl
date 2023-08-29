import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { nanoid } from 'nanoid'




export default function CardDetail({dick}) {


    const id = useParams()
    const [singleData, setSingleData] = useState(null) // Initialize with null instead of an empty array
    const [name,setName] = useState(id.id)
    const arrayLang = []
    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
                if (!request.ok) throw Error("Server Connection Error")
                const jsonData = await request.json()
                setSingleData(jsonData[0])
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [name])
    if (singleData) {
        const keys = Object.keys(singleData.languages)
      
        keys.forEach((key) => {
            const lang = singleData.languages[key]
            arrayLang.push(lang)
            arrayLang.push(" ")

        })
    }
    
    return (
        <section>
            <button className="bg-[#ffffff] dark:bg-[#2b3945] w-[120px] shadow-md shadow-slate-500 dark:shadow-black mt-12 lg:mt-20 mb-12 mx-4 lg:">
                <Link to=".." relative="path"> 
                    <div className="flex justify-between py-2 px-6 items-center">
                         <i className="fa-solid fa-arrow-left"></i>
                        <h3>Back</h3>
                    </div>
                </Link>
            </button> 
                
            {singleData ? (
                <div className="flex flex-col items-center justify-center w-[80%] lg:w-[90%] mx-auto lg:flex-row lg:justify-between  ">
                    <img  className="w-full lg:w-[30%]" src={singleData.flags?.png} alt={`flags of ${name.id}`} />
                    <div className=" lg:w-[60%] self-start my-8 mx-2 flex flex-col gap-8 lg:grid grid-cols-2 ">
                        <ul className="grid gap-3 cursor-pointer">
                            <li className="font-bold text-xl">{singleData.name.official}</li>
                            <li className="font-semibold">Native Name : <span className="font-thin hover:underline">{singleData.name.common}</span></li>
                            <li className="font-semibold">Population : <span className="font-thin hover:underline">{singleData.population}</span></li>
                            <li className="font-semibold">Region: <span className="font-thin hover:underline">{singleData.region}</span></li>
                            <li className="font-semibold">Sub Region: <span className="font-thin hover:underline">{singleData.subregion}</span></li>
                            <li className="font-semibold">Capital: <span className="font-thin hover:underline">{singleData.capital}</span></li>
                        </ul>

                        <ul className="grid  lg:self-start gap-3 cursor-pointer">
    
                            <li className="font-semibold">Top Level Domain : <span className="font-thin hover:underline">{singleData.tld}</span></li>
                            <li className="font-semibold">
                            Currencies: {singleData.currencies && (
                                <span className="inline-block">
                                    {Object.keys(singleData.currencies).map(currencyCode => (
                                        
                                        <span key={nanoid()} className="font-thin hover:underline">
                                                    {currencyCode + " "}   
                                        </span>
                                        
                                    ))}
                                </span>
                            )}
                            </li>
                            <li className="font-semibold">Languages: <span className="font-thin hover:underline">{...arrayLang}</span>  </li>
                            <li className="font-semibold capitalize">LandLocked  : <span className="font-thin hover:underline">{JSON.stringify(singleData.landlocked)}</span>  </li>
                            <li className="font-semibold capitalize">Independent : <span className="font-thin hover:underline">{JSON.stringify(singleData.independent)}</span>  </li>
                        </ul>
                        <div className="flex flex-col gap-4 self-start lg:flex-row w-full lg:col-span-2 lg:items-center lg:mt-11">
                           { singleData.borders && <h3 className="font-semibold">Border Countries :</h3>}
                          <div className="flex gap-4 flex-wrap ">
                            {singleData.borders && singleData.borders.map(nameCountry => {
                                let innerText = ""
                                const uniqueID = nanoid()
                                const keys = Object.keys(dick)
                                keys.forEach(key => {
                                    if (key === nameCountry) {
                                        const text = dick[key]
                                        innerText = text
                                    }
                                })
                                return <button key= {uniqueID} className="bg-[#ffffff] dark:bg-[#2b3945] w-[100px]  shadow-md py-2 rounded-md" onClick={(event) => {
                                  const text = event.target.innerText
                                  setName(text)
                                }}>
                                    {innerText}
                                        
                                        </button>
                                
                                })}
                          </div>
                    </div>
                    </div>
                </div>
                    ) : (
                        <p className="text-center text-2xl mt-12">Loading...</p>
                    )}
        </section>
    )
}

