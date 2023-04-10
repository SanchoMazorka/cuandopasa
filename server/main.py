from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import zeep

# FASTAPI
app = FastAPI()

origins = ["http://cuandopasa.sm.com:5173",
	   			 "https://cuandopasa-eight.vercel.app"
					 "http://cuandopasa.sm.com",
					 "http://cuandopasa.sm.com:5173/",
           "cuandopasa.sm.com:5173",
           "cuandopasa.sm.com"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=-True,
    allow_methods=["OPTIONS", "GET", "POST"],
    allow_headers=["*"],
)

# ZEEP
zeep_url = "http://clswsantafe.smartmovepro.net/ModuloParadas/SWParadas.asmx?WSDL"
client = zeep.Client(zeep_url)

USER = "WEB.MUNICSTAFE"
PASS = "PAR.SW.MUNICSTAFE"

#####
@app.get("/lines")
async def get_lines():
  return client.service.RecuperarLineaPorLocalidad(USER, PASS, "SANTA FE", "SANTA FE", "ARGENTINA", False)

@app.get("/streets/{line_id}")
async def get_streets(line_id: int = 0):
	return client.service.RecuperarCallesPrincipalPorLinea(USER, PASS, line_id, False) #58 = línea 16

@app.get("/intersections/{line_id}/{street_id}")
async def get_intersections(line_id: int, street_id: int):
	return client.service.RecuperarInterseccionPorLineaYCalle(USER, PASS, line_id, street_id, False) #3216 = costanera

@app.get("/stops/{line_id}/{street_id}/{intersection_id}")
async def get_stops(line_id: int, street_id: int, intersection_id: int):
	return client.service.RecuperarParadasPorLineaCalleEInterseccion(USER, PASS, line_id, street_id, intersection_id, False, False)

@app.get("/arrivals/{stop_id}/{line_id}")
async def get_arrivals(stop_id: int, line_id: int = 0):
  return client.service.RecuperarProximosArribos(USER, PASS, stop_id, line_id, 24, "SANTA FE", False, False)
  
#####
@app.options("/lineas")
def get_headers(response: Response):
	response.headers['Access-Control-Allow-Credentials'] = "true"
	response.headers['Access-Control-Allow-Origin'] = "*"
	response.headers['Access-Control-Allow-Methods'] = "GET, POST, OPTIONS"
	response.headers['Access-Control-Allow-Headers'] = "Origin, Content-Type, X-Auth-Token, x-api-key"
	return response


@app.get("/lineas")
def get_lines_mock():
	return "{\"CodigoEstado\":0,\"MensajeEstado\":\"ok\",\"lineas\":[{\"CodigoLineaParada\":\"70\",\"Descripcion\":\"1\",\"CodigoEntidad\":\"97\",\"CodigoEmpresa\":259},{\"CodigoLineaParada\":\"53\",\"Descripcion\":\"10\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"54\",\"Descripcion\":\"11\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"55\",\"Descripcion\":\"121AB\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"56\",\"Descripcion\":\"13\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"57\",\"Descripcion\":\"14\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"71\",\"Descripcion\":\"15\",\"CodigoEntidad\":\"97\",\"CodigoEmpresa\":259},{\"CodigoLineaParada\":\"58\",\"Descripcion\":\"16\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"59\",\"Descripcion\":\"18\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"72\",\"Descripcion\":\"2\",\"CodigoEntidad\":\"97\",\"CodigoEmpresa\":259},{\"CodigoLineaParada\":\"73\",\"Descripcion\":\"20\",\"CodigoEntidad\":\"97\",\"CodigoEmpresa\":259},{\"CodigoLineaParada\":\"60\",\"Descripcion\":\"21\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"61\",\"Descripcion\":\"22\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"62\",\"Descripcion\":\"23\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"74\",\"Descripcion\":\"3\",\"CodigoEntidad\":\"97\",\"CodigoEmpresa\":259},{\"CodigoLineaParada\":\"63\",\"Descripcion\":\"4\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"64\",\"Descripcion\":\"5\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"65\",\"Descripcion\":\"8\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"75\",\"Descripcion\":\"9\",\"CodigoEntidad\":\"97\",\"CodigoEmpresa\":259},{\"CodigoLineaParada\":\"864\",\"Descripcion\":\"ALD RIC\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"828\",\"Descripcion\":\"C AZUL\",\"CodigoEntidad\":\"555\",\"CodigoEmpresa\":982},{\"CodigoLineaParada\":\"829\",\"Descripcion\":\"C NEGRA\",\"CodigoEntidad\":\"555\",\"CodigoEmpresa\":982},{\"CodigoLineaParada\":\"827\",\"Descripcion\":\"C ROJA\",\"CodigoEntidad\":\"555\",\"CodigoEmpresa\":982},{\"CodigoLineaParada\":\"370\",\"Descripcion\":\"GAB COR\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"371\",\"Descripcion\":\"GAB MAC\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"850\",\"Descripcion\":\"INTERCOUNTRIES\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":797},{\"CodigoLineaParada\":\"894\",\"Descripcion\":\"L1 VERA -LAS TOSCAS\",\"CodigoEntidad\":\"564\",\"CodigoEmpresa\":990},{\"CodigoLineaParada\":\"895\",\"Descripcion\":\"L2 VERA - FLORENCIA\",\"CodigoEntidad\":\"564\",\"CodigoEmpresa\":990},{\"CodigoLineaParada\":\"896\",\"Descripcion\":\"L20 S. FE - MINETTI\",\"CodigoEntidad\":\"564\",\"CodigoEmpresa\":990},{\"CodigoLineaParada\":\"897\",\"Descripcion\":\"L23 AVDA - ROSARIO\",\"CodigoEntidad\":\"564\",\"CodigoEmpresa\":990},{\"CodigoLineaParada\":\"898\",\"Descripcion\":\"L3 RQTA - F.OLMOS\",\"CodigoEntidad\":\"564\",\"CodigoEmpresa\":990},{\"CodigoLineaParada\":\"66\",\"Descripcion\":\"LA BOCA\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"848\",\"Descripcion\":\"LINEA RECREO\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":797},{\"CodigoLineaParada\":\"849\",\"Descripcion\":\"LINEA SEMI RAPIDO\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":797},{\"CodigoLineaParada\":\"372\",\"Descripcion\":\"MAC BARR\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"373\",\"Descripcion\":\"MAC COR\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"830\",\"Descripcion\":\"RINCON\",\"CodigoEntidad\":\"555\",\"CodigoEmpresa\":982},{\"CodigoLineaParada\":\"67\",\"Descripcion\":\"RONDA 21\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"68\",\"Descripcion\":\"RONDA B\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179},{\"CodigoLineaParada\":\"923\",\"Descripcion\":\"ROSARIO-SERODINO\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"922\",\"Descripcion\":\"SERODINO TOTORAS\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"377\",\"Descripcion\":\"SF228 ROSAE\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"374\",\"Descripcion\":\"TATA ROS GAB\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"375\",\"Descripcion\":\"TATA ROS SFE AU\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"376\",\"Descripcion\":\"TATA ROS SFE R11\",\"CodigoEntidad\":\"165\",\"CodigoEmpresa\":235},{\"CodigoLineaParada\":\"69\",\"Descripcion\":\"TREN URBANO\",\"CodigoEntidad\":\"121\",\"CodigoEmpresa\":179}]}"

@app.get("/test-arribo")
def read_test():
  return "{\"CodigoEstado\":0,\"MensajeEstado\":\"ok\",\"arribos\":[{\"DescripcionLinea\":\"16\",\"DescripcionBandera\":\"16\",\"Arribo\":\"17 min. aprox.\",\"Latitud\":\"-31.6092\",\"Longitud\":\"-60.666859\",\"LatitudParada\":\"-31.617304\",\"LongitudParada\":\"-60.674532\",\"DescripcionCortaBandera\":\"16\",\"DescripcionCartelBandera\":\"16\",\"EsAdaptado\":\"False\",\"IdentificadorCoche\":\"2593\",\"IdentificadorChofer\":\"RIOS F (3349)\",\"DesvioHorario\":\"+458:45\",\"UltimaFechaHoraGPS\":\"06/04/2023 0:24:34\",\"MensajeError\":\"\",\"CodigoLineaParada\":\"58\"}]}"

@app.get("/version")
def read_version():
  return "{\"version\": 5}"
#RecuperarLineaPorLocalidad(USER, PASS, "SANTA FE", "SANTA FE", "ARGENTINA", False)
#RecuperarCallesPrincipalPorLinea(USER, PASS, line_id, False) line_id = 58 (línea 16)
#RecuperarInterseccionPorLineaYCalle(USER, PASS, line_id, street_id, False)
#RecuperarParadasPorLineaCalleEInterseccion(USER, PASS, line_id, street_id, intersection_id, False, False)
#RecuperarProximosArribos

	# let s = {"paradas":[{
	# 	"Codigo":"10580",
	# 	"Identificador":"83277",
	# 	"Descripcion":"PARADA L 16",
	# 	"CallePrincipal":"",
	# 	"CalleInterseccion":"",
	# 	"Latitud":null,
	# 	"Longitud":null,
	# 	"Lineas":""}]}