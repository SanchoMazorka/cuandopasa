import {useEffect, useState} from 'react'
import Countdown from './Countdown'

const ArrivalItem = ({Description, Arrival, DT}) => {
	const [dt, setDT] = useState(DT)
	const [at, setAT] = useState()
	const timestamp = Date.now();

	useEffect(() => {

		let arrival_time = Arrival.split(" ")[0]=="Llegando"?Number(-1):Number(Arrival.split(" ")[0])
		let temp_dt = new Date(DT.getTime() + (arrival_time==-1?0:arrival_time)*60000)
		setAT(arrival_time)
		setDT(temp_dt)
	}, [])
	
	return (
		<div key={`${timestamp}${Math.random()}`} className="arrivalContainer1">
			<div className="squareFlag">
				<span>{Description}</span>
			</div>
			<div className="arrivalData">
				<Countdown time={at}></Countdown>
				{<span>Hora aproximada {`${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`}</span>}
			</div>
		</div>
	)
}

export default ArrivalItem