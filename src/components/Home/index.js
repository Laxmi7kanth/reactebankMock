import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const Home = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return Cookies.get('jwt_token') === undefined ? (
    <Redirect to="/ebank/login" />
  ) : (
    <div className="bg-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <h1>Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
      />
    </div>
  )
}

export default Home
