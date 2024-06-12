import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {TiStar} from 'react-icons/ti'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

class JobItemDetails extends Component {
  state = {
    similarJobsList: [],
    JobItemDetailsList: {},
    skillsList: [],
    isJobDetailsFailure: false,
    isLoading: true,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        skills: data.job_details.skills,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        id: data.job_details.id,
      }
      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmenType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      const updatedSkillsList = data.job_details.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({
        JobItemDetailsList: jobDetails,
        similarJobsList: updatedSimilarJobs,
        skillsList: updatedSkillsList,
        isJobDetailsFailure: false,
        isLoading: false,
      })
    } else {
      this.setState({isJobDetailsFailure: true, isLoading: false})
    }
  }

  renderJobItemDetails = () => {
    const {JobItemDetailsList, skillsList} = this.state
    const {
      companyLogoUrl,
      skills,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
      id,
    } = JobItemDetailsList
    return (
      <>
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="company-title">{title}</h1>
            <div className="rating-container">
              <TiStar className="rating-star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-salary-details">
          <div className="location-salary-card">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="job-location">{location}</p>
            </div>
            <div className="job-role-container">
              <BsBriefcaseFill className="job-type-icon" />
              <p className="employement-type">{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="website-link-container">
          <h1>Description</h1>
          <div className="website-link">
            <a href={companyWebsiteUrl}>Visit</a>
            <BsBoxArrowUpRight className="up-arrow-icon" />
          </div>
        </div>
        <p>{jobDescription}</p>
        <h1>Skills</h1>
        <ul className="skills-list">
          {skillsList.map(each => (
            <li className="skill-item" key={each.name}>
              <img
                src={each.imageUrl}
                alt={each.name}
                className="skill-image"
              />
              <h1 className="skill-name">{each.name}</h1>
            </li>
          ))}
        </ul>
        <h1>Life at Company</h1>
      </>
    )
  }

  renderJobDetailsFailureView = () => (
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
      <button className="retry-button" onClick="">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {
      JobItemDetailsList,
      similarJobsList,
      skillsList,
      isLoading,
      isJobDetailsFailure,
    } = this.state
    return (
      <div className="job-item-details-container">
        <Header />
        <div className="job-item-details-card-container">
          {isLoading && this.renderLoadingView()}
          {this.renderJobItemDetails()}
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <SimilarJobs similarJobsList={similarJobsList} />
      </div>
    )
  }
}

export default JobItemDetails
