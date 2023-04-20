import {useEffect, useState} from 'react'

const Countdown = ({time}) => {
	const [Minutes, setMinutes] = useState(Number(time))	
	const [Alert, setAlert] = useState("")	

	useEffect(() => {
		if (Minutes<=5) setAlert(" red")
		if (Minutes) setTimeout(() => setMinutes(min => min-1), 1000);
	}, [Minutes])
	
	return (
		<span className={"time"+Alert}>ARRIBANDO EN {Minutes} MINUTOS.</span>
	)
}

export default Countdown