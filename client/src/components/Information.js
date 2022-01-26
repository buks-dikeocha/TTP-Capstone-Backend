import React from 'react';



const information = () => {
  return (
    <div className="Info-body">
    
       <header className="Info-header">INFORMATION</header> 
       <body>
         <h3>Covid-19 common symptom</h3>
            <ul className="a">
              <li>Fever</li>
              <li>Cough</li>
              <li>Tired</li>
              <li>Loss of Smell or Tast</li>
            </ul>          
         <h3>Test Site</h3>
         <p className="column">If you have symptom of Covid-19 or exposure to covid-19, you can choose a testing site near you to get tested.</p>
         <form action='https://coronavirus.health.ny.gov/find-test-site-near-you'>
           <button className="column1 button" type='submit'>Find Test Site</button>
         </form>
         <br />
         <br />
         <br />
         <br />
         <h3>Vaccine Site</h3>
         <p className="column">To project you and people around you from Covid-19, Please get vacinated if you could.</p>
         <form action='https://www.vaccines.gov/search/'>
         <button className="column1 button" type='submit'>Find Vaccine Site</button>
         </form>
       </body>
    
    </div> 
  )
};

export default information;
