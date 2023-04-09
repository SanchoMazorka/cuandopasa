import React from 'react'
import WidgetBusByStreets from '../components/WidgetBusByStreets'


const Main = () => {
	
	console.log("DIBUJAR MAIN")

	return (
		<>
			<header>
				<h3>SERVICIO DE ARRIBO DE COLECTIVOS</h3>
				<h4>CIUDAD DE SANTA FE</h4>
			</header>
			<main>
				<section>
					<WidgetBusByStreets ></WidgetBusByStreets>
				</section>
			</main>
		</>
	)
}

export default Main