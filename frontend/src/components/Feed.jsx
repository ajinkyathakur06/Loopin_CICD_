// import React from 'react';
// // Importing React library
// import logo1 from '../assets/logo1.png'
// // Importing a logo image from assets
// import { FaRegHeart } from "react-icons/fa";
// // Importing heart icon (outlined heart) from react-icons library
// import Nav from './Nav.jsx';
// // Importing Nav component (navigation bar)
// import Post from './Post.jsx';
// // Importing Post component (individual post display)
// import { useSelector } from 'react-redux';
// // Importing useSelector hook from react-redux to access Redux store
// import { LuMessageSquareText } from "react-icons/lu";

// function Feed() {
//     const {postData}=useSelector(state=>state.post)
//     return (
//         <div className="lg:w-[50%] w-full
//          bg-black min-h-[100vh] lg:h-[100vh] relative 
//          lg:overflow-y-auto">
//             <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden z-[10]">
//                             {/* Top section: logo + heart icon */}
                            
//                             <img src={logo1} alt="" className='w-[80px]' />
//                             {/* App logo */}  
            
//                             <FaRegHeart className='text-[white] w-[25px] h-[25px]'/>
//                             {/* Heart icon (white color, 25x25 size) */}
                        
//                         <LuMessageSquareText className='text-[white] w-[25px] h-[25px] ' />
//                         </div>
//           <div className='w-full min-h-[100vh] flex flex-col 
//           items-center gap-[20px] p-[10px] pt-[40px] bg-white
//            relative pb-[120px]'>
//             <Nav/>
//             {postData?.map((post) => (
//                 <Post post={post} key={post.id}/>
//             ))}
//             {/* Rendering Post components for each post in postData */}
//            </div>
//         </div>
//     );
// }





// import React from 'react';
// import logo1 from '../assets/logo1.png';
// import { FaRegHeart } from "react-icons/fa";
// import { LuMessageSquareText } from "react-icons/lu";
// import Nav from './Nav.jsx';
// import Post from './Post.jsx';
// import { useSelector } from 'react-redux';

// function Feed() {
//   const { postData } = useSelector(state => state.post);

//   return (
//     <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative overflow-y-auto">
//       {/* ✅ MOBILE HEADER (Visible only on small screens) */}
//       <div className="w-full h-[100px] flex items-center justify-between p-[20px] 
//                       lg:hidden fixed top-0 left-0 z-[20] bg-black">
//         {/* App logo */}
//         <img src={logo1} alt="Logo" className="w-[80px]" />

//         {/* Right-side icons */}
//         <div className="flex gap-4 text-white">
//           <FaRegHeart className="w-[25px] h-[25px]" />
//           <LuMessageSquareText className="w-[25px] h-[25px]" />
//         </div>
//       </div>

//       {/* ✅ MAIN FEED SECTION */}
//       <div className="w-full min-h-[100vh] flex flex-col 
//                       items-center gap-[20px] p-[10px] pt-[120px] bg-white 
//                       relative pb-[120px]">
//         <Nav />
//         {/* Render each post */}
//         {postData?.map((post, index) => (
//           <Post post={post} key={index} />
//         ))}
//       </div>
//     </div>
//   );
// }

import React from 'react';
import logo1 from '../assets/logo1.png';
import { FaRegHeart } from "react-icons/fa";
import { LuMessageSquareText } from "react-icons/lu";
import Nav from './Nav.jsx';
import Post from './Post.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Feed() {
  const { postData } = useSelector(state => state.post);
  const navigate=useNavigate();

  return (
    <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative">
      {/* ✅ Scrollable section now includes header + posts */}
      <div className="w-full h-[100vh] overflow-y-auto">
        
        {/* Mobile header (only on small screens) */}
        <div className="w-full h-[100px] flex items-center justify-between p-[20px] 
                        lg:hidden sticky top-0 left-0 z-[20] bg-black">
          <img src={logo1} alt="Logo" className="w-[80px]" />
          <div className="flex gap-4 text-white">
            <FaRegHeart className="w-[25px] h-[25px]" />
            <LuMessageSquareText className="w-[25px] h-[25px]" onClick={()=>navigate("/messages")}/>
          </div>
        </div>

        {/* Main feed */}
        <div className="w-full min-h-[100vh] flex flex-col 
                        items-center gap-[20px] p-[10px] pt-[20px] bg-white 
                        relative pb-[120px]">
          <Nav />
          {postData?.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Feed;




