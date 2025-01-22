import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <header className="bg-black text-white py-4">
            <nav className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="Nexus" className="h-8 w-8" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-teal-500 to-orange-500 bg-clip-text text-transparent">
                        NEXUS
                    </span>
                </Link>
                <ul className="hidden md:flex space-x-8">
                    <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                    <li><Link to="/companies" className="hover:text-blue-400 transition-colors">Companies</Link></li>
                    <li><Link to="/experiences" className="hover:text-blue-400 transition-colors">Experiences</Link></li>
                    <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
                </ul>
                <Link
                    to="/signin"
                    className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md transition-colors"
                >
                    Login
                </Link>
            </nav>
        </header>
    )
}

export default Header