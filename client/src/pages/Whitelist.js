import Divider from '../components/Divider'
import instance from '../instance'
import Nav from '../components/Nav'
import { useState, useEffect } from 'react'
import { SpinnerCircular } from 'spinners-react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import researcherIcon from '../img/research.svg'
import clinicianIcon from '../img/clinician.svg'
import adminIcon from '../img/admin.svg'

const Whitelist = () => {
  const navigate = useNavigate()
  const [clinicianWhitelist, setClinicianWhitelist] = useState([]) //Stores fetched clinician whitelist
  const [researcherWhitelist, setResearcherWhitelist] = useState([]) //Stores fetched researcher whitelist
  const [adminWhitelist, setAdminWhitelist] = useState([]) //Stores fetched admin whitelist
  const [addClinicianLoading, setAddClinicianLoading] = useState(false) //Displays loading in add clinician email button
  const [getClinicianLoading, setGetClinicianLoading] = useState(false) //Displays loading when fetching clinician whitelist
  const [addResearcherLoading, setAddResearcherLoading] = useState(false) //Displays loading in add researcher email button
  const [getResearcherLoading, setGetResearcherLoading] = useState(false) //Displays loading when fetching researcher whitelist
  const [getAdminWhitelistLoading, setGetAdminWhitelistLoading] = useState(
    false,
  ) //Displays loading when fetching admin whitelist
  const [addAdminLoading, setAddAdminLoading] = useState(false) //Displays loading in add admin email button

  const authToken = localStorage.getItem('AuthToken') //Retrieve auth bearer token from local storage

  //Check if user is logged in, returns to homepage if session expired/not logged in
  useEffect(() => {
    if (authToken === null) {
      toast.warning('Session expired') //Shows msg
      navigate('/login') //Redirects to login page
    } else {
      getClinicainWhitelist()
      getResearcherWhitelist()
      getAdminWhitelist()
    }
  }, [authToken])

  //Add clinicain whitelist email
  const addClinician = (e) => {
    e.preventDefault()
    setAddClinicianLoading(true) //Set add email btn to loading
    let body = { email: document.getElementById('clinicianAddEmail').value }
    try {
      instance.defaults.headers.common = { Authorization: `${authToken}` }
      instance
        .post('/clinicianWhitelist', body)
        .then((response) => {
          toast.success('Email added to clinician whitelist')
          setAddClinicianLoading(false) //Set button back to normal
          document.getElementById('clinicianAddEmail').value = '' //Clear input
          getClinicainWhitelist()
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.response.data.general)
          setAddClinicianLoading(false) //Set button back to normal
          document.getElementById('clinicianAddEmail').value = '' //Clear input
          getClinicainWhitelist()
        })
    } catch (error) {
      console.log(error)
      setAddClinicianLoading(false)
      document.getElementById('clinicianAddEmail').value = '' //Clear input
    }
  }

  //Add researcher whitelist email
  const addResearcher = (e) => {
    e.preventDefault()
    setAddResearcherLoading(true) //Set add email btn to loading
    let body = { email: document.getElementById('researcherAddEmail').value }
    try {
      instance.defaults.headers.common = { Authorization: `${authToken}` }
      instance
        .post('/researcherWhitelist', body)
        .then((response) => {
          toast.success('Email added to researcher whitelist')
          setAddResearcherLoading(false) //Set button back to normal
          document.getElementById('researcherAddEmail').value = '' //Clear input
          getResearcherWhitelist()
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.response.data.general)
          setAddResearcherLoading(false) //Set button back to normal
          document.getElementById('researcherAddEmail').value = '' //Clear input
          getResearcherWhitelist()
        })
    } catch (error) {
      console.log(error)
      setAddResearcherLoading(false)
      document.getElementById('researcherAddEmail').value = '' //Clear input
    }
  }

  //add admin whitelist email
  const addAdmin = (e) => {
    e.preventDefault()
    setAddAdminLoading(true) //Set add email btn to loading
    let body = { email: document.getElementById('adminAddEmail').value }
    try {
      instance.defaults.headers.common = { Authorization: `${authToken}` }
      instance
        .post('/adminWhitelist', body)
        .then((response) => {
          toast.success('Email added to admin whitelist')
          setAddAdminLoading(false) //Set button back to normal
          document.getElementById('adminAddEmail').value = '' //Clear input
          getAdminWhitelist()
        })
        .catch((error) => {
          toast.error(error.response.data.general)
          setAddAdminLoading(false) //Set button back to normal
          document.getElementById('adminAddEmail').value = '' //Clear input
          getAdminWhitelist()
        })
    } catch (error) {
      console.log(error)
      setAddAdminLoading(false)
      document.getElementById('adminAddEmail').value = '' //Clear input
    }
  }

  //Get all the clinician whitelist emails
  const getClinicainWhitelist = () => {
    setGetClinicianLoading(true) //Set loading
    try {
      instance.defaults.headers.common = { Authorization: `${authToken}` }
      instance
        .get('/clinicianWhitelist')
        .then((response) => {
          console.log(response)
          setClinicianWhitelist(response.data.emails)
          setGetClinicianLoading(false) //Set loading to false
        })
        .catch((error) => {
          toast.error(error.response.data.general)
          setGetClinicianLoading(false) //Set loading to false
        })
    } catch (error) {
      setGetClinicianLoading(false) //Set loading to false
    }
  }

  //Get all the researcher whitelist emails
  const getResearcherWhitelist = () => {
    setGetResearcherLoading(true) //Set loading
    try {
      instance.defaults.headers.common = { Authorization: `${authToken}` }
      instance
        .get('/researcherWhitelist')
        .then((response) => {
          console.log(response)
          setResearcherWhitelist(response.data.emails)
          setGetResearcherLoading(false) //Set loading to false
        })
        .catch((error) => {
          toast.error(error.response.data.general)
          setGetResearcherLoading(false) //Set loading to false
        })
    } catch (error) {
      setGetResearcherLoading(false) //Set loading to false
    }
  }

  //Get all the admin whitelist emails
  const getAdminWhitelist = () => {
    setGetAdminWhitelistLoading(true) //Set loading
    try {
      instance.defaults.headers.common = { Authorization: `${authToken}` }
      instance
        .get('/adminWhitelist')
        .then((response) => {
          console.log(response)
          setAdminWhitelist(response.data.emails)
          setGetAdminWhitelistLoading(false) //Set loading to false
        })
        .catch((error) => {
          toast.error(error.response.data.general)
          setGetAdminWhitelistLoading(false) //Set loading to false
        })
    } catch (error) {
      setGetAdminWhitelistLoading(false) //Set loading to false
    }
  }

  return (
    <>
      <Nav />
      <div
        className=" container d-flex h-100 justify-content-center pb-5"
        style={{ height: '100vh', maxWidth: '410px' }}
      >
        <div className="row p10">
          <h2
            className="text-left mt-5  mb-4 px-0"
            style={{ fontWeight: 'bold' }}
          >
            Admin Whitelist
          </h2>
          {/* Clinicians */}
          <div className="d-flex flex-row px-0">
            <h3 className="px-0">Clinicians </h3>
            <img
              style={{
                height: '20px',
                width: '40px',
                padding: 'none',
                marginTop: '8px',
              }}
              src={clinicianIcon}
            ></img>
          </div>
          <p className="px-0 pb-0 mb-4">
            List of all emails for clinician who have access to the application.
          </p>
          <form
            className="px-0"
            onSubmit={(e) => {
              addClinician(e)
            }}
          >
            <div className="input-group mb-4 px-0">
              <input
                type="email"
                id="clinicianAddEmail"
                className="form-control"
                placeholder="hello@gmail.com"
                required
                minLength="5"
              ></input>
              <button
                className="btn btn-outline-primary"
                type="submit"
                id="button-addon2"
              >
                {addClinicianLoading ? (
                  <>
                    <SpinnerCircular
                      size={20}
                      color={'#0c6efd'}
                      secondaryColor={'#fff'}
                    />
                  </>
                ) : (
                  'Add Email'
                )}
              </button>
            </div>
          </form>
          {getClinicianLoading ? (
            <div className="d-flex justify-content-center">
              <SpinnerCircular
                size={50}
                color={'#0c6efd'}
                secondaryColor={'#fff'}
                style={{ paddingTop: '30px' }}
              />
            </div>
          ) : (
            <div
              className="table-responsive px-0"
              style={{ maxHeight: '200px' }}
            >
              <table className="table table-hover ">
                <thead
                  className="table-light"
                  style={{ top: '0', position: 'sticky' }}
                >
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email Address</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {clinicianWhitelist.map(function (email, i) {
                    return (
                      <tr key={email}>
                        <th scope="row">{i}</th>
                        <td>{email}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
          <Divider />
          {/* Researcher */}
          <div className="d-flex flex-row px-0">
            <h3 className="px-0">Researchers </h3>
            <img
              style={{
                height: '20px',
                width: '40px',
                padding: 'none',
                marginTop: '8px',
              }}
              src={researcherIcon}
            ></img>
          </div>
          <p className="px-0 pb-0 mb-4">
            List of all emails for researchers who have access to all the the
            raw data from the questionnaires stored.
          </p>
          <form
            className="px-0"
            onSubmit={(e) => {
              addResearcher(e)
            }}
          >
            <div className="input-group mb-4 px-0">
              <input
                type="email"
                id="researcherAddEmail"
                className="form-control"
                placeholder="hello@gmail.com"
                required
                minLength="5"
              ></input>
              <button
                className="btn btn-outline-primary"
                type="submit"
                id="button-addon2"
              >
                {addResearcherLoading ? (
                  <>
                    <SpinnerCircular
                      size={20}
                      color={'#0c6efd'}
                      secondaryColor={'#fff'}
                    />
                  </>
                ) : (
                  'Add Email'
                )}
              </button>
            </div>
          </form>
          {getResearcherLoading ? (
            <div className="d-flex justify-content-center">
              <SpinnerCircular
                size={50}
                color={'#0c6efd'}
                secondaryColor={'#fff'}
                style={{ paddingTop: '30px' }}
              />
            </div>
          ) : (
            <div
              className="table-responsive px-0"
              style={{ maxHeight: '200px' }}
            >
              <table className="table table-hover ">
                <thead
                  className="table-light"
                  style={{ top: '0', position: 'sticky' }}
                >
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email Address</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {researcherWhitelist.map(function (email, i) {
                    return (
                      <tr key={email}>
                        <th scope="row">{i}</th>
                        <td>{email}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
          <Divider />
          {/* Admin */}
          <div className="d-flex flex-row px-0">
            <h3 className="px-0">Admins </h3>
            <img
              style={{
                height: '20px',
                width: '40px',
                padding: 'none',
                marginTop: '8px',
              }}
              src={adminIcon}
            ></img>
          </div>
          <p className="px-0 pb-0 mb-4">
            List of all emails for admins, these users have access to all
            questionnaires and can assign new users roles.
          </p>
          <form
            className="px-0"
            onSubmit={(e) => {
              addAdmin(e)
            }}
          >
            <div className="input-group mb-4 px-0">
              <input
                type="email"
                id="adminAddEmail"
                className="form-control"
                placeholder="hello@gmail.com"
                required
                minLength="5"
              ></input>
              <button
                className="btn btn-outline-primary"
                type="submit"
                id="button-addon2"
              >
                {addAdminLoading ? (
                  <>
                    <SpinnerCircular
                      size={20}
                      color={'#0c6efd'}
                      secondaryColor={'#fff'}
                    />
                  </>
                ) : (
                  'Add Email'
                )}
              </button>
            </div>
          </form>
          {getAdminWhitelistLoading ? (
            <div className="d-flex justify-content-center">
              <SpinnerCircular
                size={50}
                color={'#0c6efd'}
                secondaryColor={'#fff'}
                style={{ paddingTop: '30px' }}
              />
            </div>
          ) : (
            <div
              className="table-responsive px-0"
              style={{ maxHeight: '200px' }}
            >
              <table className="table table-hover ">
                <thead
                  className="table-light"
                  style={{ top: '0', position: 'sticky' }}
                >
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email Address</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {adminWhitelist.map(function (email, i) {
                    return (
                      <tr key={email}>
                        <th scope="row">{i}</th>
                        <td>{email}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Whitelist
