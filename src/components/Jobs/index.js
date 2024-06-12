import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {BsSearch, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {TiStar} from 'react-icons/ti'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileList: {},
    jobsList: [],
    checkboxInputs: [],
    isProfileFailure: false,
    isProfileLoading: true,
    isJobsListLoading: true,
    isJobsFailure: false,
    searchInput: '',
    radioInput: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getJobsData = async () => {
    const {searchInput, radioInput, checkboxInputs} = this.state
    console.log(checkboxInputs)
    this.setState({isJobsListLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    //console.log(updatedJobsData)
    if (response.ok) {
      const data = await response.json()
      console.log(data.jobs)
      const updatedJobsData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employementType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: updatedJobsData,
        isJobsListLoading: false,
        isJobsFailure: false,
      })
    } else {
      this.setState({
        isJobsFailure: true,
        isJobsListLoading: false,
      })
    }
  }

  getProfileData = async () => {
    this.setState({isProfileLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data.profile_details)
      const updatedProfileData = {
        profileImageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileList: updatedProfileData,
        isProfileLoading: false,
        isProfileFailure: false,
      })
    } else {
      this.setState({isProfileFailure: true, isProfileLoading: false})
    }
  }

  onClickProfileRetryButton = () => {
    this.getProfileData()
  }

  renderProfileView = () => {
    const {profileList, isProfileFailure, isProfileLoading} = this.state
    const {profileImageUrl, name, shortBio} = profileList
    return (
      <>
        {isProfileLoading && this.renderLoadingView()}
        {isProfileFailure ? (
          <button
            className="retry-button"
            onClick={this.onClickProfileRetryButton}
          >
            Retry
          </button>
        ) : (
          <div className="profile-view-container">
            <img src={profileImageUrl} alt={name} className="profile-image" />
            <h1 className="profile-name">{name}</h1>
            <p className="profile-bio">{shortBio}</p>
          </div>
        )}
      </>
    )
  }

  renderJobsList = () => {
    const {jobsList, radioInput} = this.state

    //console.log(radioInput)
    return (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <li key={eachJob.id} className="job-items-list">
            <Link to={`/jobs/${eachJob.id}`} className="link-item">
              <div className="company-logo-container">
                <img
                  src={eachJob.companyLogoUrl}
                  alt="job details company logo"
                  className="company-logo"
                />
                <div>
                  <h1 className="company-title">{eachJob.title}</h1>
                  <div className="rating-container">
                    <TiStar className="rating-star" />
                    <p>{eachJob.rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-salary-details">
                <div className="location-salary-card">
                  <div className="location-container">
                    <MdLocationOn className="location-icon" />
                    <p className="job-location">{eachJob.location}</p>
                  </div>
                  <div className="job-role-container">
                    <BsBriefcaseFill className="job-type-icon" />
                    <p className="employement-type">
                      {eachJob.employementType}
                    </p>
                  </div>
                </div>
                <p>{eachJob.packagePerAnum}</p>
              </div>
              <hr />
              <h1>Description</h1>
              <p>{eachJob.jobDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-view-image"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  onClickJobsRetryButton = () => {
    this.getJobsData()
  }

  renderJobsFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-image"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-button" onClick={this.onClickJobsRetryButton}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onGetCheckboxOption = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      each => each === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.getJobsData,
      )
    } else {
      const filteredData = checkboxInputs.filter(
        each => each !== event.target.id,
      )
      this.setState(
        prevState => ({checkboxInputs: filteredData}),
        this.getJobsData,
      )
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeRadioButton = event => {
    this.setState({radioInput: event.target.id}, this.getJobsData)
  }

  onClickSearchButton = () => {
    this.getJobsData()
  }

  onClickEnter = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  render() {
    // console.log(employmentTypesList)
    const {
      jobsList,
      isJobsListLoading,
      isJobsFailure,
      searchInput,
      radioInput,
    } = this.state

    return (
      <>
        <div className="jobs-container">
          <Header />
          <div className="jobs-responsive-container">
            <div className="first-div">
              <div className="mobile-devices-input-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onClickEnter}
                  value={searchInput}
                />
                <button
                  type="button"
                  className="search-button"
                  data-testid="searchButton"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderProfileView()}
              <hr className="hr-line" />
              <h1>Type of Employement</h1>
              <ul className="employement-types-list">
                {employmentTypesList.map(each => (
                  <li
                    key={each.employmentTypeId}
                    className="employement-types-list-item"
                  >
                    <input
                      id={each.employmentTypeId}
                      className="checkbox"
                      type="checkbox"
                      onChange={this.onGetCheckboxOption}
                    />
                    <label htmlFor={each.employmentTypeId}>{each.label}</label>
                  </li>
                ))}
              </ul>
              <hr className="hr-line" />
              <h1>Salary Range</h1>
              <ul className="salary-range-list">
                {salaryRangesList.map(each => (
                  <li
                    key={each.salaryRangeId}
                    className="salary-range-list-item"
                  >
                    <input
                      id={each.salaryRangeId}
                      type="radio"
                      className="radio-input"
                      name="option"
                      onChange={this.onChangeRadioButton}
                    />
                    <label htmlFor={each.salaryRangeId} className="radio">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="second-div">
              <div className="input-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onClickEnter}
                  value={searchInput}
                />
                <button
                  type="button"
                  className="search-button"
                  data-testid="searchButton"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <ul className="jobs-list">
                {isJobsListLoading && this.renderLoadingView()}
                {jobsList.length === 0 && this.renderNoJobsView()}
                {isJobsFailure
                  ? this.renderJobsFailureView()
                  : this.renderJobsList()}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
