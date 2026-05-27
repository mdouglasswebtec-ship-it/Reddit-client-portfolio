import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import PostList from './components/PostList/PostList'
import PostDetail from './components/PostDetail/PostDetail'
import NotFound from './components/NotFound/NotFound'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__layout">
        <main className="app__main">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/r/:subreddit" element={<PostList />} />
            <Route path="/r/:subreddit/comments/:postId/:postTitle?" element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Sidebar />
      </div>
    </div>
  )
}

export default App
