import { useContext, useState } from 'react'
import { contextFromSOAP } from '../context/ServiceContext'
import ArrivalDisplay from './ArrivalDisplay'
import Droplist from './Droplist'
import FavsDisplay from './FavsDisplay'
import InputSection from './InputSection'

const WidgetBusByStreets = () => {
	const { DataLines, Favs, sortData } = useContext(contextFromSOAP)

	const [DataStreets, setDataStreets] = useState([])
	const [DataIntersections, setDataIntersections] = useState([])
	const [DataStops, setDataStops] = useState([])
	const [DataArrivals, setDataArrivals] = useState([])
	
	const [LineID, setLineID] = useState(0)
	const [StreetID, setStreetID] = useState(-1)
	const [IntersectionID, setIntersectionID] = useState(-1)
	const [PathID, setPathID] = useState(-1)
	const [StopID, setStopID] = useState(-1)
	
	const requestData = async (endpoint) => {
		var myHeaders = new Headers();
		myHeaders.append("Origin", document.referrer.substring(0,document.referrer.length-1));
		myHeaders.append("Host", "server-1-k3946374.deta.app");
		return fetch(`https://server-1-k3946374.deta.app/${endpoint}`, {method: 'GET', headers: myHeaders})
  };
	
	const getMainStreet = async (line_id) => {
		//console.log("SELECT: getMainStreet")
		setLineID(line_id)
		setDataIntersections([])
		setDataStops([])
		setDataArrivals([])
		requestData(`streets/${line_id}`).then(response => response.json())
		.then(result => {
			let json = sortData(JSON.parse(result)["calles"], "Descripcion")
			setDataStreets(json)
		})
		.catch(error => {
			setDataStreets(-1)
			console.log('error', error)
		})
	}


	const getIntersectionStreet = async (street_id) => {
		//console.log("SELECT: getIntersectionStreet")
		setStreetID(street_id)
		setDataStops([])
		setDataArrivals([])
		requestData(`intersections/${LineID}/${street_id}`).then(response => response.json())
		.then(result => {
			let json = sortData(JSON.parse(result)["calles"], "Descripcion")
			setDataIntersections(json)
		})
		.catch(error => {
			setDataIntersections(-1)
			console.log('error', error)
		});
	}


	const getStops = async (intersection_id) => {
		//console.log("SELECT: getPath")
		setIntersectionID(intersection_id)
		setDataArrivals([])
		requestData(`stops/${LineID}/${StreetID}/${intersection_id}`).then(response => response.json())
		.then(result => {
			let json = sortData(JSON.parse(result)["paradas"], "Descripcion")
			setDataStops(json)
		})
		.catch(error => {
			setDataStops(-1)
			console.log('error', error)
		});
	}


	const getArrivals = async (stop_id, line_id=0) => {
		//console.log("SELECT: getPath")
		setStopID(stop_id)
		
		requestData(`arrivals/${stop_id}/${LineID}`).then(response => response.json())
		.then(result => {
			let json = JSON.parse(result)
			if (json.CodigoEstado==-1) {json = JSON.parse('{"arribos": []}')}
			setDataArrivals(json.arribos)
		})
		.catch(error => console.log('error', error));
	}

	const manageFavorites = () => {

	}

	return (
		<>
			<div className="selectContainer">
				<label>FAVORITOS</label>
				<FavsDisplay data={Favs} callback={getArrivals} />
			</div>

			<div className="selectContainer">
				<label>LÍNEA</label>
				<div className="divPartIcon f-jc-sb">
					<Droplist nameData="line" valueData="CodigoLineaParada" textData="Descripcion" data={DataLines!=-1?DataLines:[]} callback={getMainStreet} />
					{ DataLines==-1?<span className="material-icons-outlined c-green">refresh</span>:undefined}
				</div>
			</div>

			<div className="selectContainer">
				<label>CALLE</label>
				<div className="divPartIcon f-jc-sb">
					<Droplist nameData="mainStreet" valueData="Codigo" textData="Descripcion" data={DataStreets} callback={getIntersectionStreet} />
					{ DataStreets==-1?<span className="material-icons-outlined c-green">refresh</span>:undefined}
				</div>
			</div>

			<div className="selectContainer">
				<label>INTERSECCIÓN</label>
				<div className="divPartIcon f-jc-sb">
					<Droplist nameData="intersectionStreet" valueData="Codigo" textData="Descripcion" data={DataIntersections} callback={getStops} />
					{ DataIntersections==-1?<span className="material-icons-outlined c-green">refresh</span>:undefined}
				</div>
			</div>

			<InputSection label="INTERSECCIÓN" valueData="Codigo" textData="Descripcion"/>


			<div className="selectContainer">
				<label>PARADA</label>
				<div className="divPartIcon f-jc-sb">
					<Droplist nameData="stops" valueData="Identificador" textData="Descripcion" data={DataStops!=-1?DataStops:[]} callback={getArrivals} />
					{ DataStops==-1?<span className="material-icons-outlined c-green">refresh</span>:undefined}
				</div>
			</div>

			<div className="selectContainer">
				<label>ARRIBOS</label>
				<div className="divPartIcon f-jc-sb">
					<span>PARADA #{16799}</span>
					<span className="material-icons-outlined c-red" onClick={manageFavorites}>
						{ Favs.find(item => item.stop==StopID)==undefined?"favorite_border":"favorite" }
					</span>
				</div>
					<ArrivalDisplay data={DataArrivals} stop={StopID} />
			</div> 
		</>
	)
}

export default WidgetBusByStreets