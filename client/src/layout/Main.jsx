import React from 'react'
import WidgetBusByStreets from '../components/WidgetBusByStreets'


const Main = () => {
	return (
		<>
			<header>
				<h3>CUÁNDO PASA?</h3>
				<h4>CIUDAD DE SANTA FE</h4>
			</header>
			<main>
				<section>
					<WidgetBusByStreets />
				</section>
			</main>
		</>
	)
}

export default Main