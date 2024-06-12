import {TiStar} from 'react-icons/ti'

import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobs = props => {
  const {similarJobsList} = props
  return (
    <ul className="similar-jobs-list-item">
      {similarJobsList.map(eachJob => (
        <li key={eachJob.id} className="similar-job-item">
          <div className="company-logo-container">
            <img
              src={eachJob.companyLogoUrl}
              alt="similar job company logo"
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
          <h1>Description</h1>
          <p>{eachJob.jobDescription}</p>
          <div className="location-salary-card">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="job-location">{eachJob.location}</p>
            </div>
            <div className="job-role-container">
              <BsBriefcaseFill className="job-type-icon" />
              <p className="employement-type">{eachJob.employmenType}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SimilarJobs
