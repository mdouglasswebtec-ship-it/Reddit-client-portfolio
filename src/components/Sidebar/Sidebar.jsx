import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  setActiveSubreddit,
  clearPosts,
  loadPosts,
  setSearchQuery,
  selectActiveSubreddit,
} from '../../store/postsSlice'
import './Sidebar.css'

const CATEGORIES = [
  { name: 'popular', label: 'Home', icon: '🏠' },
  { name: 'AskReddit', label: 'AskReddit', icon: '❓' },
  { name: 'NoStupidQuestions', label: 'NoStupidQuestions', icon: '💭' },
  { name: 'BaldursGate3', label: 'BaldursGate3', icon: '🎮' },
  { name: 'facepalm', label: 'facepalm', icon: '🤦' },
  { name: 'interestingasfuck', label: 'interestingasfuck', icon: '🤯' },
  { name: 'Damnthatsinteresting', label: 'Damnthatsinteresting', icon: '😲' },
  { name: 'LivestreamFail', label: 'LivestreamFail', icon: '📺' },
  { name: 'pics', label: 'pics', icon: '📷' },
  { name: 'Palworld', label: 'Palworld', icon: '🌎' },
  { name: 'AmItheAsshole', label: 'AmItheAsshole', icon: '🤔' },
]

function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const activeSubreddit = useSelector(selectActiveSubreddit)

  const handleSelect = (name) => {
    dispatch(setActiveSubreddit(name))
    dispatch(setSearchQuery(''))
    dispatch(clearPosts())
    dispatch(loadPosts({ subreddit: name }))
    navigate(name === 'popular' ? '/' : `/r/${name}`)
  }

  return (
    <aside className="sidebar" aria-label="Subreddit categories">
      <div className="sidebar__card">
        <h2 className="sidebar__title">Subreddits</h2>
        <nav>
          <ul className="sidebar__list">
            {CATEGORIES.map(({ name, label, icon }) => (
              <li key={name}>
                <button
                  className={`sidebar__item${activeSubreddit === name ? ' sidebar__item--active' : ''}`}
                  onClick={() => handleSelect(name)}
                  aria-current={activeSubreddit === name ? 'page' : undefined}
                >
                  <span className="sidebar__item-icon" aria-hidden="true">{icon}</span>
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
