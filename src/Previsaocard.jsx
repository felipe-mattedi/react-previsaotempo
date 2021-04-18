
import './App.css';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

function Previsaocard(props) {

  
  return (
    <div className="App">
      <Card border="dark" style={{ width: '18rem' }}>
        <Card.Header>{props.data}</Card.Header>
        <Card.Body>
          <Card.Title>{props.descr}</Card.Title>
          <Image src={`https://aws-fzm-tst-lc.s3.amazonaws.com/figuras/${props.figura}.PNG`} roundedCircle />
          <div className='temperaturas'>
            <div className='maxima'>
            <FontAwesomeIcon icon={faAngleUp} size="2x" />
            <h4>{props.maxima} ºC</h4>
            </div>
            <div className='minima'>
            <FontAwesomeIcon icon={faAngleDown} size="2x" />
            <h4>{props.minima} ºC</h4>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Previsaocard;
