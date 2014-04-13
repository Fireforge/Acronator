/**
* Created with Acronator.
* User: Fireforge
* Date: 2014-04-12
* Time: 01:45 PM
* To change this template use Tools | Templates.
*/

function acronate( acronym, keywords, array){
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
    var key = 'a748dfd640b4229135138bae56d67540';
    for (var j = 0; j < keywordsArray.length; j++){
        ajaxReqs.push($.ajax({
            url: 'https://words.bighugelabs.com/api/2/'
            + key
            + '/'
            + keywordsArray[j]
            + '/json',
            dataType: 'jsonp',
            async: false,
            success: function(response) {
                for (syntype in response){
                    //console.log(response[syntype].syn);
                    wordBank = wordBank.concat(response[syntype].syn)
                }
            }
        }));
    }
    //console.log(ajaxReqs);
    // when all AJAX requests are complete
    var deacronizations = [];
    var test = $.when.apply($, ajaxReqs);
    /*
    test.then(function() {
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
    */

    return test.then(function(x) {
        // Sort all words in word bank with their matching acronym letters
        for (var j = 0; j < acronymLetters.length; j++){
            for (word in wordBank){
                if (acronymLetters[j].checkword(acronymLetters[j], wordBank[word])){
                    acronymLetters[j].words.push(wordBank[word]);
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

        return deacronizations;
    });
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
