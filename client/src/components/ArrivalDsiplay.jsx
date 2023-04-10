import React from 'react'
import Countdown from './Countdown'

const ArrivalDsiplay = ({data}) => {
	console.info(data.length)
	return (
		<div className="arrivalContainer">
		{
			data.length>0? data.map( (item, index) => {
				return (
					<div key={index} className="arrival">
						<b>LÍNEA {item.DescripcionBandera}</b>
						<Countdown time={item.Arribo.split(" ")[0]} />
					</div>
				)
			})
			: <span>NO HAY PRÓXIMOS ARRIBOS</span>
		}	
		</div>
	)
}

export default ArrivalDsiplay