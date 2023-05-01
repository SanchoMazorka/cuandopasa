import { useEffect, useState } from "react"
import useEndpoint from "../api/useEndpoint"
import Droplist from "./Droplist"

const InputSection = ({label, endpoint, CK, callback, refHook, reset}) => {
	const {data, loading, error, fetchData} = useEndpoint(endpoint)
	
	return (
		<article className="selectContainer">
			<label>{label}</label>
			<div className="divPartIcon f-jc-sb">
				{
					loading
					?<span>ACTUALIZANDO DATOS</span>
					:<Droplist data={data} CK={CK} callback={callback} refHook={refHook} reset={reset} />
				}
				{
					error!=null
					?<span className="material-icons-outlined c-green" onClick={()=>{ reset(); fetchData();}}>refresh</span>
					:undefined
				}
			</div>
		</article>
	)
}

export default InputSection