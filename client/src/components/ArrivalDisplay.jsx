import {useContext} from 'react'
import Countdown from './Countdown'
import { contextFromSOAP } from '../context/ServiceContext'

const ArrivalDisplay = ({data}) => {
	const timestamp = Date.now();
	const { Favs } = useContext(contextFromSOAP)
	//data = [1,2]
	return(
		<>
		{data.length? data.map((item, index) => { return( 
		<div key={`${timestamp}${index}`} className="arrivalContainer1">
			<div className="squareFlag">
				<span>{item.DescripcionBandera}</span>
			</div>
			<div className="arrivalData">
				<Countdown time={item.Arribo.split(" ")[0]}></Countdown>
				<span>Hora aproximada 15:50</span>
			</div>
		</div>)})
		: <span>NO HAY PRÓXIMOS ARRIBOS</span>}
		</>
	)
}

export default ArrivalDisplay





/* 	return ( 
		<div>
			<span className="stopId">PARADA #{stop_id}</span>

			{data.length ? data.map((item, index) => {
				return (<div key={`${timestamp}${index}`} className="arrivalContainer1">
					<div className="squareFlag">
						<span>{item.DescripcionBandera}</span>
					</div>
					<div className="arrivalData">
						<span>ARRIBANDO EN 13 MINUTOS.</span>
						<span></span>
					</div>
					<div className="arrivalFavs">
						<span className="material-icons-outlined">favorite_border</span>
					</div>
				</div>)
			})
			: <span>NO HAY PRÓXIMOS ARRIBOS</span>}
		</div>
	) */
