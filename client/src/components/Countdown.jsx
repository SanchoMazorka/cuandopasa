import {useEffect, useState} from 'react'

const Countdown = ({time}) => {
	const [Minutes, setMinutes] = useState(Number(time))	
	const [Alert, setAlert] = useState("")	

	useEffect(() => {
		if (Minutes<=5) setAlert("red")
		if (Minutes<0) return
		if (Minutes) setTimeout(() => setMinutes(min => min-1), 1000*60);
	}, [Minutes])
	
	return (
		<span className={Alert}>{Minutes<=0?"ARRIBANDO":`PASA EN ${Minutes} MINUTOS.`}</span>
	)
}

export default Countdown