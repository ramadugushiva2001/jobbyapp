import './index.css'

const NotFoud = () => (
  <div className="notfound-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="notfound-heading">Page Not Found</h1>
    <p className="notfound-description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFoud
