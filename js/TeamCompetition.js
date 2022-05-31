const divContainer = document.getElementById("container");
const holdUrl = "http://localhost:8080/api/tourdefrance/hold";
const bikeurl = "http://localhost:8080/api/tourdefrance";

async function loadTeamCompetition(){
  const teamList = await fetch(holdUrl).then(response => response.json());
  const bikelist = await fetch(bikeurl).then(response => response.json());

  let lowestTeamTime = 2147483647;
  let lowestTeamName;

  for (let i = 0; i < teamList.length; i++){
    const teams = teamList[i];
    console.log("started team " + teams.holdName);

    const teamName = document.createElement("h2");
    teamName.innerText = teams.holdName;
    divContainer.appendChild(teamName);

    let totalTime = 0;
    let result = 0;
    let teamTimeArray = [];
    const teamTime = document.createElement("p");

    for (let j = 0; j < bikelist.length; j++){
      const bikers = bikelist[j];
      if(bikers.holdid === (i+1)){
        const combinedTime = (bikers.bjergtid + bikers.spurttid);
        teamTimeArray.push(combinedTime);
        teamTimeArray.sort();
      }
    }

    teamTimeArray.splice(5);
    console.log(teamTimeArray);

    for (let h = 0; h < teamTimeArray.length; h++){
      result += Math.round(teamTimeArray[h]*100)/100;
    }

    function time_convert(num){
      const hours = Math.floor(num / 60);
      const minutes = Math.round(num % 60);
      //const seconds = Math.round(minutes % 60);
      return hours + "t " + minutes + "' " /*+ seconds + '"'*/;
    }
    totalTime = result;

    if(totalTime < lowestTeamTime){
      lowestTeamTime = totalTime;
      lowestTeamName = teams.holdName;
    }

    teamTime.innerText = "totaltid = " + time_convert(totalTime);
    divContainer.appendChild(teamTime);


  }
  let lowestTotalTime = document.createElement("p");
  lowestTotalTime.innerText = "den laveste holdtid er " + time_convert(lowestTeamTime) + " cyklet af " + lowestTeamName;
  divContainer.appendChild(lowestTotalTime)
}

document.addEventListener('DOMContentLoaded', () => {
  loadTeamCompetition();
});
