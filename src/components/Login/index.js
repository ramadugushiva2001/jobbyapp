import {Component, Redirect} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onsubmitSuccess = jwtToken => {
    const {history} = this.props
    history.replace('/')

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onsubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderForm = () => {
    const {username, password, showError, errorMsg} = this.state
    return (
      <>
        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          value={username}
          placeholder="Username"
          type="text"
          onChange={this.onChangeUsername}
        />
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          value={password}
          placeholder="Password"
          type="password"
          onChange={this.onChangePassword}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {showError ? <p className="error-msg">{errorMsg}</p> : ''}
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            {this.renderForm()}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
