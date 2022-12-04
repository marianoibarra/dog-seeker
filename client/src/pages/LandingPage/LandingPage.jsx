import { Link } from "react-router-dom"

const LandingPage = () => {
    return (
        <div>
            <h1>Welcome message</h1>
            <Link to='/home' >home</Link>
        </div>
    )
}

export default LandingPage