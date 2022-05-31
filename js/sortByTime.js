const divContainer = document.getElementById("container");
const url = 'http://localhost:8080/api/tourdefrance';

async function loadSortByTime(){
  const teamList = await fetch(url).then(response => response.json());
  const teamListLength = teamList.length;
  let timeArray = [];

  function time_convert(num){
    const hours = Math.floor(num / 60);
    const minutes = Math.round(num % 60);
    //const seconds = Math.round(minutes % 60);
    return hours + "t " + minutes + "'" /*+ seconds + '"'*/;
  }

  for (let i = 0; i < teamListLength; i++) {
    const times = teamList[i];

    const combinedTime = (times.bjergtid + times.spurttid);

    let biker = new Object(
      {
        name: times.name,
        time: time_convert(combinedTime)
      }
    );

    timeArray.push(biker);

    function compare(a,b){
      if(a.time < b.time) {
        return -1
      }
      if(a.time > b.time) {
        return 1;
      }
      return 0;
    }

    timeArray.sort(compare);

  }
  const table = document.createElement("table");
  for (let j = 0; j < timeArray.length; j++){
    const node = document.createElement("tr");
    for (const key of ['name', 'time']) {
      const tb = document.createElement("td");
      tb.innerHTML = timeArray[j][key]
      node.appendChild(tb)
      table.appendChild(node);
    }
    divContainer.appendChild(table);
  }
  console.log(timeArray);
}

document.addEventListener('DOMContentLoaded', () => {
  loadSortByTime();
});
