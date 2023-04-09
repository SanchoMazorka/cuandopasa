import {createContext, useState, useEffect} from 'react'
export const contextFromSOAP = createContext()
const { Provider } = contextFromSOAP

const ServiceContext = ({ children }) => {
	const [DataLines, setDataLines] = useState([])
	const initialContext = { DataLines }

	useEffect(() => {
		fetch("http://localhost:8000/lineas", {method:'GET', redirect:'follow'})
			.then(response => response.json())
			.then(result => {
				console.log("FETCH: ServiceContext")
				let json = JSON.parse(result)
				json = sortData(json.lineas, "Descripcion")
				//console.log(json.lineas)
				setDataLines(json.lineas)
			})
			.catch(error => console.log('error', error));
	}, [])

	const sortData = (data, field) => {
		return data.sort((a, b) => {
			if (a[field] < b[field]){
				return -1;
			}
		 });
	}

	return (
		<Provider value={initialContext}>{children}</Provider>
	)
}

export default ServiceContext



