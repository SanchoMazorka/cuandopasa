import React, { useEffect, useState } from "react";

const Droplist = ({data, CK, callback, refHook, reset}) => {
	const [selected, setSelected] = useState("-1")
	const timestamp = Date.now();

	const handleChange = event => {
		reset()
		setSelected(event.target.value)
		callback(event.target.value)
  }
	
	useEffect(() => {
		if (data.length==1)
			handleChange({ target: { value: data[0][CK.value] } })
	}, [data])
	
	return (
		<select ref={refHook} className="select" id={`id_${timestamp}`} value={selected} onChange={handleChange} disabled={typeof(data)=="number"||!data.length?true:false}>
			<option className="d-none" value="-1">{data==-1?"ERROR, POSIBLEMENTE SIN INTERNET":"SELECCIONAR"}</option>
			{data.length>0 && data.map((item, index) => {
				return(
					<option key={`${timestamp}${index}`} value={item[CK.value]} > {/* defaultValue={(data.length==2&&index==1)} */}
						{ item["Descripcion"].split(" - ")[0] }
					</option> )
				})
			}
		</select> 
		// { failed?<span className="material-icons-outlined">refresh</span>:<></> }
	)
}

export default Droplist