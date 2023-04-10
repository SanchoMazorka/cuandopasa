
import React from "react";

const Droplist = ({nameData, hint, valueData, textData, data, callback}) => {

	console.log("Droplist: " + nameData)
	
	const handleChange = event => {
		callback(event.target.value)
  }
	
	return (
		<select className="select" name={nameData} id={"id_" + nameData} onChange={handleChange}>
		<option className="d-none" selected>{hint}</option>
		{
			data.map( (item, index) => {
				return ( 
					<option key={index} value={item[valueData]}>{ item[textData].split(" - ")[0] }</option> )
			})
		}
	</select> 
	)
}

export default Droplist