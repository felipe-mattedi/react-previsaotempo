import './App.css';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as StarR} from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react';
import { AWS } from 'aws-sdk';




function Pesquisa() {

  const [star1, setstar1] = useState(false)
  const [star2, setstar2] = useState(false)
  const [star3, setstar3] = useState(false)
  const [star4, setstar4] = useState(false)
  const [star5, setstar5] = useState(false)

  var AWS = require('aws-sdk');
  AWS.config.update({region: 'us-east-1'});
  var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

  var params = {
   MessageBody: "Teste Felipe",
   QueueUrl: "https://sqs.us-east-1.amazonaws.com/151394965767/pesquisa_site_1"
  };

 sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
  });

  const solidstar =  (evento) => {
    if(evento.target.id == 1){
      setstar1(true)
    }
    else if(evento.target.id == 2){
      setstar1(true)
      setstar2(true)
    }
    else if(evento.target.id == 3){
      setstar1(true)
      setstar2(true)
      setstar3(true)
    }
    else if(evento.target.id == 4){
      setstar1(true)
      setstar2(true)
      setstar3(true)
      setstar4(true)
    }
    else if(evento.target.id == 5){
      setstar1(true)
      setstar2(true)
      setstar3(true)
      setstar4(true)
      setstar5(true)
    }
  }

  const star =  () => {

      setstar1(false)
      setstar2(false)
      setstar3(false)
      setstar4(false)
      setstar5(false)
    
  }

  
  return (
    <div className="Pesquisa">
    <Card>
    <Card.Body>Você gostou desta página?!</Card.Body>
    <div className='estrelas'>
    <FontAwesomeIcon id='1' onMouseEnter={solidstar} onMouseLeave={star} icon={star1 ? faStar: StarR}  size='2x' />
    <FontAwesomeIcon id='2'  onMouseEnter={solidstar} onMouseLeave={star} icon={star2 ? faStar: StarR} size='2x' />
    <FontAwesomeIcon id='3'  onMouseEnter={solidstar} onMouseLeave={star} icon={star3 ? faStar: StarR} size='2x' />  
    <FontAwesomeIcon id='4'  onMouseEnter={solidstar} onMouseLeave={star} icon={star4 ? faStar: StarR} size='2x' />
    <FontAwesomeIcon id='5'  onMouseEnter={solidstar} onMouseLeave={star} icon={star5 ? faStar: StarR} size='2x'/>
    </div>
    <div className='descricao'>
    <p>Odiei!</p>
    <p>Tanto Faz</p>
    <p>Amei!</p>
    </div>
    </Card>
    </div>
  );
}

export default Pesquisa;
