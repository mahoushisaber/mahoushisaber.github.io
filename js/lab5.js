function showAddArtistContent() {
  var addArtistContent = document.getElementsByClassName("addArtistContent");
  if (addArtistContent[0].style.display === 'block') {
    addArtistContent[0].style.display = 'none';
  } else {
    addArtistContent[0].style.display = 'block';
  }
}

async function addArtist() {
  var inName = document.getElementById("artistName").value;
  var inAbout = document.getElementById("aboutArtist").value;
  console.log(inName.length);
  console.log(inAbout.length);
  if (inName.length <= 40 && inAbout.length <= 40) {
    var inUrl = document.getElementById("imageUrl").value;
    var divArtist = document.createElement('div');
    var divArtistImg = document.createElement('div');
    var img = document.createElement('img');
    divArtist.setAttribute('class', 'eachArtist');
    divArtistImg.setAttribute('class', 'eachArtistImg');
    img.setAttribute('src', inUrl);
    divArtistImg.appendChild(img);
    divArtist.appendChild(divArtistImg);
    
    var divArtistContent = document.createElement('div');
    var artistP = document.createElement('p');
    var artistH4 = document.createElement('h4');
    artistP.textContent = inAbout;
    artistH4.textContent = inName;
    divArtistContent.setAttribute('class', 'eachArtistContent')
    divArtistContent.appendChild(artistH4);
    divArtistContent.appendChild(artistP);
    divArtist.appendChild(divArtistContent);

    var removeButton = document.createElement('button');
    removeButton.setAttribute("class", "removeButton");
    removeButton.setAttribute("onclick", "removeArtist(this);");
    removeButton.textContent = "Delete";
    divArtistContent.appendChild(removeButton);

    var ArtistList = document.getElementsByClassName("ArtistList");
    ArtistList[0].appendChild(divArtist);
    var user = {
      'Name': inName,
      'About': inAbout,
      'Url': inUrl
    };
    await saveDataIntoFile(user);
  } else {
    alert("Less than 40 characters, please");
  }
}

async function removeArtist(btn) {
  let currentNode = (btn.parentNode).parentNode;
  let parentNode = ((btn.parentNode).parentNode).parentNode;
  let index = 0;
  while (parentNode.childNodes[index] != currentNode) {
    index++;
  }
  index = index - 1;
  i = index;
  for (; localStorage.getItem(i + 1) != null; i++) {
    localStorage.setItem(i, localStorage.getItem(i + 1));
  }
  await removeDataFromFile(i);
  loadDataFromFile();
}

async function removeDataFromFile(i) {
  let url = "http://localhost:5000/delete";
  fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        index: i
      })
    })
    .then(response => {
      console.log('response', response)
    })
    .then((result) => {
      console.log('success:', result)
      loadDataFromFile();
    })
    .catch(error => console.log('error:', error));
}

function searchByName() {
  var inName = document.getElementById("searchName").value;
  searchByNameServer(inName);
}

function clearUpArtistList() {
  let artistList = document.getElementsByClassName("ArtistList");
  artistList = artistList[0];
  let child = artistList.lastElementChild;
  while (child) {
    artistList.removeChild(child);
    child = artistList.lastElementChild;
  }
}

async function shows(objects) {
  clearUpArtistList();
  let i = 0;
  while (objects[i] != null) {
    var dataURL = objects[i].Url;
    var dataName = objects[i].Name;
    var dataAbout = objects[i].About;
    var divArtist = document.createElement('div');
    divArtist.setAttribute('class', 'eachArtist');
    var divArtistImg = document.createElement('div');
    divArtistImg.setAttribute('class', 'eachArtistImg');
    var img = document.createElement('img');
    img.setAttribute('src', dataURL);
    divArtistImg.appendChild(img);
    divArtist.appendChild(divArtistImg);
    var divArtistContent = document.createElement('div');
    var artistH4 = document.createElement('h4');
    var artistP = document.createElement('p');
    artistP.textContent = dataAbout;
    artistH4.textContent = dataName;
    divArtistContent.setAttribute('class', 'eachArtistContent')
    divArtistContent.appendChild(artistH4);
    divArtistContent.appendChild(artistP);
    divArtist.appendChild(divArtistContent);
    var removeButton = document.createElement('button');
    removeButton.textContent = "Delete";
    removeButton.setAttribute("class", "removeButton");
    removeButton.setAttribute("onclick", "removeArtist(this);");
    divArtistContent.appendChild(removeButton);
    var ArtistList = document.getElementsByClassName("ArtistList");
    ArtistList[0].appendChild(divArtist);
    i++;
  }
}

function saveDataIntoFile(object) {
  let url = "http://localhost:5000/save";
  fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          Name: object.Name,
          About: object.About,
          Url: object.Url
        }
      })
    })
    .then(response => {
      console.log('response', response)
    })
    .then((result) => {
      console.log('success', result)
      loadDataFromFile();
    })
    .catch(error => console.log('error:', error));
}

async function searchByNameServer(inName) {
  console.log("testing");
  let url = "http://localhost:5000/search";
  response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Name: inName
    })
  });
  result = await response.json();
  console.log(result);
  shows(result);
}

function loadDataFromFileSearch() {
  let url = "http://localhost:5000/load";
  fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((jsonData) => {
      let data = JSON.parse(jsonData)
      shows(data);
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}
loadDataFromFile();

function loadDataFromFile() {
  let url = "http://localhost:5000/load";
  fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((jsonData) => {
      let data = JSON.parse(jsonData)
      shows(data);
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}