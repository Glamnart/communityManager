
import './App.css'
import RequestForm from './RequestForm'
import type { SupportRequest } from './types/types'

function App() {
  const handleNewRequest = (newRequest: SupportRequest) => {
    console.log("New support request submitted:", newRequest);
    // Save to localStorage
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
          <RequestForm onSubmit={handleNewRequest} />
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
