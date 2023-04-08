from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import zeep

# FASTAPI
app = FastAPI()
origins = [
    "http://localhost:8000/*",
    "http://localhost:8000",
    "http://localhost",
    "*"
]
app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# ZEEP
zeep_url = "http://clswsantafe.smartmovepro.net/ModuloParadas/SWParadas.asmx?WSDL"
client = zeep.Client(zeep_url)


#####
@app.get("/lines")
async def get_lines():
  return client.service.RecuperarLineaPorLocalidad("WEB.MUNICSTAFE", "PAR.SW.MUNICSTAFE", "SANTA FE", "SANTA FE", "ARGENTINA", False)

@app.get("/lineas")
def get_lines_mock():
	return "{\"CodigoEstado\":0,\"MensajeEstado\":\"ok\",\"lineas\":[{\"CodigoLineaParada\":\"70\",\"Descripcion\":\"1\",\"CodigoEntidad\":\"97\",\"CodigoEmpresa\":259},{\"CodigoLineaParada\":\"53\",\"Descripcion\":\"10\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"54\",\"Descripcion\":\"11\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"55\",\"Descripcion\":\"121AB\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"56\",\"Descripcion\":\"13\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"57\",\"Descripcion\":\"14\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"71\",\"Descripcion\":\"15\",\"CodigoEntidad\":\"97\",\"CodigoEmpresa\":259},{\"CodigoLineaParada\":\"58\",\"Descripcion\":\"16\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"59\",\"Descripcion\":\"18\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"72\",\"Descripcion\":\"2\",\"CodigoEntidad\":\"97\",\"CodigoEmpresa\":259},{\"CodigoLineaParada\":\"73\",\"Descripcion\":\"20\",\"CodigoEntidad\":\"97\",\"CodigoEmpresa\":259},{\"CodigoLineaParada\":\"60\",\"Descripcion\":\"21\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"61\",\"Descripcion\":\"22\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"62\",\"Descripcion\":\"23\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"74\",\"Descripcion\":\"3\",\"CodigoEntidad\":\"97\",\"CodigoEmpresa\":259},{\"CodigoLineaParada\":\"63\",\"Descripcion\":\"4\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"64\",\"Descripcion\":\"5\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"65\",\"Descripcion\":\"8\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"75\",\"Descripcion\":\"9\",\"CodigoEntidad\":\"97\",\"CodigoEmpresa\":259},{\"CodigoLineaParada\":\"864\",\"Descripcion\":\"ALD RIC\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"828\",\"Descripcion\":\"C AZUL\",\"CodigoEntidad\":\"555\",\"CodigoEmpresa\":982},{\"CodigoLineaParada\":\"829\",\"Descripcion\":\"C NEGRA\",\"CodigoEntidad\":\"555\",\"CodigoEmpresa\":982},{\"CodigoLineaParada\":\"827\",\"Descripcion\":\"C ROJA\",\"CodigoEntidad\":\"555\",\"CodigoEmpresa\":982},{\"CodigoLineaParada\":\"370\",\"Descripcion\":\"GAB COR\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"371\",\"Descripcion\":\"GAB MAC\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"850\",\"Descripcion\":\"INTERCOUNTRIES\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":797},{\"CodigoLineaParada\":\"894\",\"Descripcion\":\"L1 VERA -LAS TOSCAS\",\"CodigoEntidad\":\"564\",\"CodigoEmpresa\":990},{\"CodigoLineaParada\":\"895\",\"Descripcion\":\"L2 VERA - FLORENCIA\",\"CodigoEntidad\":\"564\",\"CodigoEmpresa\":990},{\"CodigoLineaParada\":\"896\",\"Descripcion\":\"L20 S. FE - MINETTI\",\"CodigoEntidad\":\"564\",\"CodigoEmpresa\":990},{\"CodigoLineaParada\":\"897\",\"Descripcion\":\"L23 AVDA - ROSARIO\",\"CodigoEntidad\":\"564\",\"CodigoEmpresa\":990},{\"CodigoLineaParada\":\"898\",\"Descripcion\":\"L3 RQTA - F.OLMOS\",\"CodigoEntidad\":\"564\",\"CodigoEmpresa\":990},{\"CodigoLineaParada\":\"66\",\"Descripcion\":\"LA BOCA\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"848\",\"Descripcion\":\"LINEA RECREO\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":797},{\"CodigoLineaParada\":\"849\",\"Descripcion\":\"LINEA SEMI RAPIDO\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":797},{\"CodigoLineaParada\":\"372\",\"Descripcion\":\"MAC BARR\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"373\",\"Descripcion\":\"MAC COR\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"830\",\"Descripcion\":\"RINCON\",\"CodigoEntidad\":\"555\",\"CodigoEmpresa\":982},{\"CodigoLineaParada\":\"67\",\"Descripcion\":\"RONDA 21\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"68\",\"Descripcion\":\"RONDA B\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"923\",\"Descripcion\":\"ROSARIO-SERODINO\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"922\",\"Descripcion\":\"SERODINO TOTORAS\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"377\",\"Descripcion\":\"SF228 ROSAE\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"374\",\"Descripcion\":\"TATA ROS GAB\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"375\",\"Descripcion\":\"TATA ROS SFE AU\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"376\",\"Descripcion\":\"TATA ROS SFE R11\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"69\",\"Descripcion\":\"TREN URBANO\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179}]}"

#####
@app.get("/parada/{line_id}")
async def get_parada(line_id: int = 0):
  return "{\"CodigoEstado\":0,\"MensajeEstado\":\"ok\",\"calles\":[{\"Codigo\":\"2989\",\"Descripcion\":\"1 DE MAYO - SANTA FE\"},{\"Codigo\":\"3023\",\"Descripcion\":\"1º DE MAYO - SANTA FE\"},{\"Codigo\":\"3020\",\"Descripcion\":\"4 DE ENERO - SANTA FE\"},{\"Codigo\":\"3216\",\"Descripcion\":\"AVENIDA ALMIRANTE BROWN - SANTA FE\"},{\"Codigo\":\"3170\",\"Descripcion\":\"AVENIDA FACUNDO ZUVIRÍA - SANTA FE\"},{\"Codigo\":\"3080\",\"Descripcion\":\"AVENIDA GENERAL LÓPEZ - SANTA FE\"},{\"Codigo\":\"3199\",\"Descripcion\":\"AVENIDA GENERAL PAZ - SANTA FE\"},{\"Codigo\":\"3028\",\"Descripcion\":\"AVENIDA GOBERNADOR FREYRE - SANTA FE\"},{\"Codigo\":\"3314\",\"Descripcion\":\"AVENIDA JOSÉ GORRITI - SANTA FE\"},{\"Codigo\":\"3134\",\"Descripcion\":\"AVENIDA SALVADOR CAPUTTO - SANTA FE\"},{\"Codigo\":\"3287\",\"Descripcion\":\"AYACUCHO - SANTA FE\"},{\"Codigo\":\"3155\",\"Descripcion\":\"BOULEVARD GALVEZ - SANTA FE\"},{\"Codigo\":\"3158\",\"Descripcion\":\"BOULEVARD PELLEGRINI - SANTA FE\"},{\"Codigo\":\"38147\",\"Descripcion\":\"BV GALVEZ - SANTA FE\"},{\"Codigo\":\"3211\",\"Descripcion\":\"CALCENA - SANTA FE\"},{\"Codigo\":\"3175\",\"Descripcion\":\"CHACABUCO - SANTA FE\"},{\"Codigo\":\"2995\",\"Descripcion\":\"DOCTOR ZAVALLA - SANTA FE\"},{\"Codigo\":\"3061\",\"Descripcion\":\"FRANCIA - SANTA FE\"},{\"Codigo\":\"3177\",\"Descripcion\":\"GRAND BOURG - SANTA FE\"},{\"Codigo\":\"3140\",\"Descripcion\":\"ITUZAINGÓ - SANTA FE\"},{\"Codigo\":\"3280\",\"Descripcion\":\"JAVIER DE LA ROSA - SANTA FE\"},{\"Codigo\":\"3163\",\"Descripcion\":\"LAPRIDA - SANTA FE\"},{\"Codigo\":\"3206\",\"Descripcion\":\"LUCIANO TORRENT - SANTA FE\"},{\"Codigo\":\"3104\",\"Descripcion\":\"MENDOZA - SANTA FE\"},{\"Codigo\":\"3089\",\"Descripcion\":\"MORENO - SANTA FE\"},{\"Codigo\":\"3276\",\"Descripcion\":\"PADRE GENESIO - SANTA FE\"},{\"Codigo\":\"3109\",\"Descripcion\":\"PRIMERA JUNTA - SANTA FE\"},{\"Codigo\":\"3283\",\"Descripcion\":\"REGIMIENTO 12 DE INFANTERIA - SANTA FE\"},{\"Codigo\":\"3108\",\"Descripcion\":\"RIVADAVIA - SANTA FE\"},{\"Codigo\":\"2994\",\"Descripcion\":\"SAAVEDRA - SANTA FE\"},{\"Codigo\":\"3226\",\"Descripcion\":\"SALVADOR DEL CARRIL - SANTA FE\"},{\"Codigo\":\"3058\",\"Descripcion\":\"SAN JERÓNIMO - SANTA FE\"},{\"Codigo\":\"3062\",\"Descripcion\":\"SAN LORENZO - SANTA FE\"},{\"Codigo\":\"3148\",\"Descripcion\":\"SANTIAGO DEL ESTERO - SANTA FE\"},{\"Codigo\":\"3081\",\"Descripcion\":\"URQUIZA - SANTA FE\"},{\"Codigo\":\"3152\",\"Descripcion\":\"VÉLEZ SÁRSFIELD - SANTA FE\"},{\"Codigo\":\"3267\",\"Descripcion\":\"VIEYTES - SANTA FE\"}]}"
  #return client.service.RecuperarCallesPrincipalPorLinea("WEB.MUNICSTAFE", "PAR.SW.MUNICSTAFE", line_id, False) #58 = línea 16

#####
@app.get("/intersection/{line_id}")
async def get_intersection(line_id: int = 0):
	#print("intersection" + line_id)
	return client.service.RecuperarInterseccionPorLineaYCalle("WEB.MUNICSTAFE", "PAR.SW.MUNICSTAFE", 58, 3216, False)

@app.get("/linea/16")
def read_line():
  response = client.service.RecuperarProximosArribos("WEB.MUNICSTAFE", "PAR.SW.MUNICSTAFE", "59067", 58, 24, "SANTA FE", False, False)
  return response

@app.get("/test-arribo")
def read_test():
  return "{\"CodigoEstado\":0,\"MensajeEstado\":\"ok\",\"arribos\":[{\"DescripcionLinea\":\"16\",\"DescripcionBandera\":\"16\",\"Arribo\":\"54 min. aprox.\",\"Latitud\":\"-31.6092\",\"Longitud\":\"-60.666859\",\"LatitudParada\":\"-31.617304\",\"LongitudParada\":\"-60.674532\",\"DescripcionCortaBandera\":\"16\",\"DescripcionCartelBandera\":\"16\",\"EsAdaptado\":\"False\",\"IdentificadorCoche\":\"2593\",\"IdentificadorChofer\":\"RIOS F (3349)\",\"DesvioHorario\":\"+458:45\",\"UltimaFechaHoraGPS\":\"06/04/2023 0:24:34\",\"MensajeError\":\"\",\"CodigoLineaParada\":\"58\"}]}"

	

@app.get("/arrivals/{stop_id}/{line_id}")
async def get_arrivals(stop_id: str, line_id: int = 0):
	response = client.service.RecuperarProximosArribos("WEB.MUNICSTAFE", "PAR.SW.MUNICSTAFE", stop_id, line_id, 24, "SANTA FE", False, False)
	return response
     




#RecuperarLineaPorLocalidad("WEB.MUNICSTAFE", "PAR.SW.MUNICSTAFE", "SANTA FE", "SANTA FE", "ARGENTINA", False)
#RecuperarInterseccionPorLineaYCalle("WEB.MUNICSTAFE", "PAR.SW.MUNICSTAFE", 58, CALLE, False)
#RecuperarParadasPorLineaCalleEInterseccion("WEB.MUNICSTAFE", "PAR.SW.MUNICSTAFE", 58, CALLE, INTERSECCION, False, False)
#return "{\"CodigoEstado\":0,\"MensajeEstado\":\"ok\",\"calles\":[{\"Codigo\":\"2989\",\"Descripcion\":\"1 DE MAYO - SANTA FE\"},{\"Codigo\":\"3023\",\"Descripcion\":\"1º DE MAYO - SANTA FE\"},{\"Codigo\":\"3020\",\"Descripcion\":\"4 DE ENERO - SANTA FE\"},{\"Codigo\":\"3216\",\"Descripcion\":\"AVENIDA ALMIRANTE BROWN - SANTA FE\"},{\"Codigo\":\"3170\",\"Descripcion\":\"AVENIDA FACUNDO ZUVIRÍA - SANTA FE\"},{\"Codigo\":\"3080\",\"Descripcion\":\"AVENIDA GENERAL LÓPEZ - SANTA FE\"},{\"Codigo\":\"3199\",\"Descripcion\":\"AVENIDA GENERAL PAZ - SANTA FE\"},{\"Codigo\":\"3028\",\"Descripcion\":\"AVENIDA GOBERNADOR FREYRE - SANTA FE\"},{\"Codigo\":\"3314\",\"Descripcion\":\"AVENIDA JOSÉ GORRITI - SANTA FE\"},{\"Codigo\":\"3134\",\"Descripcion\":\"AVENIDA SALVADOR CAPUTTO - SANTA FE\"},{\"Codigo\":\"3287\",\"Descripcion\":\"AYACUCHO - SANTA FE\"},{\"Codigo\":\"3155\",\"Descripcion\":\"BOULEVARD GALVEZ - SANTA FE\"},{\"Codigo\":\"3158\",\"Descripcion\":\"BOULEVARD PELLEGRINI - SANTA FE\"},{\"Codigo\":\"38147\",\"Descripcion\":\"BV GALVEZ - SANTA FE\"},{\"Codigo\":\"3211\",\"Descripcion\":\"CALCENA - SANTA FE\"},{\"Codigo\":\"3175\",\"Descripcion\":\"CHACABUCO - SANTA FE\"},{\"Codigo\":\"2995\",\"Descripcion\":\"DOCTOR ZAVALLA - SANTA FE\"},{\"Codigo\":\"3061\",\"Descripcion\":\"FRANCIA - SANTA FE\"},{\"Codigo\":\"3177\",\"Descripcion\":\"GRAND BOURG - SANTA FE\"},{\"Codigo\":\"3140\",\"Descripcion\":\"ITUZAINGÓ - SANTA FE\"},{\"Codigo\":\"3280\",\"Descripcion\":\"JAVIER DE LA ROSA - SANTA FE\"},{\"Codigo\":\"3163\",\"Descripcion\":\"LAPRIDA - SANTA FE\"},{\"Codigo\":\"3206\",\"Descripcion\":\"LUCIANO TORRENT - SANTA FE\"},{\"Codigo\":\"3104\",\"Descripcion\":\"MENDOZA - SANTA FE\"},{\"Codigo\":\"3089\",\"Descripcion\":\"MORENO - SANTA FE\"},{\"Codigo\":\"3276\",\"Descripcion\":\"PADRE GENESIO - SANTA FE\"},{\"Codigo\":\"3109\",\"Descripcion\":\"PRIMERA JUNTA - SANTA FE\"},{\"Codigo\":\"3283\",\"Descripcion\":\"REGIMIENTO 12 DE INFANTERIA - SANTA FE\"},{\"Codigo\":\"3108\",\"Descripcion\":\"RIVADAVIA - SANTA FE\"},{\"Codigo\":\"2994\",\"Descripcion\":\"SAAVEDRA - SANTA FE\"},{\"Codigo\":\"3226\",\"Descripcion\":\"SALVADOR DEL CARRIL - SANTA FE\"},{\"Codigo\":\"3058\",\"Descripcion\":\"SAN JERÓNIMO - SANTA FE\"},{\"Codigo\":\"3062\",\"Descripcion\":\"SAN LORENZO - SANTA FE\"},{\"Codigo\":\"3148\",\"Descripcion\":\"SANTIAGO DEL ESTERO - SANTA FE\"},{\"Codigo\":\"3081\",\"Descripcion\":\"URQUIZA - SANTA FE\"},{\"Codigo\":\"3152\",\"Descripcion\":\"VÉLEZ SÁRSFIELD - SANTA FE\"},{\"Codigo\":\"3267\",\"Descripcion\":\"VIEYTES - SANTA FE\"}]}"