import { createContext, useState, useEffect } from 'react'
import useEndpoint from '../api/useEndpoint'

export const contextFromSOAP = createContext()
const { Provider } = contextFromSOAP

const ServiceContext = ({ children }) => {
	const [DataLines, setDataLines] = useState([])
	const [Favs, setFavs] = useState([])
	
	useEffect(() => {
		var myHeaders = new Headers();
		myHeaders.append("Origin", document.referrer.substring(0,document.referrer.length-1));
		myHeaders.append("Host", "server-1-k3946374.deta.app");
		
		fetch("https://server-1-k3946374.deta.app/lineas", {method:'GET', headers:myHeaders})
		.then(response => response.json())
		.then(result => {
			let json = JSON.parse(result)
			//json = sortData(json.lineas, "Descripcion")
			setDataLines(json.lineas)
		})
		.catch(error => {
			setDataLines(-1)
			console.log('error', error)
		})
		
		let f = localStorage.getItem('favs')
		f = JSON.parse(f||'[{"description": "18", "stop": "84434", "line": 55}, {"description": "18", "stop": "32293", "line": 35}]')	
		setFavs(f)
		
	}, [])
	
	const sortData = (data, field) => {
		return data.sort((a, b) => {
			if (a[field] < b[field]){
				return -1;
			}
		});
	}

	const addFavs = () => {

	}
	const removeFavs = () => {

	}
	
	const initialContext = { DataLines, Favs, sortData }
	return( <Provider value={initialContext}>{children}</Provider> )
}

export default ServiceContext



