import { useEndpoint } from "./useEndpoint"

export const Cuandopasa = {
	lines:"CodigoLineaParada",
	streets: "Codigo",
	intersections: "Codigo",
	stops: "Identificador"
}
/* 	lines: () => {
		console.log(t)
		let response = useEndpoint(`lineas`, )
		response = {...response, "key": "lineas"}
		return response

	},
	streets: (line_id) => {
		let response = useEndpoint(`streets/${line_id}`)
		response = {...response, "key": "calles"}
		return  response
		
	},
	intersections: (street_id) => {
		let response = useEndpoint(`intersections/${LineID}/${street_id}`)
		response = {...response, "key": "calles"}
		return response
		
	},
	stops: (intersection_id) => {
		let response = useEndpoint(`stops/${LineID}/${StreetID}/${intersection_id}`)
		response = {...response, "key": "paradas"}
		return response
		
	},
	arrivals: (stop_id, line_id = 0) => {
		let response = useEndpoint(`arrivals/${stop_id}/${line_id}`)
		response = {...response, "key": "arribos"}
		return response
		
	} */
