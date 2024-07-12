import { Link } from "react-router-dom"

const HomePage = () => {

    return (
        <>
            <h1>Welcome The Recipe Blog</h1>
            <Link to={"recipe"}>Check out some recipes here</Link>
            {/* <Link to={"add"}>Click to add you personal recipe</Link> */}
        </>
    )
}

export default HomePage