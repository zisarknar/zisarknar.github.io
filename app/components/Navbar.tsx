const Navbar = () => <>
    <nav className='flex h-[56px] m-24 justify-between items-center'>
        <div className="cursor-pointer">
            <h3 className="font-semibold text-xl uppercase">&lt;zi sar kay nar<span>&#47;</span>&gt;</h3>
            <p className="capitalize font-light text-sm">Software Engineer</p>
        </div>
        <div className="cursor-pointer">
            <div className="space-y-2">
                <div className="w-8 h-0.5 bg-white"></div>
                <div className="w-8 h-0.5 bg-white"></div>
                <div className="w-8 h-0.5 bg-white"></div>
            </div>
        </div>
    </nav>

    <div className="flex flex-col h-full w-full justify-center items-start absolute top-0 left-0 bg-primary p-28">
        <div className="absolute top-28 right-28 cursor-pointer">
            close
        </div>
        <div className="flex flex-col">
            <a href="#" className="text-4xl font-bold">Home</a>
            <a href="/project" className="text-4xl mt-12 font-extralight">Project</a>
            <a href="/about" className="text-4xl mt-12 font-extralight">About</a>
            <a href="#" className="text-4xl mt-12 font-extralight">Contact</a>
        </div>

    </div>
</>


export default Navbar;