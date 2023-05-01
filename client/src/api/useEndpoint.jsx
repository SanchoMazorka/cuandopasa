import { useState, useEffect } from 'react';

const useEndpoint = (_endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
	const [endpoint, setEndpoint] = useState("")

	var headers = new Headers();
	headers.append("Origin", document.referrer.substring(0, document.referrer.length-1));
	headers.append("Host", "server-1-k3946374.deta.app");

	const fetchData = async () => {
		//console.warn(`https://server-1-k3946374.deta.app/${endpoint}`)
		setLoading(true)
		try {
			const response = await fetch(`https://server-1-k3946374.deta.app/${endpoint}`, {method:'GET', headers})
			const json = JSON.parse(await response.json())
			//console.info(json)
			if (json?.MensajeEstado == "ok") {
				setData(json[Object.keys(json)[2]]);
			} else {
				setData([])
			}
			setError(null)
		}
		catch (error) { 
			setData([])
			setError(error)
		}
		finally { setLoading(false); }
	};

	useEffect(() => {
		if (endpoint!=_endpoint){
			setEndpoint(_endpoint)
		}else{
			if (endpoint!="")	fetchData();
		}
	
	}, [_endpoint, endpoint])
	

  

  return { data, loading, error, fetchData };
};

export default useEndpoint;