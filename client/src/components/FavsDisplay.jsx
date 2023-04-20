const FavsDisplay = ({data, callback}) => {

	const timestamp = Date.now();
  
	const queryFavorite = event => {
		callback(event.target.value)
	}

	return (
		<div className="divSelectIcon">
			{data.length>0?
			<>
				<select className="select" name="favs" id={"id_favs"} onChange={queryFavorite}>
					<option className="d-none" selected>SELECCIONAR</option>
					return (
					{
						data.map((item, index) => {
							// return ( <option key={`${timestamp}${index}`} value={`${item.stop}-${item.line}`}>LÍNEA {item.description}</option> )
							return ( <option key={`${timestamp}${index}`} value={item.stop}>LÍNEA {item.description}</option> )
						})
					}
				</select>
				<span className="material-icons-outlined">search</span>
			</>
			: <span>NO HAY NINGÚN FAVORITO AÚN</span>
			}
		</div>
	)
}

export default FavsDisplay