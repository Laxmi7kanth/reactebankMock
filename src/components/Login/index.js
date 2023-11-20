import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errMsg: '', showSubmitError: false}

  onUserIdChange = event => {
    this.setState({userId: event.target.value})
  }

  onPinChange = event => {
    this.setState({pin: event.target.value})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {history} = this.props
    const {userId, pin} = this.state
    const userDetails = {
      user_id: userId,
      pin,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({showSubmitError: false})
      Cookies.set('jwt_token', data.jwt_token, {expires: 7})
      history.replace('/')
    } else {
      this.setState({showSubmitError: true, errMsg: data.error_msg})
    }
  }

  render() {
    const {userId, pin, errMsg, showSubmitError} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-login-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="img"
          />
          <form className="form-container" onSubmit={this.onFormSubmit}>
            <h1>Welcome Back!</h1>
            <label htmlFor="id">User ID</label>
            <input
              id="id"
              placeholder="Enter User ID"
              type="text"
              onChange={this.onUserIdChange}
              value={userId}
            />
            <label htmlFor="pin">PIN</label>
            <input
              id="pin"
              placeholder="Enter PIN"
              type="password"
              onChange={this.onPinChange}
              value={pin}
            />
            <button type="submit">Login</button>
            {showSubmitError && <p>{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
