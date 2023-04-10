import React from 'react'
import Countdown from './Countdown'

const ArrivalDsiplay = ({data}) => {
	return (
		<div className="arrivalContainer">
		{
			data.map( (item, index) => {
				return (
					<div key={index} className="arrival">
						<b>LÍNEA {item.DescripcionBandera}</b>
						<Countdown time={item.Arribo.split(" ")[0]} />
					</div>
					)
			})
		}	
		</div>
	)
}

export default ArrivalDsiplay