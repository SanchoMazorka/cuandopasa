import {createContext, useState, useEffect} from 'react'

//export const ContextFromSOAP = createContext()
const { Provider } = ContextFromSOAP

export default function ServiceContext({ children }) {
	
	const [busLines, setBusLines] = useState([])
	const initialContext = { busLines }

	useEffect(() => {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};
		
		fetch("http://localhost:8000/lineas", requestOptions)
			.then(response => response.json())
			.then(result => {
				console.log("FETCH CONCRETADO")
				let j = JSON.parse(result)
				setBusLines(j.lineas)
			})
			.catch(error => console.log('error', error));
	}, [])



	return (
		<Provider value={initialContext}>{children}</Provider>
	)
}
//export default ServiceContext



