

export default function Header() {
    function toggleTheme() {
        document.querySelector(".html").classList.toggle("dark")
    }

    return (
        <div className="flex p-8 md:px-20 justify-between items-center bg-[#ffffff] dark:bg-[#2b3945] shadow-lg text-[#111517] dark:text-[#ffffff] font-semibold ">
            <h2 className="text-lg">Where in the world?</h2>
            <div className="flex items-center gap-4">
            <i className="fa-solid fa-moon"></i>
             <button className="font-extralight" onClick={toggleTheme}>Dark Mode</button>
            </div>
        </div>

    )

}