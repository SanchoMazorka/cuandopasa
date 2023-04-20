import { useState, useEffect } from 'react';

const useEndpoint = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

	var headers = new Headers();
	headers.append("Origin", document.referrer.substring(0, document.referrer.length-1));
	headers.append("Host", "server-1-k3946374.deta.app");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://server-1-k3946374.deta.app/${endpoint}`, {method:'GET', headers});
        const json = await response.json();
				if (json?.MensajeEstado == "ok") {
					setData(json);
				} else {
					setData([])
				}
      }
			catch (error) { 
				setData([])
				setError(error)
			}
			finally { setLoading(false); }
    };
    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useEndpoint;