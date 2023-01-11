//Ussed to display a process bar with the inputted scroll %
/**
 * Displays a progress bar to give user indication of where they are in the questionnaire.
 * param: scroll percentage
 */

const NavScroll = ({ scrollPos }) => {
  return (
    <>
      <nav className="navbar bg-light sticky-top">
        <div
          class="progress"
          style={{
            width: '100%',
            marginLeft: '20px',
            marginRight: '20px',
            height: '10px',
          }}
        >
          <div
            class="progress-bar progress-bar-animated"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${scrollPos}` }}
          ></div>
        </div>
      </nav>
    </>
  )
}

export default NavScroll
