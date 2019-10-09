(function() {
    var data; 
    for (var i = 0; i < localStorage.length; i++){
        var pic = document.createElement("img");    
        pic.width = 90;
        pic.height = 90;
        pic.classList.add("pic");

        artistsDiv= document.getElementById("artistsDiv");
        artistDesc = document.createElement("div");
        artistDesc.id = "artistDesc";
        artistDesc = document.createElement("div");
        artistDesc.id = "artistDesc";

        helper = document.createElement("span");
        helper.class = "helper";
		
		artists = document.createElement("div");
        artists.classList.add("artist");
        artistsDiv.append(artists);

        artistname = document.createElement("h3");
        artistDesc.append(artistname);

        artistDescription = document.createElement("p");
        artistDesc.append(artistDescription);

        delBtn = document.createElement("button");
        delBtn.classList.add("deleteArtist");
        
        delBtn.innerText = "Delete";
		var dataString = [];
		var key = localStorage.key(i);
		console.log("key: " + key);
		delBtn.id = key;
		data = JSON.parse(localStorage.getItem(key));

		data.forEach(element => {
			dataString.push(JSON.stringify(element));
		});

		artistNameNode = dataString[0].replace(/["]/g, ''); 
		artistNameDesc = dataString[1].replace(/["]/g, ''); 
		pic.src = dataString[2].replace(/["]/g, '');  
		
		delBtn.onclick = deleteRow;

		artistname.append(artistNameNode);
		artistDescription.append(artistNameDesc);
		artists.append(artistDesc);
		artists.append(helper);
		artists.append(pic);
		artists.append(artistDesc);
		artists.append(delBtn);
	}

});

function deleteRow(){
    var row = $(this).closest('div');
    localStorage.removeItem(this.id);  
    row.remove();
}

function addToList(){
	var max = 40;
	var name = document.getElementById("name");
	var aboutArtist = document.getElementById("aboutArtist");
	var aUrl = document.getElementById("artistUrl");
	if (aboutArtist.value.length > max) {
        aboutArtist.value = aboutArtist.value.slice(0, max);
	}
    
	if (name.value.length > max) {
        name.value = name.value.slice(0, max);
	}

    artists = document.getElementsByClassName("artist");
	localStorage.setItem(name.value, JSON.stringify([name.value, aboutArtist.value, aUrl.value ]));

	document.getElementById('addDiv').style.display = "none";
	document.getElementById("name").value = '';
	document.getElementById("aboutArtist").value = '';
    document.getElementById("artistUrl").value = '';	
    
    window.location.reload(false); 
}

function add() {
	var hide = document.getElementById("addDiv");
	if(hide.style.display === "none") {
		hide.style.display = "block";
	} else {
		hide.style.display = "none";
	}
}

function search(){
    document.getElementById("artistsDiv").innerHTML = "";
    searchValue = document.getElementById("searchBarInput").value.toLowerCase();
	
	for (var i = 0; i < localStorage.length; i++){
	    var dataString = [];
        var key = localStorage.key(i);
        keyString = JSON.stringify(key).replace(/["]/g, '').toLowerCase();

        if (keyString.includes(searchValue)){
            var pic = document.createElement("img");    
            pic.width = 90;
            pic.height = 90;
            pic.classList.add("pic");

            artistsDiv= document.getElementById("artistsDiv");
            artistDesc = document.createElement("div");
            artistDesc.id = "artistDesc";

            artists = document.createElement("div");
            artists.classList.add("artist");
			artistsDiv.append(artists);
			helper = document.createElement("span");
            helper.class = "helper";
            artistDesc = document.createElement("div");
            artistDesc.id = "artistDesc";
            artistname = document.createElement("h3");
            artistDesc.append(artistname);
            artistDescription = document.createElement("p");
            artistDesc.append(artistDescription);

            delBtn = document.createElement("button");
            delBtn.classList.add("deleteArtist");
            delBtn.id = key;
            
            delBtn.innerText = "Delete";
            data = JSON.parse(localStorage.getItem(key));
            data.forEach(element => {
                dataString.push(JSON.stringify(element));
            });

            artistNameNode = dataString[0].replace(/["]/g, ''); 
            artistNameDesc = dataString[1].replace(/["]/g, ''); 
            pic.src = dataString[2].replace(/["]/g, ''); 
			delBtn.onclick = deleteRow;
			
            artistname.append(artistNameNode);
            artistDescription.append(artistNameDesc);
            artists.append(artistDesc);
            artists.append(helper);
            artists.append(pic);
            artists.append(artistDesc);
            artists.append(delBtn);
        }
    }
}