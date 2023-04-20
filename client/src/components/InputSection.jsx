import useEndpoint from "../api/useEndpoint"
import Droplist from "./Droplist"

const InputSection = ({label, valueData, textData}) => {
	const {data, loading, error, key} = useEndpoint("lineas")

	return (
		<article className="selectContainer">
			<label>{label}</label>
			<div className="divPartIcon f-jc-sb">
				<Droplist nameData="intersectionStreet" valueData="Codigo" textData="Descripcion" data={data} callback={undefined} />
				{ !loading?<span className="material-icons-outlined c-green">refresh</span>:undefined}
			</div>
		</article>
	)
}

export default InputSection