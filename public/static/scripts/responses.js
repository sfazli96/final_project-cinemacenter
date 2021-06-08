function getBotResponse(input) {
    if (input == "Top 5 movies in 2020") {
        return "BlackBox, " + " Mulan, " + " Tenet, " + " Hamilton, " + " Invisible Man ";
    } 
    else if (input == "Top 5 movies in 2019") {
        return "The Irishman, " + " Pain & Glory, " + " Parasite, " + " Avengers: Endgame, " + " Spiderman: Far from Home " ;
    } 
    else if (input == "Top 5 movies in 2018") {
        return "The Mule, " + " Extinction, " + " Roma, " + " Leave No Trace, " + " Mission Impossible: Fallout " ;
    }
    else if (input == "Top 5 movies in 2017") {
        return "Dunkirk, " + " Get Out, " + " Shape Of Water, " + " Detroit, " + " Lady Bird " ;
    }
    else if (input == "Top 5 movies in 2016") {
        return "La La Land, " + " Manchester by the Sea, " + " Elle, " + " Toni Erdmann, " + " Hacksaw Ridge " ;
    }
    else if (input == "Top 5 movies in 2015") {
        return "The Martian, " + " Timbuktu, " + " The Walk, " + " Tangerine, " + " Mustang " ;
    }
    else if (input == "Top 5 all-time movies") {
        return "Shawshank Redemption, " + " Godfather, " + " Dark Knight, " + " Lord of the Rings, " + " Titanic " ;
    }
    else if (input == "Top 5 comedy movies") {
        return "Toni Erdmann, " + " In the Loop, " + " Idiocracy, " + " Bridesmaids, " + " Step Brothers " ;
    }
    else if (input == "Top 5 animated movies") {
        return "3 Minions, " + " Lion King, " + " Incredibles, " + " Frozen, " + " Despicable Me " ;
    }
    else if (input == "Top 5 upcoming movies") {
        return "Mortal Kombat, " + " Top Gun 2, " + " No Time to Die, " + " The Matrix 4, " + " Venom " ;
    }



    // Simple responses
    if (input == "hello") {
        return "Hello there!";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    } else {
        return "Try asking something else!";
    }
}