import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                <li><Link to="/threads">Threads</Link></li>
                <li><button onClick={handleSignOut}>SignOut</button></li>
            </ul>
        </nav>
    );
}

export default Navbar;
