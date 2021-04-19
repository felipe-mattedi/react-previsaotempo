
import './App.css';
import Previsaocard from './Previsaocard';
import Pesquisa from './Pesquisa';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';

function Principal() {

  const [cidade, setcidade] = useState('Vitoria')
  const [valida, setvalida] = useState(true)
  const [texto, settexto] = useState('')
  const [latitude, setlatitude] = useState('0')
  const [longitude, setlongitude] = useState('0')
  const [minima_hoje, minimahoje] = useState('')
  const [maxima_hoje, maximahoje] = useState('')
  const [minima_amanha, minimaamanha] = useState('')
  const [maxima_amanha, maximaamanha] = useState('')
  const [poluicao, setpoluicao] = useState('')
  const [icone_hoje, iconehoje] = useState('')
  const [icone_amanha, iconeamanha] = useState('')
  const [descr_hoje, descrhoje] = useState('')
  const [descr_amanha, descramanha] = useState('')

  var hoje = new Date();
  var dd = String(hoje.getDate()).padStart(2, '0');
  var mm = parseInt(String(hoje.getMonth())) + 1
  var data_hoje = dd + '/' + mm
  var data_amanha = (parseInt(dd)+1) + '/' + mm

  const defineTexto = (elemento) => {
    settexto(elemento.target.value)
  }

  const defineCidade = () => {
    if(texto == '') {
    setvalida(false)
    }
    else{
    setcidade(texto)  
    settexto('')
    setvalida(true)
    }
  }


  async function verifica_cidade(){
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=71a9eaaa947591a63d6ece1b39418efa&exclude=current,minutely,hourly&units=metric`)
    .then(response => response.json())
    .then(data => {
      setlatitude(data.coord.lat)
      setlongitude(data.coord.lon)
      })
  }

  async function verifica_temperatura(){
    await fetch(`https://api.openweathermap.org/data/2.5/onecall?appid=71a9eaaa947591a63d6ece1b39418efa&lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&lang=pt_br&units=metric`)
    .then(response => response.json())
    .then(data => {
      let hoje = data.daily[0]
      let amanha = data.daily[1]
      minimahoje(Math.round(hoje.temp.min))
      maximahoje(Math.round(hoje.temp.max))
      minimaamanha(Math.round(amanha.temp.min))
      maximaamanha(Math.round(amanha.temp.max))
      descrhoje(hoje.weather[0].description)
      descramanha(amanha.weather[0].description)
      iconehoje(resgatafigura(hoje.weather[0].icon))
      iconeamanha(resgatafigura(amanha.weather[0].icon))
  })
}

  async function verifica_poluicao(){
    await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?appid=71a9eaaa947591a63d6ece1b39418efa&lat=${latitude}&lon=${longitude}&lang=pt_br`)
    .then(response => response.json())
    .then(data => {
    setpoluicao(data.list[0].main.aqi)
  })}

  function resgatafigura(tipo){
    switch (tipo.substring(0,2)){
      case '11':
        return 'tempestade'
      case '09':
        return  'chuva'
      case '10':
        return  'chuva'
      case '13':
        return 'neve'
      case '50':
        return 'vento'
      case '02':
        return 'nublado'
      case '03':
        return 'nublado'
      case '04':
        return 'nublado'
      default:
        return 'sol'
    }
  }



  useEffect( async () => {
    
      await verifica_cidade()
      await verifica_temperatura()
      await verifica_poluicao()

    }
    ,[cidade,latitude,longitude])

    

  return (
    <div className="Principal">
      {!valida &&
      <Alert variant="danger" onClose={() => setvalida(true)} dismissible>
        <Alert.Heading>Digite uma cidade!</Alert.Heading>
      </Alert>}
      <Container>
        <Row className='formulario'>
              <Form.Control onChange={defineTexto} value={texto} type="text" placeholder="Digite aqui o nome da cidade ..." />
            <Button onClick={defineCidade} variant="primary" type="submit">
              Buscar!
         </Button>
        </Row>
      </Container>
      <h3>Previsão para a cidade de {cidade}</h3>
      {poluicao >= 3 && 
      <Alert className='alerta' variant="danger">
      <Alert.Heading>Alerta Poluição!</Alert.Heading>
      <p>
       Atenção: Esta localidade está com nível de poluição {poluicao}.
      </p>
      </Alert>}
      <Container>
      <Row className='caixas'>
      <Previsaocard data={data_hoje} maxima={maxima_hoje} minima={minima_hoje} figura={icone_hoje} descr={descr_hoje}/>
      <Previsaocard className='caixatemperaturas'  data={data_amanha} maxima={maxima_amanha} minima={minima_amanha} figura={icone_amanha} descr={descr_amanha}/>
      </Row>
      <Pesquisa />
      </Container>
    </div>
  );
}

export default Principal;
