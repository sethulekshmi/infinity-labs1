function loadAssets()
{
	/*
	Retrieves all V5Cs from the blockchain and formats the data to display on a web page. Need the address of the account 
	executing this request, at the moment this is hard coded in the html for each page. 
	*/
	var found = 0;
	var posLast = 0;
	var objects = [];
	var error = false;
	var xhr = new XMLHttpRequest()
	xhr.open("GET", "/blockchain/assets/vehicles", true)
	xhr.overrideMimeType("text/plain");
	xhr.onprogress = function () {
		var data = xhr.responseText;
		var array = data.split("&&");
		
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].trim() != "")
			{
				var obj = JSON.parse(array[i]);
				var found = false;
				
				for(var j = 0; j < objects.length; j++)
				{
					if(objects[j].v5cID == obj.v5cID)
					{
						found = true;
						break;
					}
				}
				if(!found)
				{
					if(pgNm == "Regulator")
					{
						if(obj.status == 0)
						{
							obj.diamondat = '&lt;<i>diamondat</i>&gt;';
							obj.clarity = '&lt;<i>clarity</i>&gt;';
							obj.cut = '&lt;<i>cut</i>&gt;';
							obj.colour = '&lt;<i>colour</i>&gt;';
							obj.location = '&lt;<i>location</i>&gt;';
							objects.push(obj);
						}
					}
					else
					{
						if(typeof obj.message == 'undefined' && obj.diamondat > 0 && obj.clarity.toLowerCase() != 'undefined' && obj.clarity.trim() != '' && obj.cut.toLowerCase() != 'undefined' && obj.cut.trim() != '' && obj.location.toLowerCase() != 'undefined' && obj.location.trim() != '' && obj.colour.toLowerCase() != 'undefined' && obj.colour.trim() != '' && !obj.scrapped)
						{
							objects.push(obj)
						}
					}
					if(obj.hasOwnProperty("error"))
					{
						error = true
						$("#vhclsTbl").append("Unable to load assets.");
					}
				}
			}
		}
		var plu = 'assets';
		if(objects.length == 1)
		{
			plu = 'asset';
		}
		$('.numFound').html(objects.length + ' ' + plu);
	}
	xhr.onreadystatechange = function (){
		if(xhr.readyState === 4)
		{
			if(!error)
			{
				$("#vhclsTbl").empty();
				for(var i = 0; i < objects.length; i++)
				{
					var data = objects[i];
					$("#vhclsTbl").append("<tr class='vehRw'><td class='diamondat'>"+data.diamondat+"</td><td class='vehDets' ><span class='carInfo'>" + data.clarity + "</span><span class='carInfo'>" + data.cut + ", </span><span class='carInfo'>" + data.colour + ", </span><span class='carInfo'>" + data.location + "</span></td><td class='chkHldr'><span class='chkSpc' ></span><span class='chkBx' ></span><input class='isChk' type='hidden' value='false' /><input class='v5cID' type='hidden' value='"+data.v5cID+"' /></td></tr>");
				}
				changeBarSize();
			}
		}
	}
	xhr.send()
}

function loadUpdateAssets()
{
	/*
	Retrieves all V5Cs from the blockchain and formats the data to display on a web page. Need the address of the account 
	executing this request, at the moment this is hard coded in the html for each page. 
	*/
	var found = 0;
	var posLast = 0;
	var objects = [];
	var xhr = new XMLHttpRequest()
	xhr.open("GET", "/blockchain/assets/vehicles", true)
	xhr.overrideMimeType("text/plain");
	xhr.onprogress = function () {
		var data = xhr.responseText;
		var array = data.split("&&");
		
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].trim() != "")
			{
				var obj = JSON.parse(array[i]);
				var found = false;
				for(var j = 0; j < objects.length; j++)
				{
					if(objects[j].v5cID == obj.v5cID)
					{
						found = true;
						break;
					}
				}
				
				console.log("UPDATE ASSET READ:", obj)
				
				if(!found && typeof obj.message == 'undefined')
				{
					objects.push(obj)		
				}
			}
		}
		var plu = 'assets';
		if(objects.length == 1)
		{
			plu = 'asset';
		}
		$('#loaderMessages').html(objects.length + ' ' + plu);
	}
	xhr.onreadystatechange = function (){
		if(xhr.readyState === 4)
		{
			var d = objects;
			$('#loader').hide();
			$('#fade').hide();
			for(var i = 0; i < d.length; i++)
			{
				var data = d[i];
				if(data.diamondat == 0) data.diamondat = '&lt;<i>diamondat</i>&gt;';
				if(data.clarity.toLowerCase() == 'undefined' || data.clarity.trim() == '') data.clarity = '&lt;<i>clarity</i>&gt;';
				if(data.cut.toLowerCase() == 'undefined' || data.cut.trim() == '') data.cut = '&lt;<i>cut</i>&gt;';
				if(data.location.toLowerCase() == 'undefined' || data.location.trim() == '') data.location = '&lt;<i>location</i>&gt;';
				if(data.colour.toLowerCase() == 'undefined' || data.colour.trim() == '') data.colour = '&lt;<i>colour</i>&gt;';
				$('<tr class="foundCars" ><td class="smlBrk"></td><td class="editRw" ><span class="carID">'+data.v5cID+'</span></td><td class="editRw" colspan="2" >[<span class="carDiamondat">'+data.diamondat+'</span>] <span class="carClarity">'+data.clarity+'</span> <span class="carCut">'+data.cut+'</span>, <span class="carColour">'+data.colour+'</span>, <span class="carLocation">'+data.location+'</span><img src="Icons/Manufacturer/edit.svg" onclick="showEditTbl(this)" class="rtBtn" width="20" height="20" /></td><td class="smlBrk" ></td></tr>').insertAfter('#insAft');
			}
		}
	}
	xhr.send()	
}
