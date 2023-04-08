import ServiceContext from './context/ServiceContext'
import Main from './layout/Main'

import './App.css'

function App() {

  return (
		<ServiceContext>
			<Main />
		</ServiceContext>
  )
}

export default App
