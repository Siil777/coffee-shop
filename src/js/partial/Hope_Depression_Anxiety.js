// let questions = [];
// let currQuestion = 0;
// let totalQuestions = 20;

// async function fetchAndLoadData() {
//     try {
//         const pathToJson = '/typo3conf/ext/cubix_site/Resources/Public/js/json/';
//         const mapping = {
//             hp: 'Hopelessness_Test_Questions.json',
//             di: 'Depression_Test_Questions.json',
//             a: 'Anxiety_Test_Questions.json',
//         };

//         const elementContainer = document.getElementById('test-container');

//         if (!elementContainer.dataset.testName) {
//             return;
//         }

//         let urlToJson = pathToJson + mapping[elementContainer.dataset.testName];
//         let response = await fetch(urlToJson);

//         if (response.ok === false) {
//             return;
//         }

//         const data = await response.json();
//         totalQuestions = Object.keys(data).length;
//         questions = Object.values(data);
//         totalQuestions = questions.length;

//         if (elementContainer.dataset.testName === 'hp') {
//             loadQuestion();
//         }

//         if (elementContainer.dataset.testName === 'di') {
//             DepressionTest();
//         }

//         if (elementContainer.dataset.testName === 'a') {
//             AnxietyHtmlElements();
//         }
//     }
//     catch
//         (error)
//         {
//             console.error(error);
//             document.getElementById("ques").innerHTML = `<h5 style='color: red'>Error fetching questions</h5>`;
//             document.getElementById("quesDepression").innerHTML = `<h5>Нет вопросов</h5>`;
//             document.getElementById("quesAnxiety").innerHTML = `<h5>Нет вопросов</h5>`;
//         }
//     }

// function loadQuestion() {
//     const questionContainer = document.getElementById("test-container");
//     questionContainer.innerHTML = '';
//     const currentQuestion = questions[currQuestion];
//     //depression
//     if (!currentQuestion) {
//         document.getElementById("ques").innerHTML = `<h5>Вопросов нет</h5>`;
//         return;
//     }
//     const questionDiv = document.createElement("div");
//     questionDiv.classList.add("col-md-9","offset-md-3", "hp-question-row");
//     questionDiv.id = `question_for_hopelessnessScale${currQuestion + 1}`;
//     const questionPositionDiv = document.createElement("div");
//     questionPositionDiv.classList.add("HopelessnessScale_quest_position");
//     const questionNumberDiv = document.createElement("div");
//     questionNumberDiv.classList.add("hp-style-num");
//     questionNumberDiv.textContent = currQuestion + 1;
//     const questionTextDiv = document.createElement("div");
//     questionTextDiv.classList.add("frameForQuestionHopelessnessScale");
//     questionTextDiv.textContent = currentQuestion.question.text;
//     questionPositionDiv.appendChild(questionNumberDiv);
//     questionPositionDiv.appendChild(questionTextDiv);
//     questionDiv.appendChild(questionPositionDiv);
//     const answerTypes = currentQuestion.answer.answer_types;
//     for (const [type, text] of Object.entries(answerTypes)) {
//         const formCheckDiv = document.createElement("div");
//         formCheckDiv.classList.add("form_check");
//         const radioButton = document.createElement("div");
//         radioButton.classList.add("custom-radio");
//         radioButton.value = type;
//         radioButton.setAttribute("data-correct", (text.trim() === "Верно") ? "1" : "0");
//         const savedState = localStorage.getItem(`response${currQuestion + 1}`);
//         if (savedState === type) { // Check against type instead of id
//             radioButton.classList.add('checked');
//         }
//         radioButton.for = `${type}Radio${currQuestion + 1}`;
//         radioButton.textContent = text;
//         formCheckDiv.appendChild(radioButton);
//         questionDiv.appendChild(formCheckDiv);
//     }
//     questionContainer.appendChild(questionDiv);
//     questionDiv.addEventListener('click', function (event) {
//         const radioButon = event.target;
//         if (radioButon.classList.contains('custom-radio')) {
//             const radioButtons = document.querySelectorAll('.custom-radio');
//             radioButtons.forEach(radio => {
//                 radio.classList.remove('active');
//             });
//             radioButon.classList.toggle('active');
//             const stateToSave = radioButon.id;
//             localStorage.setItem(`response${currQuestion + 1}`, stateToSave);
//             updateCircleColorHopeless();
//             showNextQuestion();
//             if (questionDiv !==null && currQuestion === questions.length -1){
//                 questionContainer.removeChild(questionDiv);
//             }
//         }
//     });
// }
// function Hope_Depression_Anxiety() {
//     var totalScore = 0;
//     for (var i = 1; i <= totalQuestions; i++) {
//         var storedValue = localStorage.getItem(`response${i}`);
//         if (storedValue !== null) {
//             totalScore += parseInt(storedValue);
//         } else {
//             if (i === totalQuestions) {
//                 totalScore += 0;
//             }
//         }
//     }
//     var hopelessnessLevel = "";
//     if (totalScore >= 0 && totalScore <= 3) {
//         hopelessnessLevel = "Безнадежность не выявлена.";
//     } else if (totalScore >= 4 && totalScore <= 8) {
//         hopelessnessLevel = "Возможно вы смотрите на жизнь скорее пессимистически. Это может " +
//             "быть особенность вашего склада характера. ";
//     } else if (totalScore >= 9 && totalScore <= 14) {
//         hopelessnessLevel = "Ваш взгляд на жизнь более пессимистичен, чем у основной массы людей. Вам может" +
//             " казаться что многое в жизни идет не так, как должно.  Что достичь своей цели очень сложно, " +
//             "а решение проблем требует чрезмерных усилий.  Возможно приемы самопомощи уже не помогают, " +
//             "и следует обратиться к специалисту. ";
//     } else if (totalScore >= 15 && totalScore <= 20) {
//         hopelessnessLevel = "Вам кажется, что все в вашей жизни идет не так, что достичь поставленных" +
//             " целей - невозможно, что ваши проблемы не имеют решения и вы не способны ни в чем " +
//             "преуспеть. Это тревожный симптом. Вам следует обратиться к специалисту.";
//     }
//     var resultParagraph = document.getElementById('result-text');
//     resultParagraph.innerHTML = "<p>Уровень: " + totalScore + "</p>Уровень: " + hopelessnessLevel + "</p>"
//     var submitButton = document.getElementById('submitButton');
//     submitButton.click();
// }
// //Hopelessness
// let reply = [];
// function checkAnswer(callback) {
//     const selectedAnswer = document.querySelector('.custom-radio.active');
//     const valueToStore = selectedAnswer.getAttribute('data-correct');
//     const questionTextElement = findQuestionText(selectedAnswer);
//     const questionText = questionTextElement ? questionTextElement.textContent.trim() : "Unknown";
//     const answerText = selectedAnswer.textContent.trim();
//     console.log(`Проверен ответ на вопрос ${currQuestion + 1}: ${questionText} - ${answerText === 'Верно' ? 'верно' : 'неверно'}`);
//     localStorage.setItem(`response${currQuestion + 1}`, valueToStore);
//     const questionAnswerObject = {
//         "question": questionText,
//         "answer": answerText === 'Верно' ? 'верно' : 'неверно',
//     };
//     reply.push(questionAnswerObject);
//     const questionAnswerJson = JSON.stringify(reply);
//     var resultInput = document.getElementById('result');
//     resultInput.value = questionAnswerJson;
//     callback();
// }
// function findQuestionText(selectedAnswer) {
//     let element = selectedAnswer.parentElement;
//     while (element) {
//         const questionTextElement = element.querySelector('.frameForQuestionHopelessnessScale');
//         if (questionTextElement) {
//             return questionTextElement;
//         }
//         element = element.previousElementSibling;
//     }
//     return null;
// }


// //hopelessness
// function updateQuestionVisibility() {
//     for (let i = 0; i <= totalQuestions; i++) {
//         const questionDiv = document.getElementById(`question_for_hopelessnessScale${i + 1}`);
//         if (questionDiv) {
//             questionDiv.style.display = 'none';
//         }
//     }
//     const currentQuestionDiv = document.getElementById(`question_for_hopelessnessScale${currQuestion + 1}`);
//     if (currentQuestionDiv) {
//         currentQuestionDiv.style.display = 'block';
//     }
// }
// // Hopelessness
// function showNextQuestion() {
//     if (currQuestion < totalQuestions - 1) {
//         //call back executed once if answered checked
//         checkAnswer(() => {
//             currQuestion++;
//             updateQuestionVisibility();
//             loadQuestion();
//         });
//     } else {
//         checkAnswer(() => {
//             Hope_Depression_Anxiety();
//         });
//     }
// }
// function showNextQuestionHopelessnessWithoutCheckAnwer() {
//     if (currQuestion < totalQuestions - 1) {
//             currQuestion++;
//             updateQuestionVisibility();
//             loadQuestion();
//     } else {
//             Hope_Depression_Anxiety();
//     }
// }
// // HopelessNess
// function showPreviousQuestion() {
//     if (currQuestion > 0) {
//         currQuestion--;
//         updateQuestionVisibility();
//         loadQuestion();
//     }
// }
// //button back HopelessNessTest
// var previousButton = document.getElementById('hp-previousButton');
// if (previousButton !==null){
//     previousButton.addEventListener('click', function () {
//         //HopelessnessScale
//         showPreviousQuestion();
//         updateCircleColorHopeless();
//     });
// }
// //UI for depression
// function DepressionTest() {
//     const questionContainerForDepression = document.getElementById("test-container");
//     questionContainerForDepression.innerHTML='';
//     const passQuestions = questions[currQuestion];
//     if (!passQuestions) {
//         document.getElementById("quesDepression").innerHTML = `<h5>Нет вопросов</h5>`;
//     }
//     const topClasses = document.createElement("div");
//     topClasses.classList.add("di-checkbox-position");
//     topClasses.id = `question_for_DepressionScale${currQuestion + 1}`;
//     const customCheckBox = document.createElement("div");
//     customCheckBox.classList.add("custom-checkbox","offset-md-3","offset-sm-3","offset-lg-3");
//     topClasses.appendChild(customCheckBox);
//     const respondTypes = passQuestions.questions.answers.answers_types;
//     for (let index = 0; index < Object.keys(respondTypes).length; index++) {
//         const type = Object.keys(respondTypes)[index];
//         const text = respondTypes[type];
//         const radio = document.createElement("div");
//         radio.classList.add("checkbox-label", "py-3","col-md-8","col-sm-8","col-lg-8");
//         radio.setAttribute("valid-data", index.toString());
//         const savedState = localStorage.getItem(`question${currQuestion + 1}`);
//         if (savedState === type) {
//             radio.classList.add('active');
//         }
//         radio.htmlFor = `${type}Radio${currQuestion + 1}`;
//         radio.textContent = text;
//         customCheckBox.appendChild(radio);
//     }
//     questionContainerForDepression.appendChild(topClasses);
//     topClasses.addEventListener('click', function (event) {
//         const radioButton = event.target;
//         if (radioButton.classList.contains('checkbox-label')) {
//             const radioButtons = document.querySelectorAll('.checkbox-label');
//             radioButtons.forEach(radio => {
//                 radio.classList.remove('active');
//             });
//             radioButton.classList.toggle('active');
//             const stateToSave = radioButton.id;
//             localStorage.setItem(`question${currQuestion + 1}`, stateToSave);
//             updateCircleColorDi();
//             showNextQuestionForDepression();
//             if (topClasses !==null && currQuestion === questions.length- 1){
//                 questionContainerForDepression.removeChild(topClasses);
//             }
//         }
//     });
// }
// function Depression_scale() {
//     var totalScoreDi = 0;
//     for (var i = 1; i <= totalQuestions; i++) {
//         var answer = localStorage.getItem(`question${i}`);
//         if (answer !== null) {
//             totalScoreDi += parseInt(answer) || 0;
//         }
//     }
//     var depressionLevel = "";
//     if (totalScoreDi >= 0 && totalScoreDi <= 9) {
//         depressionLevel = "Отсутствуют депрессивные симптомы - вы счастливый человек!" +
//             "Легкая депрессия - симптомы сглажены, проявления умеренные. Сохраняются способности к труду, " +
//             "самообслуживанию и функционированию в социуме.   Фон настроения понижен, есть склонность" +
//             " к мрачным мыслям и некоторому пессимизму. Возможно - некоторый упадок сил, критичность к себе и " +
//             "миру. Аппетит, против обычного, снижен. \n" +
//             "Рекомендуется терапия. ";
//     } else if (totalScoreDi >= 10 && totalScoreDi <= 15) {
//         depressionLevel = "Легкая депрессия - симптомы сглажены, проявления умеренные. Сохраняются способности " +
//             "к труду, самообслуживанию и функционированию в социуме.   Фон настроения понижен, есть склонность " +
//             "к мрачным мыслям и некоторому пессимизму. Возможно - некоторый упадок сил, критичность к себе и миру." +
//             " Аппетит, против обычного, снижен.  Рекомендуется терапия.";
//     } else if (totalScoreDi >= 16 && totalScoreDi <= 19) {
//         depressionLevel = "Умеренная депрессия - пропадает интерес к жизни. Настроение часто и резко меняется. " +
//             "Снижена концентрация внимания, эмоциональность речи, самооценка. Нарушен привычный ритм питания. " +
//             "Возможны как приступы заедания, так и отказ от еды. Сон так же нарушен, быстрая утомляемость, " +
//             "нежелание вставать с кровати. Либидо снижено. Рекомендуется обратиться к специалисту.";
//     } else if (totalScoreDi >= 20 && totalScoreDi <= 29) {
//         depressionLevel = "Выраженная депрессия - повышенная утомляемость. Сниженная физическая активность, отказ от " +
//             "спорта.  Ощутимые изменения в аппетите.  Концентрация внимания снижена. Трудно принимать " +
//             "самостоятельные решения. В плане видения будущего преобладает пессимизм. Хочется укрыться от окружающих. " +
//             "Возникает тяга к употреблению алкоголя или наркотиков, при этом интереса у развлечениям нет. Ощущение" +
//             "отчаяния, внутреннего напряжения, тревоги. Возможно физиологические проявления, болезненные ощущения. " +
//             "Повышена раздражительность.  Настоятельно рекомендуется обратиться к психиатору. ";
//     } else if (totalScoreDi >= 30 && totalScoreDi <= 63) {
//         depressionLevel = "Тяжелая депрессия - тоскливое состояние, интерес к жизни отсутствует. Сил нет даже на то, " +
//             "чтобы утром почистить зубы.  Слезливое настроение. Упадок сил, заторможенность движений, реакций." +
//             " Невозможность получать удовольствие от жизни. Либидо фактически отсутствует. \"Черные очки\" - " +
//             "все хорошее не запоминается, не замечается, плохое - выпячивается, заполняет собой пространство." +
//             " Мысли о суициде. Возможны бредовые состояния, болезненные ощущения в теле. Заторможенность" +
//             "Настоятельно рекомендуется обратиться к психиатору. Самостоятельный выход из депресси - невозможен.";
//     }
//     var resultParagraphDi = document.getElementById('result-text');
//     resultParagraphDi.innerHTML= "<p>Уровень:" + totalScoreDi + "</p>" + depressionLevel +"</p>";
//     var subButton = document.getElementById('submitButton');
//     subButton.click();
// }
// function findQuestionText1(selectedAnswer) {
//     let element = selectedAnswer.parentElement;
//     while (element) {
//         if (element.classList.contains('di-checkbox-position')) {

//             return element.querySelector('.checkbox-label');
//         }
//         element = element.parentElement;
//     }
//     return null;
// }
// let answers = [];
// function checkAnswerDepression(callback) {
//     const selectedAnswer = document.querySelector('.checkbox-label.active');
//     const valueToStoreDepression = selectedAnswer.getAttribute('valid-data');
//     const answerText=selectedAnswer.textContent.trim();
//     console.log(`Checked Answer for Question ${currQuestion + 1}  ${answerText} - ${valueToStoreDepression}`);
//     localStorage.setItem(`question${currQuestion + 1}`, valueToStoreDepression);
//     const questionAnswerObject ={
//         "question": answerText,
//         "score": valueToStoreDepression,
//     };
//     answers.push(questionAnswerObject);
//     const answersResult = JSON.stringify(answers);
//     // Assign the JSON string to the hidden input field
//     var purposeInput = document.getElementById('result');
//     purposeInput.value = answersResult;
//     callback();
// }
// //depression
// function updateQuestionVisibilityDepression() {
//     for (let i = 0; i <= totalQuestions; i++) {
//         const topClassesHide = document.getElementById(`question_for_DepressionScale${i + 1}`);
//         if (topClassesHide) {
//             topClassesHide.style.display = 'none';
//         }
//     }
//     const passQuestionsDiv = document.getElementById(`question_for_DepressionScale${currQuestion + 1}`);
//     if (passQuestionsDiv) {
//         console.log(`Displaying question ${currQuestion + 1} for Depression Test`);
//         passQuestionsDiv.style.display = 'block';
//     }
// }
// //depression
// function showNextQuestionForDepression() {
//     if (currQuestion < totalQuestions - 1) {
//         checkAnswerDepression(() => {
//             currQuestion++;
//             updateQuestionVisibilityDepression();
//             DepressionTest();
//         });
//     } else {
//         checkAnswerDepression(() => {
//             Depression_scale();
//         });
//     }
// }
// function showNextQuestionForDepressionWithoutCheckAnswer() {
//     if (currQuestion < totalQuestions - 1) {
//         currQuestion++;
//             updateQuestionVisibilityDepression();
//             DepressionTest();
//     } else {
//             Depression_scale();
//     }
// }
// function showLastQuestionForDepression() {
//     if (currQuestion > 0) {
//         currQuestion--;
//         updateQuestionVisibilityDepression();
//         DepressionTest();
//     }
// }
// //Depression Test
// var previousButtonDepression = document.getElementById('di-previousButton');
// if (previousButtonDepression !==null){
//     previousButtonDepression.addEventListener('click', function () {
//         showLastQuestionForDepression();
//         updateCircleColorDi();
//     });
// }
// //Ui for Anxiety
// function AnxietyHtmlElements() {
//     const questionContainerForAnxiety = document.getElementById("test-container");
//     questionContainerForAnxiety.innerHTML='';
//     const slitheringQuestion = questions[currQuestion];
//     if (!slitheringQuestion || !slitheringQuestion.matter || !slitheringQuestion.matter.text) {
//         console.error('Invalid question structure or missing text property.');
//         return;
//     }
//     const upClasses = document.createElement("div");
//     upClasses.classList.add("mb-3", "col-sm-8", "col-md-8", "offset-md-1", "col-lg-8", "offset-lg-1", "a-que-row");
//     upClasses.id = `question_for_AnxietyScale${currQuestion + 1}`;
//     const rowElement = document.createElement("div");
//     rowElement.classList.add("row", "g-0");
//     const colElement = document.createElement("div");
//     colElement.classList.add("col-md-auto", "hidden-number");
//     const numberForAnxiety = document.createElement("div");
//     numberForAnxiety.textContent = currQuestion + 1;
//     numberForAnxiety.classList.add("a-style-numbers");
//     colElement.appendChild(numberForAnxiety);
//     rowElement.appendChild(colElement);
//     upClasses.appendChild(rowElement);
//     const questionTextElement = document.createElement("div");
//     questionTextElement.textContent = slitheringQuestion.matter.text;
//     questionTextElement.classList.add("col-md-10", "col-sm-10", "a-frame-for-question");
//     rowElement.appendChild(questionTextElement);
//     const answeringTypes = slitheringQuestion.answering.answering_types;
//     for (let index = 0; index < Object.keys(answeringTypes).length; index++) {
//         const type = Object.keys(answeringTypes)[index];
//         const text = answeringTypes[type];
//         const answerOption = document.createElement("div");
//         answerOption.classList.add("row", "d-flex", "justify-content-center", "align-items-center");
//         const colElement = document.createElement("div");
//         colElement.classList.add("col-sm-10", "col-md-10", "col-lg-10", "form-check");
//         const inputElement = document.createElement("div");
//         inputElement.classList.add("form-check-label");
//         inputElement.type = "radio";
//         inputElement.value = type;
//         inputElement.name = `answer${currQuestion + 1}${type}`;
//         inputElement.textContent = text;
//         inputElement.setAttribute('correction', index.toString());
//         colElement.appendChild(inputElement);
//         answerOption.appendChild(colElement);
//         upClasses.appendChild(answerOption);


//     }
//     questionContainerForAnxiety.appendChild(upClasses);
//     upClasses.addEventListener('click', function (event) {
//         const clickedElement = event.target;
//         if (clickedElement.classList.contains('form-check-label')) {
//             const formCheckLabels = document.querySelectorAll('.form-check-label');
//             formCheckLabels.forEach(radio => {
//                 radio.classList.remove('active');
//             });
//             clickedElement.classList.toggle('active');
//             const stateToSave = clickedElement.id;
//             localStorage.setItem(`answer${currQuestion + 1}`, stateToSave);
//             updateCircleColorAnxiety();
//             showNextQuestionForAnxiety();
//             if (upClasses !==null && currQuestion===questions.length -1){
//                 questionContainerForAnxiety.removeChild(upClasses);
//             }
//         }
//     });
// }
// //Anxiety
// function UpdateQuestionVisibilityForAnxiety() {
//     for (let i = 0; i <= totalQuestions; i++) {
//         const UpClasses = document.getElementById(`question_for_AnxietyScale${i}`);
//         if (UpClasses) {
//             UpClasses.style.display = 'none';
//         }
//     }
//     const LeakQuestion = document.getElementById(`question_for_AnxietyScale${currQuestion + 1}`);
//     if (LeakQuestion) {
//         currQuestion.style.display = 'block';
//     }
// }
// //Anxiety
// function Anxiety_Test() {
//     var total=0;
//     for (var d = 1; d <=totalQuestions; d++) {
//         var response = localStorage.getItem(`answer${d}`);
//         console.log(`Question ${d} - Response: ${response}`);
//         if (response !== null) {
//             total += parseInt(response) || 0;
//             console.log(`Total after question ${d}: ${total}`);
//         }
//     }
//     var AnxietyLevel = "";
//     if (total >= 0 && total <= 21) {
//         AnxietyLevel = "Этот результат свидетельствует о незначительном уровне тревоги. " +
//             "Фактически каждый человек в наше время о чем-то беспокоится.  Могут помочь " +
//             "приемы самопомощи.";
//     } else if (total >= 22 && total<= 35) {
//         AnxietyLevel = "Возможно проявляется раздражительность, склонность обращать внимание на " +
//             "неблагоприятные стороны событий. Дискомфорт и внутреннее напряжение. Настороженность." +
//             " Ощущение некой опасности. Неплохо в такой ситуации обратиться к специалисту. ";
//     } else if (total >= 36) {
//         AnxietyLevel = "Интенсивное чувство тревоги может перерастать в страх. Часто размеры этого страха " +
//             "превосходят реальную угрозу. Может казаться, что впереди катастрофа. Может развиваться " +
//             "тревожное двигательное возбуждение, паника, бесцельные метания.  Настоятельно рекомендуется " +
//             "обратиться к специалисту.";
//     }
//     var paragraphA=document.getElementById('result-text');
//     var productInput = document.getElementById('result');
//     paragraphA.innerHTML = "<p>Уровень: " + total + "</p>Уровень тревоги: " + AnxietyLevel + "</p>";
//     var subAButton = document.getElementById('submitButton');
//     subAButton.click();
// }
// //Anxiety
// let responses= [];
// function checkAnswersAnxiety(callback) {
//     const question=document.querySelector('.a-frame-for-question');
//     const chosenOption = document.querySelector('.form-check-label.active');
//     const getSetDataFromAnxietyUi = chosenOption ? chosenOption.getAttribute('correction') : null;
//     const textAnswer= chosenOption.textContent.trim();
//     const questionDisplay=question.textContent.trim();
//     console.log(`chosen option for answer ${currQuestion + 1} ${questionDisplay} - ${textAnswer} ${getSetDataFromAnxietyUi}`);
//     localStorage.setItem(`answer${currQuestion + 1}`, getSetDataFromAnxietyUi);
//     const questionAnswer={
//         "question": questionDisplay,
//         "answer": textAnswer,
//     };
//     responses.push(questionAnswer);
//     const jsonorarray =JSON.stringify(responses);
//     var productInput = document.getElementById('result');
//     productInput.value = jsonorarray;

//     callback();
// }
// function showNextQuestionForAnxiety() {
//     if (currQuestion < totalQuestions - 1) {
//         checkAnswersAnxiety(() => {
//             currQuestion++;
//             UpdateQuestionVisibilityForAnxiety();
//             AnxietyHtmlElements();
//         });
//     } else {
//         checkAnswersAnxiety(() => {
//             Anxiety_Test();
//         });
//     }
// }
// function showNextQuestionForAnxietyWithoutCheckAnswer() {
//     if (currQuestion < totalQuestions - 1) {
//         currQuestion++;
//             UpdateQuestionVisibilityForAnxiety();
//             AnxietyHtmlElements();
//     } else {
//             Anxiety_Test();
//     }
// }
// function ShowPreviousQuestionAnxiety(){
//     if (currQuestion>0){
//         currQuestion--;
//         UpdateQuestionVisibilityForAnxiety();
//         AnxietyHtmlElements();
//     }
// }
// var previousButtonAnxiety = document.getElementById('a-previousButton');

// if (previousButtonAnxiety !==null){
//     previousButtonAnxiety.addEventListener('click', function () {
//         //depression
//         ShowPreviousQuestionAnxiety();
//         updateCircleColorAnxiety();
//     });
// }

// //Listener For all Tests
// document.addEventListener("DOMContentLoaded", function () {
//     fetchAndLoadData();
//     window.addEventListener('beforeunload', function (event){
//         ClearAnswersFromLocalStorageForAllTestsIfThePageAboutRefreshOrClosed();
//     });
//     document.addEventListener('keydown', function (event) {
//         console.log('Key pressed:', event.key);
//         if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
//             const activeTest = determineActiveTest();
//             if (activeTest) {
//                 switch (activeTest) {
//                     case 'Hopelessness':
//                         handleHopelessnessTest(event);
//                         break;
//                     case 'Depression':
//                         handleDepressionTest(event);
//                         break;
//                     case 'Anxiety':
//                         handleAnxietyTest(event);
//                         break;
//                 }
//             }
//         }
//     });
//     // Define functions for each test
//     function handleHopelessnessTest(event) {
//         if (event.key === 'ArrowRight') {
//             showNextQuestionHopelessnessWithoutCheckAnwer();
//             updateCircleColorHopeless();
//         } else if (event.key === 'ArrowLeft') {
//             showPreviousQuestion();
//             updateCircleColorHopeless();
//         }
//     }

//     function handleDepressionTest(event) {
//         if (event.key === 'ArrowRight') {
//             showNextQuestionForDepressionWithoutCheckAnswer();
//             updateCircleColorDi();
//         } else if (event.key === 'ArrowLeft') {
//             showLastQuestionForDepression();
//             updateCircleColorDi();
//         }
//     }

//     function handleAnxietyTest(event) {
//         if (event.key === 'ArrowRight') {
//             showNextQuestionForAnxietyWithoutCheckAnswer();
//             updateCircleColorAnxiety();
//         } else if (event.key === 'ArrowLeft') {
//             ShowPreviousQuestionAnxiety();
//             updateCircleColorAnxiety();
//         }
//     }
//     function determineActiveTest() {
//         const url = window.location.href;

//         if (url.includes('hp-test.html')) {
//             return 'Hopelessness';
//         } else if (url.includes('di-test.html')) {
//             return 'Depression';
//         } else if (url.includes('a-test.html')) {
//             return 'Anxiety';
//         } else {
//             return 'Hopelessness';
//         }
//     }
// });
// //depression
// let logs = [];
// //57
// function ClearAnswersFromLocalStorageForAllTestsIfThePageAboutRefreshOrClosed() {
//     logs.push("Clearing localStorage data...");
//     for (let a = 1; a <= totalQuestions; a++) {
//         const key = `response${a}`;
//         const valueBefore = localStorage.getItem(key);
//         logs.push(`Before removal - ${key}: ${valueBefore}`);
//         localStorage.removeItem(key);
//     }
//     for (let b = 1; b <= totalQuestions; b++) {
//         const key = `question${b}`;
//         const valueBefore = localStorage.getItem(key);
//         logs.push(`Before removal - ${key}: ${valueBefore}`);
//         localStorage.removeItem(key);
//     }
//     for (let c = 1; c < totalQuestions; c++) {
//         const key = `answer${c}`;
//         const valueBefore = localStorage.getItem(key);
//         logs.push(`Before removal - ${key}: ${valueBefore}`);
//         localStorage.removeItem(key);
//     }
//     logs.push("localStorage data cleared.");
// }

// /*window.addEventListener('beforeunload', function (event) {
//     // Delay the page reload to capture logs
//     event.returnValue = 'Are you sure you want to leave?';
//     setTimeout(() => {
//         console.log(logs);
//     }, 500);
// });*/
// //UI for new bar
// document.addEventListener("DOMContentLoaded", function() {
//     var progressBar = document.getElementById("progress-bar");

//     for (var i = 1; i <= totalQuestions; i++) {
//         var li = document.createElement("li");
//         progressBar.appendChild(li);
//     }
// });

// //new bar
// function updateCircleColorDi() {
//     updateCircleColor('#progress-bar li', currQuestion);
// }

// function updateCircleColorAnxiety() {
//     updateCircleColor('#progress-bar li', currQuestion);
// }

// function updateCircleColorHopeless() {
//     updateCircleColor('#progress-bar li', currQuestion);
// }

// function updateCircleColor(selector) {
//     var circles = document.querySelectorAll(selector);
//     circles.forEach((circle, index) => {
//         if (index <= currQuestion) {
//             circle.classList.add('green-circle');
//         } else {
//             circle.classList.remove('green-circle');
//         }
//     });
// }




// document.addEventListener("DOMContentLoaded", function () {
//     document.addEventListener('click', function(event) {
//         console.log(event.target.dataset.modalId);
//         var modal = document.getElementById(event.target.dataset.modalId);
//         if (modal && modal.classList.contains('modal')) {
//             event.preventDefault();
//             modal.style.display = "block";
//         }
//         if (event.target.classList.contains('btn-close')) {
//             var modal = event.target.closest('.modal');
//             if (modal) {
//                 setTimeout(function (){
//                     modal.style.display = "none";
//                 }, 30);
//             }
//         }
//         var modals = document.querySelectorAll('.modal');
//         modals.forEach(function(modal) {
//             if (event.target === modal) {
//                 modal.style.display = "none";
//             }
//         });
//     });
// });

// var listModalElement = document.getElementsByClassName('modal modal-lg');
// for (let i = 0; i < listModalElement.length; i++) {
//     let femaleSVG = listModalElement[i].getElementsByClassName('svg-female-js')[0];
//     let maleSVG = listModalElement[i].getElementsByClassName('svg-men-js')[0];
//     femaleSVG.addEventListener('click', function (event) {
//         if (femaleSVG){
//             maleSVG.style.display = 'block';
//             femaleSVG.style.display = 'none';
//         }
//     });
//     maleSVG.addEventListener('click', function (event) {
//         if (maleSVG){
//             femaleSVG.style.display = 'block';
//             maleSVG.style.display = 'none';
//         }
//     });
// }
// var listModalClose = document.getElementsByClassName('modal modal-lg');
// for (let j = 0; j < listModalClose.length; j++) {
//         let modals = document.querySelectorAll('.modal');
//         let btnClose = listModalClose[j].getElementsByClassName('btn-close close')[0];
//         let femaleSVG = listModalClose[j].getElementsByClassName('svg-female-js')[0];
//         let maleSVG = listModalClose[j].getElementsByClassName('svg-men-js')[0];
//         btnClose.addEventListener('click', function () {
//             femaleSVG.style.display = 'block';
//             maleSVG.style.display = 'block';
//         });
//     modals.forEach(function(modal) {
//         modal.addEventListener('click', function (event) {
//             if (event.target === modal) {
//                 modal.style.display = 'none';
//                 femaleSVG.style.display = 'block';
//                 maleSVG.style.display = 'block';
//             }
//         });
//     });
// }

document.addEventListener("DOMContentLoaded", function () {
    var elementContainer = document.getElementById("portfolio");
    console.log(elementContainer)


    if(elementContainer) {

         var imgCards = elementContainer.getElementsByClassName('img-card')
         for(let q=0; q<imgCards.length; q++){
               console.log(imgCards[q])
         }

    }
   
   
   
   
   
   
   
   })
