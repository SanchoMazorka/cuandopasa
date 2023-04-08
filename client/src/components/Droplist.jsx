
import React from "react";

export default function Droplist({nameData, valueData, textData, data, callback, title})  {

	console.log("DROPLIST: " + nameData)
	
	const handleChange = event => {
		callback(event.target.value)
  }
	
	return (
		<select name={nameData} id={"id_" + nameData} onChange={handleChange}>
		<option className="d-none" selected>SELECCIONAR LÍNEAS</option>
		{
			data.map( (item, index) => {
				return ( <option key={index} value={item[valueData]}>{str(item[textData]).split(" - ")[0]}</option> )
			})
		}
	</select> 
	)
}


