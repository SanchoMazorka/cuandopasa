import {useContext, useState, useEffect} from 'react'
import ArrivalItem from './ArrivalItem'
import useEndpoint from '../api/useEndpoint'
import { contextFromSOAP } from '../context/ServiceContext'

const ArrivalDisplay = ({endpoint}) => {
	const {data, loading, error, fetchData} = useEndpoint(endpoint)
	const { Favs } = useContext(contextFromSOAP)
	const [dt, setDT] = useState(new Date())
	const timestamp = Date.now();
	//data = []
	console.log(data)
	return(
		<>
		{data.length? 
		data.map((item, index) => <ArrivalItem key={`${timestamp}${index}`} Description={item.DescripcionBandera} Arrival={item.Arribo} DT={dt} />)
		: <span>NO HAY PRÓXIMOS ARRIBOS</span>}
		</>
	)
}

export default ArrivalDisplay
