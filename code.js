(function(doc){
    var bereken_posities = function(aantal_zetels){
        var
        posities          = [],
        links_naar_rechts = true,
        huidige_positie   = 0,
        maximum_positie   = 0,
        max_gevonden      = true,
        voortgang         = "vooruit";
        for(i=0;i<1;){
            posities.push(huidige_positie);
            if(Math.abs(huidige_positie) == maximum_positie){
                if (max_gevonden){
                    if ((voortgang == "vooruit") && (Math.abs(huidige_positie) == aantal_zetels)){
                        voortgang = "achteruit";
                    }
					
                    switch (voortgang){
                        case "vooruit" :
                            huidige_positie = verplaats(huidige_positie, 1, links_naar_rechts);
                            links_naar_rechts = !links_naar_rechts;
                            maximum_positie++;
                            break;
                        case "achteruit" :
                            maximum_positie--;
                            links_naar_rechts = !links_naar_rechts;
                            huidige_positie = verplaats(huidige_positie, 1, links_naar_rechts);
                            break;
                    }
                    max_gevonden = false;
                } else {
                    if ((voortgang == "achteruit") && (huidige_positie == 0)){
                        i = 1;
                    } else {
                        huidige_positie = verplaats(huidige_positie, 2, links_naar_rechts);
                        max_gevonden = true;
                    }
                }
            } else {
                huidige_positie = verplaats(huidige_positie, 2, links_naar_rechts);
            }
        }
        for(j=0;j<posities.length;j++){
            posities[j] += aantal_zetels;
        }
        return posities;
		
    },
	
    verplaats = function(huidige_positie, verhoging, richting){
        if (richting) {
            return huidige_positie + verhoging;
        } else {
            return huidige_positie - verhoging;
        }
    },
	
    initialise = function(aantal_zetels){
        var classes = [];
        for(i=0;i<((aantal_zetels*2)+1);i++){
            if(i < aantal_zetels){
                classes[i] = "blauw";
            } else if(i == aantal_zetels){
                classes[i] = "leeg";
            } else {
                classes[i] = "rood";
            }
        }
        return classes;
    },
	
    schrijf_posities_uit = function(){
        var
        aantal_zetels = parseInt(element("selection_box").value),
        return_string = "",
        kleur = "",
        vakjes = initialise(aantal_zetels),
        moves = bereken_posities(aantal_zetels);
        for(i=0;i<moves.length;i++){
            return_string += "<div class=\"block\"><div class=\"hoofd\">";
            if (i==0) {
                return_string += "Beginsituatie:";
            } else {
                return_string += "Stap "+ i + ":<br />";
                if (vakjes[moves[i]] == "blauw"){
                    kleur = "blauw";
                } else {
                    kleur = "rood";
                }
                return_string += "Verplaats " + kleur + " van zetel " + (moves[i]+1) + " naar zetel " + (moves[i-1]+1) + ".";
                vakjes[moves[i-1]] = vakjes[moves[i]];
                vakjes[moves[i]] = "leeg";	
            }
            return_string += "</div>";
            for(j=0;j<vakjes.length;j++){
                return_string += "<div class=\""+vakjes[j]+"\">"+(j+1)+"</div>";
            }
            return_string += "<br /><br /><br /></div>";
        }
        element("output").innerHTML = return_string;
    },
                                
    element = function(id){
        return doc.getElementById(id);
    };
	
    schrijf_posities_uit();
    element("selection_box").onchange=schrijf_posities_uit;
})(document);