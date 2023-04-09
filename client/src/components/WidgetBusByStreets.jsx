import { useContext, useState } from 'react'
import { contextFromSOAP } from '../context/ServiceContext'
import Droplist from './Droplist';

const WidgetBusByStreets = () => {
	const { DataLines } = useContext(contextFromSOAP)
	
	
	const [DataStreets, setDataStreets] = useState(Array(0))
	const [StreetsBool, setStreetsBool] = useState(false)
	const [DataIntersections, setDataIntersections] = useState(Array(0))
	const [IntersectionsBool, setIntersectionsBool] = useState(false)
	const [DataStops, setDataStops] = useState(Array(0))
	const [StopsBool, setStopsBool] = useState(false)
	const [DataArrivals, setDataArrivals] = useState(Array(0))
	const [ArrivalsBool, setArrivalsBool] = useState(false)
	
	const [LineID, setLineID] = useState(0)
	const [StreetID, setStreetID] = useState(-1)
	const [IntersectionID, setIntersectionID] = useState(-1)
	const [PathID, setPathID] = useState(-1)
	const [StopID, setStopID] = useState(-1)

	const requestData = async (endpoint) => {
		return fetch(`http://localhost:8000/${endpoint}`, {method:'GET',	redirect:'follow'})
  };
	
	const sortData = (data, field) => {
		return data.sort((a, b) => {
			if (a[field] < b[field]) { return -1; }
		});
	}

	const getMainStreet = async (line_id) => {
		//console.log("SELECT: getMainStreet")
		setLineID(line_id)
		let api_response = requestData(`streets/${line_id}`)
		api_response.then(response => response.json())
		.then(result => {
			//console.log(`FETCH CONCRETADO: /streets/${line_id}`)
			//console.log(result)
			let json = sortData(JSON.parse(result)["calles"], "Descripcion")
			setDataStreets(json)
			setStreetsBool(true)
		})
		.catch(error => console.log('error', error));
	}

	const getIntersectionStreet = async (street_id) => {
		//console.log("SELECT: getIntersectionStreet")
		setStreetID(street_id)
		let api_response = requestData(`intersections/${LineID}/${street_id}`)
			api_response.then(response => response.json())
			.then(result => {
				//console.log(`FETCH CONCRETADO: /intersections/${street_id}`)
				////console.log(result)	
				let json = sortData(JSON.parse(result)["calles"], "Descripcion")
				setDataIntersections(json)
				setIntersectionsBool(true)
			})
			.catch(error => console.log('error', error));
	}

	const getStops = async (intersection_id) => {
		//console.log("SELECT: getPath")
		setIntersectionID(intersection_id)
		let api_response = requestData(`stops/${LineID}/${StreetID}/${intersection_id}`)
		api_response.then(response => response.json())
		.then(result => {
			//console.log(`FETCH CONCRETADO: /paths/${LineID}/${StreetID}/${intersection_id}`)
			console.log(result)
			let json = sortData(JSON.parse(result)["paradas"], "Descripcion")
			setDataStops(json)
			setStopsBool(true)
		})
		.catch(error => console.log('error', error));
	}

	const getArrivals = async (stop_id, line_id=0) => {
		//console.log("SELECT: getPath")
		setStopID(stop_id)
		//let api_response = requestData(`arrivals/${stop_id}/${line_id||LineID}`)
		let api_response = requestData(`test-arribo`)
		api_response.then(response => response.json())
		.then(result => {
			//console.log(`FETCH CONCRETADO: /paths/${LineID}/${StreetID}/${intersection_id}`)
			console.log(result)
			let json = JSON.parse(result)["arribos"]
			setDataArrivals(json)
			setArrivalsBool(true)
		})
		.catch(error => console.log('error', error));
	}

	return (
		<>
			{ DataLines.length>0 && <Droplist nameData="line" valueData="CodigoLineaParada" textData="Descripcion" data={DataLines} callback={getMainStreet} />}
			<br />
			{ StreetsBool && <Droplist nameData="mainStreet" valueData="Codigo" textData="Descripcion" data={DataStreets} callback={getIntersectionStreet} />}
			<br />
			{ IntersectionsBool && <Droplist nameData="intersectionStreet" valueData="Codigo" textData="Descripcion" data={DataIntersections} callback={getStops} />}
			<br />
			{ StopsBool && <Droplist nameData="intersectionStreet" valueData="Codigo" textData="Descripcion" data={DataStops} callback={getArrivals} />}
			<br />
			{ ArrivalsBool && <div>ARRIBOS CARGADOS</div>}
		</>
	)
}

export default WidgetBusByStreets