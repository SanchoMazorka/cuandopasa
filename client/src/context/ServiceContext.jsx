import { createContext, useState, useEffect } from 'react'
import useEndpoint from '../api/useEndpoint'

export const contextFromSOAP = createContext()
const { Provider } = contextFromSOAP

const ServiceContext = ({ children }) => {
	const [Favs, setFavs] = useState([])
	const {DataLines} = ""//useEndpoint("lineas")
	
	useEffect(() => {
		let f = localStorage.getItem('favs')
		f = JSON.parse(f||'[{"description": "18", "stop": "84434"}, {"description": "otro 18", "stop": "34271"}]')	
		setFavs(f)
		//console.log(DataLines)
	}, [DataLines])
	
	const sortData = (data, field) => {
		return data.sort((a, b) => {
			if (a[field] < b[field]){
				return -1;
			}
		});
	}

	const manageFavorites = (stop_id, description) => {
		let temp_index = -1
		Favs.find((item, index) => {
			if (item.stop==stop_id) temp_index = index
		});

		let temp_favs = [...Favs]

		if (temp_index==-1) {
			temp_favs.push(JSON.parse(`{"description": "${description}", "stop": ${stop_id}} `))
		} else {
			temp_favs.splice(temp_index, 1)
		}
		setFavs(temp_favs)
		localStorage.setItem("favs", JSON.stringify(temp_favs))
	}

	const initialContext = { DataLines, Favs, manageFavorites, sortData }
	return( <Provider value={initialContext}>{children}</Provider> )
}

export default ServiceContext