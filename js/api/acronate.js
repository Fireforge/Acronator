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
        url: '',
        data: keywords[0],
        method: 'POST',
        success: function(response) {
            console.log(response);
            //use data here.
        }   
    });
    
    
    var firstAcronym = [];
    for (l in acronymLetters){
        firstAcronym.push(l.words[0]);
        //possibleAcronyms.push(l.join(" "))
    }
    return [firstAcronym.join(" ")];
}
			
function AcronymLetter(letter, words) {
    this.letter = letter;
	this.words = words;
    
    this.checkword = function(word){
        return word.charAt(0) == this.letter;
    }
    
    return this;
}
