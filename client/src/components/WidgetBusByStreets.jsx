import { useContext, useState } from 'react'
import { ContextFromSOAP } from '../context/ServiceContext'
import Droplist from './DropList';

const WidgetBusByStreets = () => {
	const { busLines } = useContext(ContextFromSOAP)
	const [Streets, setStreets] = useState(Array(0))
	const [StreetsBool, setStreetsBool] = useState(false)
	const [Intersection, setIntersection] = useState(0)
	const [IntersectionBool, setIntersectionBool] = useState(false)


	/*const [Line, setLine] = useState(0)
	const [Stop, setStop] = useState(0)*/


	const requestData = async (endpoint) => {
		return fetch(`http://localhost:8000/${endpoint}`, {method:'GET',	redirect:'follow'})
  };
	
	const getMainStreet = async (line_id) => {
		console.log("GETMAINSTREET")
		let api_response = requestData(`parada/${line_id}`)
			api_response.then(response => response.json())
			.then(result => {
				console.log(`FETCH CONCRETADO: /parada/${line_id}`)
				console.log(result)
				let j = JSON.parse(result)["calles"]
				j = j.sort((a, b) => {
					if (a.Descripcion < b.Descripcion) {
						return -1;
					}
				});
				setStreets(j)
				setStreetsBool(true)
			})
			.catch(error => console.log('error', error));
	}

	const getIntersectionStreet = async (street_id) => {
		console.log("GETMAINSTREET")
		let api_response = requestData(`intersection/${street_id}`)
			api_response.then(response => response.json())
			.then(result => {
				console.log(`FETCH CONCRETADO: /parada/${street_id}`)
				console.log(result)
				let j = JSON.parse(result)["calles"]
				j = j.sort((a, b) => {
					if (a.Descripcion < b.Descripcion) {
						return -1;
					}
				});
				setIntersection(j)
				setIntersectionBool(true)
			})
			.catch(error => console.log('error', error));
	}

	return (
		<>
			{ busLines.length>0 && <Droplist nameData="line" valueData="CodigoLineaParada" textData="Descripcion" data={busLines} callback={getMainStreet} />}
			<br />
			{ StreetsBool && <Droplist nameData="mainStreet" valueData="Codigo" textData="Descripcion" data={Streets} callback={getIntersectionStreet} />}
			<br />
			{ IntersectionBool && <Droplist nameData="intersectionStreet" valueData="Codigo" textData="Descripcion" data={Intersection} />}
			
		</>
	)
}

export default WidgetBusByStreets