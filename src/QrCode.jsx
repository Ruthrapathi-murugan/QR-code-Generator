  import { useState } from "react"
  import './QrCode.css';

  export const QrCode = () => {
    const [img,setImg]=useState("")
    const[loading,setloading]=useState(false)
    const[qrdata,setqrdata]=useState("https://www.google.com/")
    const[qrsize,setqrsize]=useState("150")

    async function generateQR(){
  setloading(true);
  try{
    const url= `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`
    setImg(url);
  }catch(error){
  console.error("error generating qr code",error)
  }
  finally{
    setloading(false)
  }


    }
    function downloadQR(){
      fetch(img)
      .then((response)=>response.blob())
      .then((blob)=>{
      const link= document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      })
      .catch((error)=>{
        console.error("error download qr code", error)
      })
    }
    return ( 
    <div className="app-container">
      <h1>QR -CODE GENERATOR</h1>
      {loading&&<p>Page loading please wait...</p>}
    {img&& <img src={img} className="qr-code-image"/>}
      <div>
        <label htmlFor="datainput" className="input-label">
          Data for Qr code
          </label> 
          <input type="text"  value={qrdata} id="datainput" placeholder="enter the data for Qr code file" disabled={loading}  onChange={(e)=>setqrdata(e.target.value)}/>
    
      <label htmlFor="size-input"  className="input-label"
      >
      image size (E.g.,150):
          </label> 
          <input type="text" id="sizeinput" value={qrsize} placeholder="enter the size " onChange={(e)=>setqrsize(e.target.value)}/>
          <button className="generate-button" onClick={generateQR}> Generate Qr code </button>
          <button className="download-button" onClick={downloadQR}>Download Qr code</button>
      </div><p className="footer">Designed by <a href="https://ruthrapathi-info.netlify.app">Ruthrapathi-Murugan</a></p>
    </div>
    )
  }
