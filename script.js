
// Liste vide keyList ou on va répertorier toutes les touches valides
let recordList = [];
let timeWhenRecordPressed = "";
let latencyList = [];
let isRecording = false

// Prend les deux derniers boutons de la liste keyList au cas ou on change les boutons
const recordButton = document.querySelector(`.record`)
const playButton = document.querySelector(`.play`)
// const beatBoxButton = document.querySelector(`.beatBox`)


document.addEventListener("keydown", handleKeyDown);
// beatBoxButton.addEventListener("click", beatBox)


/**
 * Fonction principale lancée quand on clique sur un bouton
 * @param {*} event 
 * @returns Nothing
 */
function handleKeyDown(event) {
    // Evite répetitions non voulu
    if(event.repeat){return}

    let divSource = document.querySelector(`.key[data-key="${event.keyCode}"]`)
    
    // Evite touche non voulue
    if (divSource == null) {return}

    
        
    // Si touche est une touche qui fait du son
    if (event.keyCode != recordButton.dataset.key && event.keyCode != playButton.dataset.key){

        let audioSource = getAudioSource(event.keyCode);

        playSound(audioSource);
        
        // Seulement quand ça record
        if (isRecording) {

            // On garde dans liste recordList
            recordList.push(event.keyCode)

            addToLatency();

         }

        //  Animation
        playAnimButton(divSource)
    }

    // Si key = R pour Record
    if (event.keyCode == "82") {
        // Toggle isRecording, et lance la fonction nécessaire
        isRecording = !isRecording
        isRecording ? startRecord() : stopRecord()
    }

    // Si key = P pour Play
    if (event.keyCode == "80"){
        // Lance fonction startPlaying seulement si RecordingFalse
        isRecording? null : startPlaying()
    }

}

/**  
 * 
 * Initialise les arrays, la latence et l'animatoin pour le record
*/
function startRecord() {
    recordList = [];
    latencyList = [];
    recordButton.classList.add("playing")


    timeWhenRecordPressed = Date.now()
    // console.log("Recording starting " + timeWhenRecordPressed);
    

}


/**
 * Retire l'animation du bouton Record et garde la dernière latency de quand tu appuie sur le bouton
 */ 
function stopRecord() {
    recordButton.classList.remove("playing")

    latencyList.push(Date.now() - timeWhenRecordPressed)    
}


/**
 * Plays the recorded sounds with the latency
 */
function startPlaying(){

    let latencyFinal = latencyList.map(record => record-latencyList[0])

    playButton.classList.add("playing")


    for(let i = 0 ; i < recordList.length ; i++){

        setTimeout( () => {
            playAnimButton(getKeyDiv(recordList[i]));
            playSound( getAudioSource(recordList[i]) );
            // console.log("play "+ recordList[i].src +" with latency " + latencyFinal[i]);
            
        }, latencyFinal[i] )    

    }
    setTimeout(() => {
        playButton.classList.remove("playing")
    }, latencyFinal[latencyFinal.length-1]);
     
}

function addToLatency(){    
    if (recordList.length > 1) {
        latencyList.push(Date.now() - timeWhenRecordPressed)
        

        // console.log(Date.now() - timeWhenRecordPressed);
        
    }
}

/**
 * Joue le son donné avec .play()
 * @param {*} son 
 */
function playSound(son) {
    son.currentTime = 0;
    son.play()
}

/**
 * Récupère balise HTML audio avec data key donnée
 * @param {*} keyCode 
 * @returns htmlElement
 */ 
function getAudioSource(keyCode) {
    return document.querySelector("audio[data-key='" + keyCode + "']")
}
function getKeyDiv(keyCode) {
    return document.querySelector(".key[data-key='" + keyCode + "']")
}


/**
 * Plays the button animation
 */
async function playAnimButton(bouton){
    try{
    bouton.classList.add("playing")
    setTimeout(() => { 
        bouton.classList.remove("playing");
    }, 300 )
    }
    catch(error) {console.log("marche po");
    }
}


// TP 2

// function beatBox() {
//     beatBoxButton.classList.toggle("playing")
// }