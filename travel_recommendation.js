const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', searchCondition);

const btnReset = document.getElementById('btnReset');
btnReset.addEventListener('click', clearCondition);

console.log("I am outside!");  
var keyword=null;  

function searchCondition() {
    console.log("I am inside!");    
    const input = document.getElementById('searchBar').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        if(input === "beaches" || input ==="beach"){
            keyword="beaches";
            data=data[keyword];
        }
        else if (input === "temples" || input ==="temple"){
            keyword="temples";
            data=data[keyword];
        }
        else if (input === "countries" || input ==="country")          
        {
            keyword="countries";
            randomCountry=getRandomInt(0, data[keyword].length-1);
            //console.log(JSON.stringify(data[keyword][randomCountry]));
            data=data[keyword][randomCountry]["cities"];
            
        }
        else{
            keyword=null;
            resultDiv.innerHTML="Search did not find any results."
        }
        
        if(keyword)
        {
            resultDiv.innerHTML="";
            for(i=0; i<  data.length; i++)
            {
                resultDiv.innerHTML+=`<div class="myright">`;
                resultDiv.innerHTML+=`<img src=${data[i].imageUrl} class="myimages"></img>`;
                resultDiv.innerHTML+=`<div class="info2">${data[i].name} </div>`;
                resultDiv.innerHTML+=`<div class="info">${data[i].description} </div>`;
                resultDiv.innerHTML+=`<button id="visitButton" class="mybuttons">VISIT</button>`;
                resultDiv.innerHTML+=`</div">`;
            }
          
        }
    
        })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
  }

function getRandomInt(min, max) {
    rndnum=Math.floor(Math.random() * (1+max - min) + min);
    //console.log(rndnum);
    return rndnum;
       
}

function clearCondition() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML="";
}