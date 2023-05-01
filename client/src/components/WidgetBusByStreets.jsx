import { useContext, useState, useEffect, useRef } from 'react'
import { contextFromSOAP } from '../context/ServiceContext'
import FavsDisplay from './FavsDisplay'
import InputSection from './InputSection'
import ArrivalDisplay from './ArrivalDisplay'

const WidgetBusByStreets = () => {
	const [lineID, setLineID] = useState("")
	const [streetID, setStreetID] = useState("")
	const [intersectionID, setIntersectionID] = useState("")
	const [stopID, setStopID] = useState("")
	const [favID, setFavID] = useState(0)
	const [favorite, setFavorite] = useState(false)
	const { DataLines, Favs, manageFavorites, sortData } = useContext(contextFromSOAP)
	const ref = useRef(null)
	

	const componentKeys = {
		lines: {value:"CodigoLineaParada", key:"lineas", endpoint: () => `lineas`},
		streets: {value:"Codigo", data:"calles", endpoint: (line_id) => line_id==""?"":`streets/${line_id}`},
		intersections: {value:"Codigo", data:"calles", endpoint: (line_id, street_id) => line_id==""||street_id==""?"":`intersections/${line_id}/${street_id}`},
		stops: {value:"Identificador", data:"paradas", endpoint: (line_id, street_id, intersection_id) => line_id==""||street_id==""||intersection_id==""?"":`stops/${line_id}/${street_id}/${intersection_id}`},
		arrivals: {data:"arribos", endpoint: (stop_id, line_id=0) => stop_id==""?"":`arrivals/${stop_id}/${line_id}`}
	}

	useEffect(() => {
		setFavorite(Favs.find(item => item.stop==favID?stopID:favID)==undefined?false:true)
	})

	const checkFavs = (stop_id) => {
		manageFavorites(stopID, ref.current.textContent.slice(11))
	}

	return (
		<>
			<div className="selectContainer">
				<label>FAVORITOS</label>
				<FavsDisplay data={Favs} callback={stop_id => {console.warn(stop_id); setFavID(stop_id)}} />
			</div>
			
			<InputSection label="LÍNEA" 
			endpoint={componentKeys.lines.endpoint()}
			CK={componentKeys.lines}
			callback={setLineID}
			reset={()=>setFavID(0)} />

			<InputSection label="CALLES" 
			endpoint={componentKeys.streets.endpoint(lineID)}
			CK={componentKeys.streets}
			callback={setStreetID}
			reset={()=>setFavID(0)} />
			
 			<InputSection label="INTERSECCIONES" 
			endpoint={componentKeys.intersections.endpoint(lineID, streetID)}
			CK={componentKeys.intersections}
			callback={setIntersectionID} 
			reset={()=>setFavID(0)} />
			
			<InputSection label="PARADAS" 
			endpoint={componentKeys.stops.endpoint(lineID, streetID, intersectionID)}
			CK={componentKeys.stops}
			callback={setStopID} 
			refHook={ref} 
			reset={()=>setFavID(0)} />

			{(stopID!="" || favID>0) && 
			<div className="selectContainer">
				{/* <label>ARRIBOS</label> */}
				<div className="divPartIcon f-jc-sb">
					<span className="c-logo">PARADA #{favID||stopID}</span>
					<span onClick={()=>checkFavs(stopID)} className={favorite?"material-icons-outlined c-red":"material-icons-outlined c-gray"} >
						{ favorite?"favorite":"favorite_border" }
					</span>
				</div>
					<ArrivalDisplay endpoint={componentKeys.arrivals.endpoint(favID||stopID, favID?0:lineID)}/>
			</div>}
		</>
	)
}

export default WidgetBusByStreets