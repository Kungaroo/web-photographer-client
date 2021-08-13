import React, { useState } from 'react';
import axios from 'axios';
import './Content.css'
import Loader from '../Loader/Loader';

const Content = (props) => {

  const { height, width } = props;

  const [ name, setName ] = useState("");
  const [ buttonPressed, setButtonPressed ] = useState(false);
  // const [ test, setTest ] = useState(0)
  //const [ show, setShow] = useState(false);
  
  window.addEventListener('beforeunload', (event) => {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = '';
    
    axios.post("https://web-photographer.herokuapp.com/delete", {oldHash: name});
  });

  const handleInput = () => {
    setButtonPressed(true);
    const data = document.getElementById("link").value;
    document.getElementById("link").value = "";
    axios.post("https://web-photographer.herokuapp.com/image", { 
      link: data,
      oldHash: name,
      height: height,
      width: width
      //waitTime: document.getElementById("waitTime").value
    }, {headers: {"Access-Control-Allow-Origin": "*"}})
    .then(response => {
      setName(response.data);
      setButtonPressed(false);
    });
  }
  
  const imageDisplay = () => {
    if(name === "" && !buttonPressed){
      return (<h1 className="text">Enter a link to photograph it</h1>);
    }
    else if(buttonPressed){
      return (<div id='content'><Loader /></div>);
    }
  
    return(<img crossOrigin="true" src={`https://web-photographer.herokuapp.com/${name}.png`} alt="Photograph of the website you entered" />);
  }
  
  // const imageDisplayTest = () => {
  //   if(test === 0){
  //     return (<h1 className="text">Enter a link to photograph it</h1>);
  //   }
  //   else if(test === 1){
  //     return(<img src={`https://web-photographer.herokuapp.com/${name}.png`} alt="Photograph of the website you entered" />);
  //   }
  //   else{
  //     return (<div id='content'><Loader /></div>);
  //   }
  // }
  
  

  return(
    <div className="input">
      {imageDisplay()}
    
    
      <input id="link"/>
      <button onClick={handleInput}>Search</button>
      
      
      {/* for image, loader and text testing */}
      {/* <div className="testing">
        <button onClick={() => setTest(1)}>Change to picture</button>
        <button onClick={() => setTest(0)}>Change to text</button>
        <button onClick={() => setTest(2)}>Change to loader</button>
      </div> */}

      {/* custome time to wait for the webpage to load  */}
      {/* <button onClick={()=>setShow(!show)}>{show ? 'Hide settings' : 'Show settings'}</button>

      {show && (
      <div>
        <h3>Set a timer to wait for the page to load (in seconds).</h3>
        <input id="waitTime" value='1' />
      </div>
      )} */}

    </div>
  )
}

export default Content;