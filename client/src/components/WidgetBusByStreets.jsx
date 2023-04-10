import { useContext, useState } from 'react'
import { contextFromSOAP } from '../context/ServiceContext'
import Droplist from './Droplist'
import ArrivalDsiplay from './ArrivalDsiplay'


const WidgetBusByStreets = () => {
	const { DataLines } = useContext(contextFromSOAP)
	const [DataStreets, setDataStreets] = useState(Array(0))
	const [DataIntersections, setDataIntersections] = useState(Array(0))
	const [DataStops, setDataStops] = useState(Array(0))
	const [DataArrivals, setDataArrivals] = useState(Array(0))
	
	const [StreetsBool, setStreetsBool] = useState(false)
	const [IntersectionsBool, setIntersectionsBool] = useState(false)
	const [StopsBool, setStopsBool] = useState(false)
	const [ArrivalsBool, setArrivalsBool] = useState(false)
	
	const [LineID, setLineID] = useState(0)
	const [StreetID, setStreetID] = useState(-1)
	const [IntersectionID, setIntersectionID] = useState(-1)
	const [PathID, setPathID] = useState(-1)
	const [StopID, setStopID] = useState(-1)

	const requestData = async (endpoint) => {
		var myHeaders = new Headers();
		//myHeaders.append("x-api-key", "e0Bebwq4eSnf_VY4ACkePfxMCwoomwzuZUn3cafaKkYY7");
		myHeaders.append("Origin", document.referrer.substring(0,document.referrer.length-1));
		myHeaders.append("Host", "server-1-k3946374.deta.app");
		
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			//redirect:'follow'			
		};
		return fetch(`https://server-1-k3946374.deta.app/${endpoint}`, requestOptions)
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
		let api_response = requestData(`arrivals/${stop_id}/${LineID}`)
		//let api_response = requestData(`arrivals/${stop_id}/${line_id||LineID}`)
		//let api_response = requestData(`test-arribo`)
		api_response.then(response => response.json())
		.then(result => {
			//console.log(`FETCH CONCRETADO: /paths/${LineID}/${StreetID}/${intersection_id}`)
			console.info(result)
			let json = JSON.parse(result)
			if (json.CodigoEstado==-1) {json = JSON.parse('{"arribos": []}')}
			setDataArrivals(json.arribos)
			setArrivalsBool(true)
		})
		.catch(error => console.log('error', error));
	}

	return (
		<>
			{false && <input type="button" value="OBTENER" onClick={() => getArrivals(25000)}/>}
			{ DataLines.length>0 && <Droplist nameData="line" hint="SELECCIONAR LÍNEA" valueData="CodigoLineaParada" textData="Descripcion" data={DataLines} callback={getMainStreet} />}
			<br />
			{ StreetsBool && <Droplist nameData="mainStreet" hint="SELECCIONAR CALLE" valueData="Codigo" textData="Descripcion" data={DataStreets} callback={getIntersectionStreet} />}
			<br />
			{ IntersectionsBool && <Droplist nameData="intersectionStreet" hint="SELECCIONAR INTERSECCIÓN" valueData="Codigo" textData="Descripcion" data={DataIntersections} callback={getStops} />}
			<br />
			{ StopsBool && <Droplist nameData="intersectionStreet" hint="SELECCIONAR PARADA" valueData="Identificador" textData="Descripcion" data={DataStops} callback={getArrivals} />}
			<br />
			{ ArrivalsBool && <ArrivalDsiplay data={DataArrivals} /> }
		</>
	)
}

export default WidgetBusByStreets