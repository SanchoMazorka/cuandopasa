
import React, { useEffect, useState } from "react";

const Droplist = ({nameData, valueData, textData, data, callback}) => {
	const [selected, setSelected] = useState("-1")
	const [failed, setFailed] = useState(false)
	const timestamp = Date.now();

	useEffect(() => {
		if (!data.length) {
			setSelected("-1")
			setFailed(true)
		} else if (data.length==1) {
			setSelected(data[0][valueData])
			callback(data[0][valueData])
			setFailed(false)
		} else {
			setSelected("-1")
			setFailed(false)
		}
	}, [data])
	
	const handleChange = event => {
		console.log("SELECTED")
		setSelected(event.target.value)
		callback(event.target.value)
  }

	return (
		// <div className="divPartIcon">
			<select className="select" id={"id_" + nameData} name={nameData} value={selected} onChange={handleChange} disabled={typeof(data)=="number"||!data.length?true:false}>
				<option className="d-none" value="-1" selected={data.length!=1?true:false}>{data==-1?"ERROR, POSIBLEMENTE SIN INTERNET":"SELECCIONAR"}</option>
				{
				data!=-1 && data.map((item, index) => {
					return(
						<option key={`${timestamp}${index}`} value={item[valueData]} selected={(data.length==2&&index==1)?true:false}>
							{ item[textData].split(" - ")[0] }
						</option> )
					})
				}
			</select> 
			// { failed?<span className="material-icons-outlined">refresh</span>:<></> }
		// </div>
	)
}

export default Droplist