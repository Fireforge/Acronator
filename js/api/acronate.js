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
    
    var firstAcronym = [];
    for (l in acronymLetters){
        firstAcronym.push(l.words[0]);
        //possibleAcronyms.push(l.join(" "))
    }
    return [firstAcronym.join(" ")];
}
/*
	Create an empty list of PossibleWords associated with each letter in acronym
    
	
    for (keyword in keywords):
		if the word can be used in the acronym:
			put it in the appropriate list with priority 0
		get a list of single word synonyms of the keyword
		for each synonym:
			if the synonym can be used in the acronym:
				put it in the appropriate list with priority 1
		for each filler word:
			if it can be used:
				include w/ priority 2

Return all combinations of PossibleWords between lists which minimize total priority
*/
			
function AcronymLetter(letter, words) {
    this.letter = letter;
	this.words = words;
    
    this.checkword = function(word){
        return word.charAt(0) == this.letter;
    }
    
    return this;
}
    
