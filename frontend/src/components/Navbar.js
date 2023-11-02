const { Link } = require("react-router-dom")

export default function Navbar() {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Home</h1>
                </Link>
            </div>
        </header>
    )
}