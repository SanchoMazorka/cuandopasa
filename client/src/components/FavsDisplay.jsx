import {useState} from 'react'

const FavsDisplay = ({data, callback}) => {
	const [selected, setSelected] = useState("-1")
	const timestamp = Date.now();
	
	const queryFavorite = event => {
		setSelected(event.target.value)
		callback(event.target.value)
	}

	const recall = () => callback(selected)

	return (
		<div className="divPartIcon f-jc-sb">
			{data.length>0?
			<select className="select" name="favs" value={selected} onChange={queryFavorite}>
				<option className="d-none" value="-1">SELECCIONAR</option>
				return (
				{
					data.map((item, index) => {
						return ( <option key={`${timestamp}${index}`} value={item.stop}>{item.description}</option> )
					})
				}
			</select>
			: <span>NO HAY NINGÚN FAVORITO AÚN</span>
			}
			{selected!="-1"?<span className="material-icons-outlined c-green" onClick={recall}>search</span>:undefined}
		</div>
	)
}

export default FavsDisplay