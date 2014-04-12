/**
* Created with Acronator.
* User: Fireforge
* Date: 2014-04-12
* Time: 01:45 PM
* To change this template use Tools | Templates.
*/

function acronate( acronym, keywords ){
    var acronymLetters = [];
    for ( var i = 0; i < acronym.length; i++ )
    {
        acronymLetters.push(AcronymLetter(acronym.charAt(i), ['hello']))
    }


    $.ajax({
        url: 'http://words.bighugelabs.com/api/2/ff854eb1f0151b1a2d15940fdb5cb1b5/word/json',
        data: keywords[0],
        method: 'POST',
        dataType:'jsonp',
        success: function(response) {
        	console.log('AJ');
            console.log(response.noun.syn[0]);
            //use data here.
        }
    });

    var firstAcronym = [];
    for (var j = 0; j < acronymLetters.length; j++){
    	//console.log(acronymLetters[j]);
        firstAcronym.push(acronymLetters[j].words[0]);
        //possibleAcronyms.push(l.join(" "))
    }
    return [firstAcronym];
}

function AcronymLetter(letter, words) {
    this.letter = letter;
	this.words = words;

    this.checkword = function(word){
        return word.charAt(0) == this.letter;
    }

    return this;
}
