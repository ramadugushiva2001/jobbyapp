import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  return (
    <>
      <nav className="mbl-nav-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="nav-list-items">
          <li>
            <Link to="/">
              <button>
                <AiFillHome className="home-icon" />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <button>
                <BsBriefcaseFill className="briefcase-icon" />
              </button>
            </Link>
          </li>
          <li>
            <button onClick={onClickLogout}>
              <FiLogOut className="logout-icon" />
            </button>
          </li>
        </ul>
      </nav>
      <nav className="large-nav-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <ul className="nav-list-items">
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <button>Jobs</button>
            </Link>
          </li>
        </ul>
        <button className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)
