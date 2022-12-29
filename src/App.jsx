import {useState, useLayoutEffect, useRef} from "react";
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
        //infoIp.current = formattedData;
        setSearchIp(formattedData);
      })
  }
  function onSubmit (e) {
    console.log(e.target[0].value);
    e.preventDefault();
    setSearchIp(previousState => {
      return{...previousState, loading:true};
    });
    getInfoIp(e.target[0].value);
  }

  return (
    <>
      <main>
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
          <dl>
            <dt>Ip Address</dt>
            <dd>{searchIp.ip}</dd>
            <dt>Location</dt>
            <dd>{searchIp.location}</dd>
            <dt>Timezone</dt>
            <dd>{searchIp.timezone}</dd>
            <dt>ISP</dt>
            <dd>{searchIp.isp}</dd>
          </dl>
        </section>
      </main>
      {(searchIp.lat && !searchIp.loading ) ? <LocationMap lat={searchIp.lat} lng={searchIp.lng} /> : <div>loading</div>}
    </>
  )
}

export default App
