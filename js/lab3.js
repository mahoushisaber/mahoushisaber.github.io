function deleteRow(){
	var row = $(this).closest('div');
	row.remove();
}

function add() {
	var x = document.getElementById("addDiv");
	x.style.display === "none"? x.style.display = "block":x.style.display = "none";
}

function addToList(){
	var max = 40;

	var pic = new Image(90,90);
	pic.id = "pic";
	var name = document.getElementById("name");
	var aboutArtist = document.getElementById("aboutArtist");
	var artistUrl = document.getElementById("artistUrl");
	if (aboutArtist.value.length > max) {
        aboutArtist.value = aboutArtist.value.slice(0, max);
	}
	if (name.value.length > max) {
        name.value = name.value.slice(0, max);
	}
	aDiv= document.getElementById("artistsDiv");
	artistDesc = document.createElement("div");
	artistDesc.id = "artistDesc";
	artists = document.createElement("div");
	artists.classList.add("artist");
	aDiv.append(artists);
	artistDesc = document.createElement("div");
	artistDesc.id = "artistDesc";

	helper = document.createElement("span");
	helper.class = "helper";
	artistname = document.createElement("h3");
	artistname.append(name.value);
	artistDesc.append(artistname);

	text = document.createElement("p");
	text.append(aboutArtist.value)
	artistDesc.append(text);
	delBtn = document.createElement("button");
	delBtn.classList.add("deleteArtist");
	delBtn.innerText = "Delete";
	delBtn.onclick = deleteRow;
	pic.src = artistUrl.value;

	artists.append(artistDesc);
	artists.append(helper);
	artists.append(pic);
	artists.append(artistDesc);
	artists.append(delBtn);

	document.getElementById('addDiv').style.display = "none";
	document.getElementById("name").value = '';
	document.getElementById("aboutArtist").value = '';
	document.getElementById("artistUrl").value = '';
}
