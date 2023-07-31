
export default function Distance({ leg }) {
  if (!leg.distance || !leg.duration) return null;

 
  return (
    <div>
    <br/>
      <p>
      Distance : {" "}
     <span className="highlight">{leg.distance.text}</span> 
       <br/>
       Time : {" "}
        <span className="highlight">{leg.duration.text}</span> walking
      </p>

    </div>
  );
}
