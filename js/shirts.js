const divContainer = document.getElementById("container");
const url = 'http://localhost:8080/api/tourdefrance';

async function loadShirts() {
  const shirtList = await fetch(url).then(response => response.json());
  const shirtlistLength = shirtList.length;
  let shirts;

  function time_convert(num){
    const hours = Math.floor(num / 60);
    const minutes = Math.round(num % 60);
    //const seconds = Math.round(minutes % 60);
    return hours + "t " + minutes + "' " /*+ seconds + '"'*/;
  }

  //HURTIGESTE DETALJER (GULD TRØJE)

  function overallTimes() {
    let lowestOverallTid = 2147483647;
    let lowestOverallNavn;
    let showOverallTid;

    const overallTitle = document.createElement("h2");
    overallTitle.innerText = "Bedste Tider"
    divContainer.appendChild(overallTitle);

    for(let i = 0; i < shirtlistLength; i++){
      shirts = shirtList[i]

      const overallTid = (shirts.bjergtid + shirts.spurttid);
      showOverallTid = document.createElement("p");
      showOverallTid.innerText = shirts.name + "s (" + shirts.alder + " år) tid i alt er: " + time_convert(overallTid) + ".";

      if(overallTid < lowestOverallTid){
        lowestOverallTid = overallTid;
        console.log(shirts.name + " ændret til");
        lowestOverallNavn = shirts.name;
        console.log(shirts.name);
      }

      divContainer.appendChild(showOverallTid);
    }

    let lowestOverall = document.createElement("h3");
    lowestOverall.innerHTML = "den laveste bjergtid er " + time_convert(lowestOverallTid) + " cyklet af " + lowestOverallNavn + "<br>" + lowestOverallNavn + " får den gule trøje." + "<br><br>";
    divContainer.appendChild(lowestOverall);
  }

  overallTimes();

  //OVERALL + UNDER 26 DETALJER (HVID TRØJE)

  function youthTimes() {
    let lowestUngTid = 2147483647;
    let lowestUngNavn;
    let showUngTid;

    const ungTitle = document.createElement("h2");
    ungTitle.innerText = "Bedste Tider (Under 26 år)"
    divContainer.appendChild(ungTitle);

    for(let i = 0; i < shirtlistLength; i++){
      shirts = shirtList[i]

      const ungTid = (shirts.bjergtid + shirts.spurttid);

      if (shirts.alder < 26){
        showUngTid = document.createElement("p");
        showUngTid.innerText = shirts.name + "s (" + shirts.alder + " år) tid i alt er: " + time_convert(ungTid) + ".";

        if(ungTid < lowestUngTid){
          lowestUngTid = ungTid;
          console.log(shirts.name + " ændret til");
          lowestUngNavn = shirts.name;
          console.log(shirts.name);
        }

        divContainer.appendChild(showUngTid);
      }

    }
    console.log(shirts.alder + " ung alderrrrr");
    let lowestUng = document.createElement("h3");
    lowestUng.innerHTML = "den laveste bjergtid er " + time_convert(lowestUngTid) + " cyklet af " + lowestUngNavn + "<br>" + lowestUngNavn + " får den hvide trøje." + "<br><br>";
    divContainer.appendChild(lowestUng);
  }

  youthTimes();

  //SPURT DETALJER (GRØN TRØJE)

  function sprintTimes() {
    let lowestSpurtTid = 2147483647;
    let lowestSpurtNavn;
    let showSpurtTid;

    const spurttitle = document.createElement("h2");
    spurttitle.innerText = "Spurttider";
    divContainer.appendChild(spurttitle);

    for(let i = 0; i < shirtlistLength; i++){
      shirts = shirtList[i];

      showSpurtTid = document.createElement("p");
      showSpurtTid.innerText = shirts.name + "s (" + shirts.alder + " år) spurttid er: " + time_convert(shirts.spurttid) + ".";

      if(shirts.spurttid < lowestSpurtTid){
        lowestSpurtTid = shirts.spurttid;
        console.log(shirts.name + " ændret til");
        lowestSpurtNavn = shirts.name;
        console.log(shirts.name);
      }

      divContainer.appendChild(showSpurtTid);
    }

    let lowestSpurt = document.createElement("h3");
    lowestSpurt.innerHTML = "den laveste spurttid er " + time_convert(lowestSpurtTid) + " cyklet af " + lowestSpurtNavn + "<br>" + lowestSpurtNavn + " får den grønne spurttrøje." + "<br><br>";
    divContainer.appendChild(lowestSpurt);
  }

  sprintTimes();

  //BJERG DETALJER (PRIKKEDE TRØJEDE)
  function mountainTimes() {
    let lowestBjergTid = 2147483647;
    let lowestBjergNavn;
    let showbjergTid;

    const bjergtitle = document.createElement("h2");
    bjergtitle.innerText = "Bjergtider";
    divContainer.appendChild(bjergtitle);

    for(let i = 0; i < shirtlistLength; i++){
      shirts = shirtList[i];

      showbjergTid = document.createElement("p");
      showbjergTid.innerText = shirts.name + "s (" + shirts.alder + " år) bjergtid er: " + time_convert(shirts.bjergtid) + ".";

      if(shirts.bjergtid < lowestBjergTid){
        lowestBjergTid = shirts.bjergtid;
        console.log(shirts.name + " ændret til");
        lowestBjergNavn = shirts.name;
        console.log(shirts.name);
      }

      divContainer.appendChild(showbjergTid);
    }

    let lowestBjerg = document.createElement("h3");
    lowestBjerg.innerHTML = "den laveste bjergtid er " + time_convert(lowestBjergTid) + " cyklet af " + lowestBjergNavn + "<br>" + lowestBjergNavn + " får den prikkede bjergtrøje." + "<br><br>";
    divContainer.appendChild(lowestBjerg);
  }

  mountainTimes();
}

document.addEventListener('DOMContentLoaded', () => {
  loadShirts();
});
