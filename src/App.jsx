import {useState, useLayoutEffect} from "react";
import './App.css'
import LocationMap from './LocationMap.jsx';

const apiKey = 'at_p0Bs3hlM5wVoBC5hIgO18K1rxQbTb'; 
const url = 'https://geo.ipify.org/api/v2/country,city?'; 

function App() {
  const [searchIp, setSearchIp] = useState("");

  useLayoutEffect(getInfoIp, []);

  function getInfoIp(domain = '', isIP = false){ 
    const requestUrl= isIP ? `${url}apiKey=${apiKey}&ipAddress=${domain}` : domain ? `${url}apiKey=${apiKey}&domain=${domain}` : `${url}apiKey=${apiKey}`;
    fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = {
          ip: data.ip,
          isp: data.isp,
          timezone: `UTC ${data.location.timezone}`,
          location: `${data.location.country} ${data.location.region}`,
          lat: data.location.lat,
          lng: data.location.lng,
          loading: false, 
        }
        setSearchIp(formattedData);
      })
  }
  function onSubmit (e) {
    e.preventDefault();
    setSearchIp(previousState => {
      return{...previousState, loading:true};
    });
    const isIp =  e.target[0].value.includes('.') &&  /\d/.test(e.target[0].value)
    getInfoIp(e.target[0].value, isIp);
  }

  return (
    <>
      <div>
        <section className='bg-image'>
        </section>
        <section className='main-content'>
          <h1>IP Address Tracker</h1>
          <form onSubmit={onSubmit}>
            <input type='text' placeholder='Search for any IP address or domain' />
            <button type='submit'>
              <span></span>
            </button>
          </form>
          <ul className="info-banner">
            <li className="info-banner_item">         
              <span className="item_title">Ip Address</span>
              <span className="item_info">{searchIp.ip}</span>
            </li>
            <li className="info-banner_item">         
              <span className="item_title">Location</span>
              <span className="item_info">{searchIp.location}</span>
            </li>
            <li className="info-banner_item">         
              <span className="item_title">Timezone</span>
              <span className="item_info">{searchIp.timezone}</span>
            </li>
            <li className="info-banner_item">         
              <span className="item_title">ISP</span>
              <span className="item_info" >{searchIp.isp}</span>
            </li>
          </ul>
        </section>
      </div>
      {(searchIp.lat && !searchIp.loading ) ? <LocationMap lat={searchIp.lat} lng={searchIp.lng} /> : <div>loading</div>}
    </>
  )
}

export default App
