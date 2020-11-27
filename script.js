


// teatteri funktio. Funktion tehätävä on hakea siltä pyydetyn teatterin tiedot ja sijoittaa ne tauluun.
function teatteri(x) {
    //oletus teatteri on tennispalatsi
    if(x=='load') {
        var thtr = 'tennispalatsi';
    } else if(x == 'y') {
        //tekstisyötteen käsittely
        var thtr = document.getElementById("teatteriHaku").value;
        thtr = thtr.toLowerCase();
        if(thtr=="kinopalatsi") {
            alert("Jos haluat nähdä Turun Kinopalatsin tarjonnan syötä: KinopalatsiTurku");
        }
    } else {
        var thtr = document.getElementById("teatterit").value;
    };
    // kaupunki funktio palauttaa oikean idn
    var id = kaupunki(thtr);
    if(id == 0) {
        alert("Ei löytynyt")
    } else{
    var xmlhttp = new XMLHttpRequest();
    var url = 'https://www.finnkino.fi/xml/Schedule/?area='+id+'&dt=';
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var date = new Date();
            var xmlDoc = xmlhttp.responseXML;
            //alustetaan taulu
            var table = "<table><tr>" +
            "<th>Elokuva</th><th>Elokuvan kesto</th><th>Genre</th><th>Ikäraja</th><th>Seuraava näytös</th></tr>";
            var elokuvat = xmlDoc.getElementsByTagName("Show");
            var apuTaulu = [];
            for(i = 0;i<elokuvat.length;i++) {
                //apumuuttujat
                var a = true;
                var j;
                var aloitusAika = elokuvat[i].getElementsByTagName("dttmShowStart")[0].innerHTML;
                var aloitusTunti = aloitusAika[11] + aloitusAika[12];
                var aloitusMinuutti = aloitusAika[14] + aloitusAika[15]
                //karsitaan jo menneet näytökset
                if(aloitusTunti < date.getHours()) {
                    continue;
                } else if(aloitusTunti == date.getHours() && aloitusMinuutti < date.getMinutes()) {
                    continue;
                }

                var esitysAika = aloitusTunti + ":" + aloitusMinuutti;
                var elokuva = elokuvat[i].getElementsByTagName("Title")[0].innerHTML;

                //karsitaan duplikaatit elokuvat
               for(x=0; x<apuTaulu.length;x++) {
                 if(apuTaulu[x] == elokuva) {
                        a = false;
                        j=x;
                     continue;
                     }
                }
                if(a) {
                  apuTaulu[i] = elokuva;
                } else if(!(a)) {
                    continue;
                }
                // haetaan elokuvan tietoja ja asetetaan ne tauluun
                var pituus = elokuvat[i].getElementsByTagName("LengthInMinutes")[0].innerHTML;
                var genre = elokuvat[i].getElementsByTagName("Genres")[0].innerHTML;
                var rating = elokuvat[i].getElementsByTagName("RatingImageUrl")[0].innerHTML;
                var ikaraja = "<img src='"+ rating+"' class='ikaraja'"
                var kuva = elokuvat[i].getElementsByTagName("Images")[0].childNodes[3].innerHTML;
                
                table += "<tr><td> <img src='" + kuva + "' alt='leffa' id='kuva"+i+"' class='leffat' title=" + elokuva+ " width='160' height='240'><br>"+elokuva+"</td>" +
                        "<td>"+pituus+" min</td><td>"+ genre +"</td><td>"+ikaraja+"</td><td>"+esitysAika+"</td></tr>";

            }
            document.getElementById("divi").innerHTML = table + "</table>";

            }
    }
    }
}
    //funktio kaupunki palauttaa sille annetun teatterin idn
    function kaupunki(thtr) {
        if(thtr=="tennispalatsi") {
            var id = 1033;
        } else if(thtr=="kinopalatsi") {
            var id = 1031;
        } else if (thtr=="maxim") {
            alert("Tätä tehdessä maximin xml ei toiminut")
            var id = 1032;
        } else if (thtr=="itis") {
            var id = 1045;
        } else if (thtr=="omena") {
            console.log("on omena")
            var id = 1039;
        }else if (thtr=="sello") {
            var id = 1038;
        }else if (thtr=="flamingo") {
            var id = 1013;
        }else if (thtr=="strand") {
            var id = 1041;
        }else if (thtr=="kuvapalatsi") {
            var id = 1017;
        }else if (thtr=="atlas") {
            var id = 1034;
        }else if (thtr=="plevna") {
            var id = 1035;
        }else if (thtr=="kinopalatsiturku") {
            var id = 1022;
        }else if (thtr=="promenadi") {
            var id = 1019;
        }else if (thtr=="fantasia") {
            var id = 1015;
        } else if (thtr=="scala") {
            var id = 1016;
        }else if (thtr=="plaza") {
            var id = 1018;
        } else {
            id = 0;
        }

        return id;

    }