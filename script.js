
// Liste vide keyList ou on va répertorier toutes les touches valides
let recordList = [];
let timeWhenRecordPressed = "";
let latencyList = [];

// Prend les deux derniers boutons de la liste keyList au cas ou on change les boutons
const recordButton = document.querySelector(`.record`)
const playButton = document.querySelector(`.play`)

let isRecording = false



document.addEventListener("keydown", handleKeyDown);


// Quand on appuie sur une touche
function handleKeyDown(event) {
    if(event.repeat){return}

    let divSource = document.querySelector(`.key[data-key="${event.keyCode}"]`)
    
    if (divSource == null) {return}

    let audioSource
        
    // Si l'event
    if (event.keyCode != recordButton.dataset.key && event.keyCode != playButton.dataset.key){

        audioSource = getAudioSource(event.keyCode);

        playSound(audioSource);
        
        // Seulement quand ça record
        if (isRecording) {

            recordList.push(audioSource)

            // AAAAAAAAAAAAAAAAA
            addToLatency();

         }


        divSource.classList.add("playing")

        setTimeout(() => { 
            divSource.classList.remove("playing");
        }, 100 )


    }

    // Si key = R pour Record
    if (event.keyCode == "82") {
        isRecording = !isRecording
        isRecording ? startRecord() : stopRecord()
    }

    // Si key = P pour Play
    if (event.keyCode == "80"){
        isRecording? null : startPlaying()
    }

}



function startRecord() {
    recordList = [];
    latencyList = [];
    recordButton.classList.add("playing")


    timeWhenRecordPressed = Date.now()
    console.log("Recording starting " + timeWhenRecordPressed);
    

}


function stopRecord() {
    recordButton.classList.remove("playing")
    latencyList.push(Date.now() - timeWhenRecordPressed)
}




function startPlaying(){

    console.log(recordList);
    console.log(latencyList);


    let latencyFinal = latencyList.map(record => record-latencyList[0])

    console.log('latencyfinal');
    
    console.log(latencyFinal);
    

    for(let i = 0 ; i < recordList.length ; i++){

        setTimeout( () => {
            playSound(recordList[i]);
            console.log("play "+ recordList[i].src +" with latency " + latencyFinal[i]);
            
        }, latencyFinal[i] )    

    }
     
}

function addToLatency(){    
    if (recordList.length > 1) {
        latencyList.push(Date.now() - timeWhenRecordPressed)
        console.log("Added latency" );
        

        console.log(Date.now() - timeWhenRecordPressed);
        
    }
}


// Fonction jouer son
function playSound(son) {
    son.currentTime = 0;
    son.play()
}



// Pour éviter trop de texte moche
function getAudioSource(keyCode) {
    return document.querySelector("audio[data-key='" + keyCode + "']")

}