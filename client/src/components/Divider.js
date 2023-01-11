/**
 * Simple divider component, used to seperate larger sections.
 * Rendered throughout the web-app
 */
const Divider = () => {
  return (
    <div
      className="my-5"
      style={{ width: '100%', height: '1px', background: 'var(--grey)' }}
    ></div>
  )
}

export default Divider
