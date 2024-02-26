import { useEffect, useState } from 'react';
import './App.css';
import DisplayChart from './components/DisplayChart';
// import data from './Assets/requests-sample.json';
import axios from 'axios';


function App() {
  const [options,setOptions] = useState([])
  const [series, setSeries] = useState([]);
  const [dept, setDept] = useState([]);

  useEffect(()=>{
    document.title = 'Vesta Assignment'
    let hotelDetails={}
    let hotelname=[]
    let hotelReq=[]
    let deptlist =[]
    axios.get("https://checkinn.co/api/v1/int/requests").then(res=>{
      const data = res.data;
      data.requests.forEach((request)=>{
        if(hotelDetails[request.hotel.id]){
          hotelDetails[request.hotel.id].req+=1;
        }
        else{
          hotelDetails[request.hotel.id]={name:request.hotel.name,req:1};
        }
        if(!deptlist.includes(request.desk.name)){
          deptlist.push(request.desk.name)
        }
    })
      Object.keys(hotelDetails).forEach((hotel)=>{
        hotelname.push(hotelDetails[hotel].name);
        hotelReq.push(hotelDetails[hotel].req);
      })
      setOptions(hotelname);
      setSeries(hotelReq);
      setDept(deptlist);
    }).catch(e=>{
      console.log(e);
    })
        
  },[])
  return (
    <div className='app'>
      <div className="chartContainer">
        <DisplayChart category={options} series={series} />
      </div>
      <div className="detailsContainer">
        <h4 className="reqHeading">Total Requests: {series.reduce((a, b) => a + b, 0)}</h4>
        <p>List of <span>unique</span> department names across all Hotels: {dept.join(", ")}</p>
      </div>
    </div>  
  );
}

export default App;
