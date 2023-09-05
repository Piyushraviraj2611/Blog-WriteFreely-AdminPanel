import './App.css';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';

function App() {

  const [showNav, setShowNav] = useState(true);


  const toggleNav = () => {
    setShowNav(!showNav);
  }

  const getNavWidth = () => (showNav ? "w-56" : "w-16")

  return (
    <>
      <div className='flex' >
        {/* Nav Section */}
        <div className={getNavWidth() + " min-h-screen transition-width border border-r"}>
          <div className="sticky top-0">
            <Navbar showNav={showNav} />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-h-screen bg-gray-100">
          <div className="sticky top-0">
            <div className="flex items-center p-2 space-x-2">
              <button onClick={toggleNav}>
                {showNav ? <AiOutlineMenuFold size={25} /> : <AiOutlineMenuUnfold size={25} />}
              </button>
              <SearchForm />
            </div>
          </div>

          <div className="max-w-screen-lg mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/update-post/:slug" element={<UpdatePost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
