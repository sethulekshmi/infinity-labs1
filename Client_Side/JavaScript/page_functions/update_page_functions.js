var selRw;
$(document).ready(function(){
	loadLogo(pgNm);
	
	$("#cclPg").click(function(){
		window.location.href = "index.html";
	})

	$(document).on('click', '.userHldr', function(){	
		$('.foundCars').remove();
		$('#loaderMessages').html('0 assets')
		$('#loader').show();
		$('#fade').show();		
		loadUpdateAssets()
	});

})

function showEditTbl(el)
{
	$('#chooseOptTbl').fadeIn(1000);
	$('#fade').fadeIn(1000);
	$('#v5cID').val($(el).parent().parent().find('.carID').html());
	if($(el).siblings('.carDiamondat').html() != '&lt;<i>diamondat</i>&gt;')
	{
		$('#diamondat').prop('readonly', true);
		$('#diamondat').css('cursor', 'not-allowed');
	}
	else
	{
		$('#diamondat').prop('readonly', false);
		$('#diamondat').css('cursor', 'text');
	}
	var diamondat = $(el).siblings('.carDiamondat').html()
	if(diamondat == '&lt;<i>diamondat</i>&gt;')
	{
		diamondat = 0;
	}
	var clarity = $(el).siblings('.carClarity').html()
	if(clarity == '&lt;<i>clarity</i>&gt;')
	{
		clarity = 'undefined'
	}
	var cut = $(el).siblings('.carCut').html()
	if( cut== '&lt;<i>cut</i>&gt;')
	{
		cut = 'undefined'
	}
	var colour = $(el).siblings('.carColour').html()
	if(colour == '&lt;<i>colour</i>&gt;')
	{
		colour = 'undefined'
	}
	var location = $(el).siblings('.carLocation').html()
	if(location== '&lt;<i>location</i>&gt;')
	{
		location = 'undefined'
	}
	$('#diamondat').val(diamondat);
	$('#clarity').val(clarity);
	$('#cut').val(cut);
	$('#colour').val(colour);
	$('#location').val(location);
	
	$('#hidDiamondat').val(diamondat);
	$('#hidClarity').val(clarity);
	$('#hidCut').val(cut);
	$('#hidColour').val(colour);
	$('#hidLocation').val(location.toUpperCase());
}

function closeEditTbl()
{
	$('#chooseOptTbl').hide();
	$('#errorRw').hide();
	$('#fade').hide();
}

function validate(el)
{
	
	/*
	Validation on if details have been filled in for updating a car. This is not validation on what the person is allowed to update,
	that is done within the contract on the blockchain.
	*/
	
	$('#errorRw').html('<ul></ul>');
	var failed = false;
	if(isNaN(parseInt($('#diamondat').val().trim())))
	{
		$('#errorRw').find('ul').append('<li>diamondat must be a number</li>')
		failed = true;
	}
	if($('#diamondat').val().trim().length != 15 && $('#diamondat').val().trim() != 0)
	{
		
		$('#errorRw').find('ul').append('<li>diamondat must be 15 characters (Currently ' + $('#diamondat').val().trim().length + ' characters)</li>')
		failed = true;
	}
	if($('#diamondat').val().trim() == 0 && $('#hidDiamondat').val().trim() != 0)
	{
		$('#errorRw').find('ul').append('<li>diamondat cannot be reset to 0</li>')
		failed = true;
	}
	if($('#clarity').val().trim() == '')
	{
		$('#errorRw').find('ul').append('<li>Clarity cannot be blank</li>')
		failed = true;
	}
	if($('#clarity').val().trim().toLowerCase() == 'undefined' && $('#hidClarity').val().trim().toLowerCase() != 'undefined')
	{
		$('#errorRw').find('ul').append('<li>Clarity cannot be reset to undefined</li>')
		failed = true;
	}
	if($('#cut').val().trim() == '')
	{
		$('#errorRw').find('ul').append('<li>Cut cannot be blank</li>')
		failed = true;
	}
	if($('#cut').val().trim().toLowerCase() == 'undefined' && $('#hidCut').val().trim().toLowerCase() != 'undefined')
	{
		$('#errorRw').find('ul').append('<li>Cut cannot be reset to undefined</li>')
		failed = true;
	}
	if($('#colour').val().trim() == '')
	{
		$('#errorRw').find('ul').append('<li>Colour cannot be blank</li>')
		failed = true;
	}
	if($('#colour').val().trim().toLowerCase() == 'undefined' && $('#hidColour').val().trim().toLowerCase() != 'undefined')
	{
		$('#errorRw').find('ul').append('<li>Colour cannot be reset to undefined</li>')
		failed = true;
	}
	if($('#location').val().trim() == '')
	{
		$('#errorRw').find('ul').append('<li>Location cannot be blank</li>')
		failed = true;
	}
	if($('#location').val().trim().toLowerCase() == 'undefined' && $('#hidLocation').val().trim().toLowerCase() != 'undefined')
	{
		$('#errorRw').find('ul').append('<li>Location cannot be reset to undefined</li>')
		failed = true;
	}
	if(!failed)
	{
		$('#errorRw').hide();
		updateAsset($('#diamondat').val().trim(), $('#clarity').val().trim(), $('#cut').val().trim(), $('#colour').val().trim(), $('location').val().trim().toUpperCase(), $('#v5cID').val(), el)
	}
	else
	{
		$('#errorRw').show();
	}
}
