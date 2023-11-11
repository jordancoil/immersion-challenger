const { NavLink } = require("react-router-dom")

export default function Navbar() {
    return (
        <header>
            <nav aria-label="menu nav" class="bg-gray-800 border-b-2 border-slate-500 pt-2 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
                <div class="flex flex-wrap items-center justify-between">
                    <div>
                        <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
                            <li class="flex-1 flex-none mr-3 inline-block py-2 px-4 text-white no-underline">
                                <NavLink to="/" activeClassName="">
                                    Home
                                </NavLink>
                            </li>
                            {/* <li class="flex-1 md:flex-none md:mr-3">
                                <a class="inline-block text-gray-400 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">link</a>
                            </li> */}
                        </ul>
                    </div>
                    <div>
                        <p>user section</p>
                    </div>
                </div>
            </nav>
        </header>
    )
}