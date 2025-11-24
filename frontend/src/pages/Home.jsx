import React from "react";
import LeftHome from "../components/LeftHome.jsx";
import RightHome from "../components/RightHome.jsx";
import Feed from "../components/Feed.jsx";  
function Home(){
    return(
        <div className="w-full flex h-screen justify-center items-center">
<LeftHome/>
<Feed/>
<RightHome/>
        </div>
    )
}
export default Home;