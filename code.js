
/* ++++++++++++++++++++++++++++
 * +++ jsPsych related code +++
 * ++++++++++++++++++++++++++++ */

//
// Function for saving data
// ------------------------
function saveData(name, data){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filename: name, filedata: data}));
}

//
// Randomization function
// ----------------------
// Randomize array element order in-place.
// Using Durstenfeld shuffle algorithm.
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

//
// Get current date and time
// -------------------------
// Results in the "dateTime" variable that includes the start date
Date.prototype.today = function () { 
  return this.getFullYear() + "-" + (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"-"+ ((this.getDate() < 10)?"0":"") + this.getDate();
}
Date.prototype.timeNow = function () {
   return ((this.getHours() < 10)?"0":"") + this.getHours() +"-"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +"-"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}
var dateTime = new Date().today() + "_" + new Date().timeNow();





// Initiate jsPsych
// (The new jsPsych V7 needs this activation of jsPsych at the beginning.)
// The "window.location" is where the participant is redirected to at the end of the study.
var jsPsych = initJsPsych({
    on_finish: function() {
       window.location = "https://duckduckgo.com/"
    }
});


// Random ID is created for filename/participant
var unique = jsPsych.randomization.randomID(8)


// Other variables
let gender = "";
let birthYear = "";






/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *  ###   #####   ##    ###   #####      #  #  ####  ###   ####
 * #        #    #  #   #  #    #        #  #  #     #  #  #
 *  ###     #    ####   ###     #        ####  ###   ###   ###
 *     #    #    #  #   #  #    #        #  #  #     #  #  #
 *  ###     #    #  #   #  #    #        #  #  ####  #  #  ####
 *
 * +++ Instructions what is presented on the screen start here. +++
 * +++ Below is where you can change something!                 +++
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */




// This just has to be here at the start. Creates the timeline variable
var timeline = [];




// -----------------------------------------------------------------------------------------
// This is an example how to present instructions
// including a "continue" button.

// "welcome" is just a name that you give this block/part of the study (could be anything)
// but must be the same as in the "timeline.push" line at the end of this block.
var Velkommen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <h2>Velkommen</h2>
    <p>Denne studien har som mål å undersøke hvordan mennesker planlegger for å nå sine mål i sammenheng med personlighetstrekket planmessighet. Vi vil også se på hvordan dette kan henge sammen med hvor detaljert en klarer å visualisere mulige fremtidige situasjoner.</p> 
    <p>Studien er frivillig og all informasjon som oppgis blir anonymisert. Du vil ikke bli bedt om å oppgi personlig demografisk informasjon bortsett fra kjønn og alder. Disse spørsmålene er også valgfrie å svare på. Du kan når som helst velge å trekke deg fra studien uten å oppgi grunn, ved å lukke nettleserfanen. Vi ber om at du svarer så ærlig som mulig på spørsmålene.</p>
    <p>Når du er ferdig med studien vil du få en link til hvor du kan skrive e-post adressen din slik at du kan være med i trekningen av to gavekort på 1000 kr.</p>
    <p>Denne studien er arrangert av Kristin Bjørkhaug Johansen på UiT–Norges Arktiske Universitet. Dersom du har spørsmål angående studien, ta kontakt på kjo186@uit.no.</p>
    `,
    choices: ['Neste'],

    // Adding this, avoids having the complete instructions in the output file
    // Now it just includes "instructions", and the file becomes easier to read/handle.
    data: { stimulus : 'instructions' }
};

// The above code creates this instruction block. The line below adds this block to the study.
// Without the below line, the "welcome" block will not be presented.
timeline.push(Velkommen);
// -----------------------------------------------------------------------------------------
// Consent Page
var Samtykke = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h2>Samtykke</h2>
  <div style="margin-bottom: 10px;">
    <input type="checkbox" id="read-info" name="read-info">
    <label for="read-info">Jeg bekrefter at jeg har lest og forstått informasjonen og samtykker til å delta i studien.</label>
  </div>
  <div style="margin-bottom: 10px;">
    <input type="checkbox" id="over-18" name="over-18">
    <label for="over-18">Jeg bekrefter at jeg er over 18 år.</label>
  </div>
  `,
  choices: ['Neste'],
  data: { stimulus: 'Samtykke' }
};

timeline.push(Samtykke);

// -----------------------------------------------------------------------------------------
// Another instruction block - works exactly the same way as the previous one.
// The only requirement is that it has another name (here "instructions")

var Instruksjoner = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h2>Instruksjoner</h2>
  <p>I vårt daglige liv må vi ofte huske å gjøre noe i fremtiden (f.eks. kjøpe melk, svare på en e-post, kjøpe en bursdagsgave til en venn). Vi må også huske generelle intensjoner (slik som å leve sunnere) som relaterer til ulike handlinger i fremtiden (f.eks. velge en sunn salat på restaurant, kjøpe frukt på butikken). Den første delen av undersøkelsen handler om slike intensjoner til å gjøre noe i fremtiden, som vi kaller ''fremtidige handlinger''. Denne delen handler om de ulike måtene vi tenker på fremtidige handlinger. Vi er spesielt interesserte i til hvilken grad tanker om fremtidige handlinger inkluderer spesifikke situasjoner hvor handlingen burde foregå.</p>
  <p>Noen ganger inkluderer tanker om fremtidige handlinger spesifikke situasjoner hvor handlingen kan skje. Disse situasjonene representerer ofte gode anledninger til å gjøre noe eller minner oss på å gjøre noe, slik som ''Neste gang jeg er på kjøpesenteret, skal jeg se etter en bursdagsgave til vennen min!''</p>
  <p>Hvorvidt dine tanker om fremtiden vanligvis er koblet til slike situasjoner er fokuset i denne første delen av undersøkelsen. Mer spesifikt, er vi ikke interessert i tanker om spesifikke datoer og klokkeslett (f.eks. søndag kl 5), men heller i situasjonelle stimuli som forekommer og som du oppfatter (f.eks. ''Når jeg drar fra jobb, når jeg møter min venn'').</p>
  `,
  choices: ['Neste'],
  data: { stimulus : 'Instruksjoner' }
};

timeline.push(Instruksjoner);
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// Another instruction block - works exactly the same way as the previous one.

var merInstruksjoner = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <p>De neste spørsmålene vil handle om tanker om fremtidige handlinger som inkluderer både situasjoner og handlinger.</p>
  <p>Hvor sannsynlig det er at dine tanker og planer om fremtidige handlinger inkluderer situasjoner hvor handlingen kan bli utført (f.eks. ‘’Når jeg er på kjøpesenteret’’, ‘’Etter jeg har dratt fra jobb’’).</p>
  <p>Det kan være vanskelig å bedømme slike ting om seg selv, men prøv å se for deg hvordan du vanligvis tenker.</p>
  <p>Vennligst indiker hvor mye du er enig eller uenig med følgene utsagn.</p>
  `,
  choices: ['Next'],
  data: { stimulus : 'instructions' }
};
timeline.push(merInstruksjoner);
// -----------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------
// Now, we do something more complex.
// If you want to ask 20 questions, you could just copy and
// past the previous question-block 20 times and change the label names and questions.
// However, that is very inefficient, error prone, and frustrating if you want
// to change something later. You have to do it again and again in all 20 blocks.
// A better way is to first make a LIST ("QuestItems") with all items and some additional
// comments, like this

var CueThoughtItems = [
    {quest: 'Å tenke på spesifikke situasjoner når jeg tenker på fremtidige handlinger er noe...\nJeg ville hatt vansker med å gjøre',                                                 label: 'item01_Vansker',       reverse: 1, itemNo: 1 },
    {quest: 'Å tenke på spesifikke situasjoner når jeg tenker på fremtidige handlinger er noe...\nJeg starter å gjøre før jeg legger merke til at jeg gjør det',                       label: 'item02_StarterFør',    reverse: 0, itemNo: 2 },
    {quest: 'Å tenke på spesifikke situasjoner når jeg tenker på fremtidige handlinger er noe...\nJeg har gjort lenge',                                                                label: 'item03_GjortLenge',    reverse: 0, itemNo: 3 },  
    {quest: 'Å tenke på spesifikke situasjoner når jeg tenker på fremtidige handlinger er noe...\nSom føles nesten naturlig ut for meg',                                               label: 'item04_FølesNaturlig', reverse: 0, itemNo: 4 }, 
    {quest: 'Å tenke på spesifikke situasjoner når jeg tenker på fremtidige handlinger er noe...\nJeg ville trengt en påminnelse for å gjøre',                                         label: 'item05_Påminnelse',    reverse: 1, itemNo: 5 },
    {quest: 'Å tenke på spesifikke situasjoner når jeg tenker på fremtidige handlinger er noe...\nSom ikke er typisk “meg”',                                                           label: 'item06_IkkeTypisk',    reverse: 1, itemNo: 6 },
    {quest: 'Å tenke på spesifikke situasjoner når jeg tenker på fremtidige handlinger er noe...\nJeg sjeldent gjør',                                                                  label: 'item07_Sjeldent',      reverse: 1, itemNo: 7 },
    {quest: 'Å tenke på spesifikke situasjoner når jeg tenker på fremtidige handlinger er noe...\nJeg gjør hver dag',                                                                  label: 'item08_HverDag',       reverse: 0, itemNo: 8 },
]

// After specifying such a list, we can access each item by the list numnber
// QuestItem[1].quest --> first item, "I am good at resisting temptation"
// QuestItem[2].quest --> second item, ... and so on
//
// If we use "label" instead of "quest", >>QuestItem[1].label<<, we get the label of the first item ("item01_RestTemp")
// So, the format here is the main name "QuestItems", then "[4]" the line/list item, and for example "label" as the sub.name --> "item04_Innapropriate"
//
// The clue is, that we can now use one block in which we only include code for "one question"
// However, at the place where we would have entered the actual question/item (prompt),
// we include "QuestionItem[x].quest".
//
// In addition, we tell the computer to present this block (in this case) 13 times.
// And x should be 1 on the first presentation, 2 at the second, then 3 and so on (we add 1 after each presentation).

// ----------
// This tells the computer to repeat the block
// 13 times and count through the list 1, 2, 3, etc.
// One technical detail: such lists always start with 0, so 0 is the first item, 1 the second, etc.
  // For each presentation, this gets replaced with the respective text of the item.
  var x;
  for (x = 0; x < 7; x++) {  
  
      
    // And here we have more or less the same code as for the previous question
    // But instead of presenting the question, we include "QuestItems[x].quest"
    // For each presentation, this gets replaced with the respective text of the item.
    const CueThoughtPresentation = {
      type: jsPsychSurvey,
      button_label_finish: "Next",
      required_question_label: '',
      pages: [
        [
          {
            type: 'likert',
            prompt: CueThoughtItems[x].quest,             //  <-- important difference
            likert_scale_min_label: 'Helt Uenig',
            likert_scale_max_label: 'Helt Enig',
            required: true,
            likert_scale_values: [ {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6}, {value: 7} ]
          }, 
        ]
      ],
  
      // Just like we used this before to remove the long instructions in the output file
      // We can use it here to add some more information.
      data: { stimulus  : 'CueThoughtitems'},
  
      // This adds a small pause of 250 ms between the questions.
      // I think that it makes it easier to see that clicking the
      // button had an effect and a new question appeared.
      post_trial_gap: 250,
  
    };
  
    timeline.push(CueThoughtPresentation);
  };
  

// If we now want to change something in the presentation
// (and there is some more stuff to take care of later)
// then we only do it once in the above code and it will
// affect each presented item.
// It makes sense to have one such block for each questionnaire.
// Technically, we could specify all (whatever, 30-40) questions
// in one list and run through it all at once. But this might get
// a little messy and we might want to have some instructions
// between different questionnaires. Thus, it makes sense to
// one such block for separate part of the study (each questionnaire).

// So, for the next questionnaire, you would copy and paste the
// above block (but this is something for later)
// It requires to change the different variable names to work
// "QuestItems" is already used, so you would have to change this to e.g., "vividnessQuest"
// the sub-names can stay the same (quest, label, etc.)
// "WholeQuestionnaire" is taken, and must be changed
// It is better to use some more meaningfull names anyway,
// like "vividQuestPresentation" and "cueThoughtPresentation" etc.

// [...]

//-----------------------------------------------------------------------------------------------
var ConscInstruksjoner = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <p>De neste spørsmålene vil handle om personlighetstrekk.</p>
  <p>Vennligst indiker hvor mye du er enig eller uenig med følgene utsagn.</p>
  `,
  choices: ['Next'],
  data: { stimulus : 'instructions' }
};
timeline.push(ConscInstruksjoner);
//-------------------------------------------------------------------------------------------------
var ConscItems = [
  {quest: 'Jeg glemmer ofte å legge ting tilbake der de hører hjemme',                          label: 'item01_Glemmer',       reverse: 1, itemNo: 1 },
  {quest: 'Jeg roter til ting',                                                                 label: 'item02_Roter',         reverse: 1, itemNo: 2 },
  {quest: 'Jeg liker orden',                                                                    label: 'item03_LikerOrden',    reverse: 0, itemNo: 3 },  
  {quest: 'Jeg får plikter unnagjort med en gang',                                              label: 'item04_Plikter',       reverse: 0, itemNo: 4 }, 
]

   var x;
   for (x = 0; x < 3; x++) { 
    const ConscPresentation = {
      type: jsPsychSurvey,
      button_label_finish: "Next",
      required_question_label: '',
      pages: [
        [
          {
            type: 'likert',
            prompt: ConscItems[x].quest,            
            likert_scale_min_label: 'Helt Uenig',
            likert_scale_max_label: 'Helt Enig',
            required: true,
            likert_scale_values: [ {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6}, {value: 7} ]
          }, 
        ]
      ],
  
      data: { stimulus  : 'ConscItems'},
      post_trial_gap: 250,
  
    };
  
    timeline.push(ConscPresentation);
  };
  //-----------------------------------------------------------------------------------------------------------------------
  var VividInstruksjoner = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <p>De neste spørsmålene vil handle om hvor detaljert du kan se for deg mulige fremtidige hendelser.</p>
    <p>Vennligst indiker hvor mye du er enig eller uenig med følgene utsagn.</p>
    `,
    choices: ['Next'],
    data: { stimulus : 'instructions' }
  };
  timeline.push(VividInstruksjoner);
  //-------------------------------------------------------------------------------------------------------------------------
  var VividEnTilFire = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <p>For de neste 4 spørsmålene, tenk på et familiemedlem eller en venn som du ofte treffer (men som du ikke er med for øyeblikket).</p>
    <p>Vurder nøye bildet du ser for deg i sinnet ditt.</p>
    `,
    choices: ['Next'],
    data: { stimulus : 'instructions' }
  };
  timeline.push(VividEnTilFire);
  //------------------------------------------------------------------------------------------------------------------------
  var VividItemsOneToFour = [
    {quest: 'Den spesifikke konturen av annsikt, hodet, og kropp',                                label: 'item01_Kontur',         reverse: 0, itemNo: 1 },
    {quest: 'Karakteristisk stilling av hodet, posering av kroppen, og liknende',                 label: 'item02_Karakteristikk', reverse: 0, itemNo: 2 },
    {quest: 'Den presise gangen, steglengde og liknende, ved gange',                              label: 'item03_Gange',          reverse: 0, itemNo: 3 },  
    {quest: 'Fargene i noen kjente klesplagg mye brukt',                                          label: 'item04_Farger',         reverse: 0, itemNo: 4 }, 
  ]
  
  var x;
  for (x = 0; x < 3; x++) { 
    const VividPresentationOneToFour = {
      type: jsPsychSurvey,
      button_label_finish: "Next",
      required_question_label: '',
      pages: [
        [
          {
            type: 'multiple-choice',
            prompt: VividItemsOneToFour[x].quest,            
            options: ['Helt klart og så detaljert som vanlig syn', 'Klart og nokså detaljert', 'Vagt og dempet', 'Ingen bilde I det hele tatt, du bare ‘’vet’’ at du tenker på objektet'], 
            required: true
          }, 
        ]
      ],
      data: { stimulus  : 'Vivid-en-til-fire' },
      post_trial_gap: 250,
    };
  
    timeline.push(VividPresentationOneToFour);
  }



// And finally, here is some code for the end
// to ask demographic questions. It uses the
// same "jsPsychSurvey" components.
// and we use it only once. But there are now
// different questions on one page.
// The first "html" is just some instruction
// The second, "multi-choice" is a choice question
// and the third "text" asks for text entry.

//
// Survey - Demographic Data
// ============================

var demographics = {
    type: jsPsychSurvey,
    button_label_finish: "Next",
    required_question_label: '',
    required_error: 'Please check whether you responded to all questions.',
    pages: [
      [
        {
          type: 'html',
          prompt: 'You have now completed the central part of the experiment.<br> To complete the study, please answer the following questions:',
        },
        {
          type: 'multi-choice',
          prompt: "Gender", 
          name: 'gender', 
          options: ['Female', 'Male', 'Other', 'I would rather not tell.'], 
          required: true
        }, 
        {
          type: 'text',
          prompt: "What year were you born? (use the text box below)", 
          name: 'yearBorn', 
          textbox_columns: 5,
          required: true
        }
      ]
    ],
    data: { stimulus : "demographics" },

    on_finish: function(data) {
    
      // pick out responses from previous trial
      gender = jsPsych.data.getLastTrialData().values()[0].response.gender
      birthYear = jsPsych.data.getLastTrialData().values()[0].response.yearBorn
    }
};
timeline.push(demographics);







// Simple instruction page, to presnet a debriefing
var debriefing = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <h1>Debriefing</h1>
    <p>We asked you about your opinion on the different statements from the Brief Self-Control Scale. The questionnaire is often used to measure "self-control strength" as a stable personality trait. Self-control is the ability to resist acting on temptations. For example, I want chocolate, but I know I should control myself and not eat it. </p>
    <p>An alternative perspective on the self-control questionnaire is that the answers reflect participants' routines (good and bad habits). If that were true, the questionnaire would not be informative about "self-control strength." </p>
    <p>To better understand what the questionnaire measures, we try to understand what people who are not researchers (i.e., people who may also take part in surveys that use such questionnaires) believe the questions are about.</p>
    `,
    choices: ['Next'],
    data: { stimulus : "debriefing" },
};
timeline.push(debriefing);








// Optional, some comments
var comments = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<p>If you have any comments you would like to tell us, please write them in the text box below.</p>',
    html: '<p><input type="text" id="test-resp-box" name="response" size="10" /></p>',
    autofocus: 'test-resp-box',
    data: { stimulus : "openQuest" },

    on_finish: function(data) {

      // add these responses to all lines of data
      jsPsych.data.get().addToAll({ gender:    gender });
      jsPsych.data.get().addToAll({ birthYear: birthYear });
      jsPsych.data.get().addToAll({ id:        unique });

      //save data
      saveData("data_" + dateTime + "_" + unique, jsPsych.data.get().csv());

  },
};
timeline.push(comments);






// And again, just instructions at the end.
var thanks = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p> Thank you for your participation! <br> Click 'End' to return to ....</p>",
    choices: ['End'],
}
timeline.push(thanks)






// Starts the program
jsPsych.run(timeline);
