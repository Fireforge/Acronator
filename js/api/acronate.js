/**
* Created with Acronator.
* User: Fireforge
* Date: 2014-04-12
* Time: 01:45 PM
* To change this template use Tools | Templates.
*/

function acronate( acronym, keywords ){
    console.log(">>>acronate")
    // Setup the 
    var acronymLetters = [];
    for ( var i = 0; i < acronym.length; i++ )
    {
        acronymLetters.push(AcronymLetter(acronym.charAt(i), []))
    }
    console.log(acronymLetters);
    
    // Get the synonyms from the bighugelabs API
    keywordsArray = keywords.split(" ");
    console.log(keywordsArray);
    var wordBank = [];
    
    var ajaxReqs = [];
    for (var j = 0; j < keywordsArray.length; j++){
        ajaxReqs.push($.ajax({
            url: 'https://words.bighugelabs.com/api/2/ff854eb1f0151b1a2d15940fdb5cb1b5/' + keywordsArray[j] + '/json',
            dataType: 'jsonp',
            async: false,
            success: function(response) {
                for (syntype in response){
                    console.log(response[syntype].syn);
                    wordBank = wordBank.concat(response[syntype].syn)
                }
            }
        }));
    }
    //console.log(ajaxReqs);
    // when all AJAX requests are complete
    var deacronizations = [];
    var test = $.when.apply($, ajaxReqs).then(function() {
        //console.log(wordBank);

        // Sort all words in word bank with their matching acronym letters
        for (var j = 0; j < acronymLetters.length; j++){
            for (word in wordBank){
                if (acronymLetters[j].checkword(acronymLetters[j], wordBank[word])){
                    acronymLetters[j].words.push(wordBank[word]);
                    //possibleAcronym.push(wordBank[word]);
                }
            }
        }
        
        // Now that we've sorted the synonyms, figure out some de-acronizations
        for (var i = 0; i < 5; i++){ //hardcoded to 5 deacros for now
            var deacro = []
            for (var j = 0; j < acronymLetters.length; j++){
                var letter = acronymLetters[j];
                var word = letter.words[Math.floor(Math.random()*letter.words.length)];
                deacro.push(word);
            }
            deacronizations.push(deacro)
        }
        console.log(deacronizations);
    });
    console.log(test);
    console.log("<<<acronate")
    console.log(test.done());
}

function AcronymLetter(letter, words) {
    var myobj = new Object();
    myobj.letter = letter;
    myobj.words = words;

    myobj.checkword = function(obj, word){
        return word.charAt(0) == obj.letter;
    }

    return myobj;
}
