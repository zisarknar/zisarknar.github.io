const Navbar = () =>
    <nav className='flex h-[56px] m-24 justify-between items-center'>
        <div className="cursor-pointer">
            <h3 className="font-semibold text-xl">ZI SAR KAY NAR</h3>
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


export default Navbar;