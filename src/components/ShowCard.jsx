import { Link } from "react-router-dom"

export default function ShowCard(props) {
    

    return (
        <Link to={`${props.item.name.official}`} >
            <section className="bg-[#ffffff] dark:bg-[#2b3945] shadow-2xl max-w-[350px]  rounded-lg cursor-pointer">
                    <div className="hover:scale-105 transition-transform delay-150 max-w-[300px]"  >
                        <img  src={props.item.flags.png}alt={props.item.flags.alt} />
                    </div>
                    <div className="flex flex-col gap-4 p-4 font-semibold">
                        <h1 className="break-words font-bold text-xl">{props.item.name.official}</h1>
                        <p>Population : <span className="font-thin hover:underline">{props.item.population}</span></p>
                        <p>Region : <span className="font-thin hover:underline">{props.item.region}</span></p>
                        <p>Capital : <span className="font-thin hover:underline">{props.item.capital}</span></p>
                    </div>  
            </section>
        </Link>
        

    )
}