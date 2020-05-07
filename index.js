window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

const icon = document.querySelector('i.fa.fa-microphone')
let paragraph = document.createElement('p');
let container = document.querySelector('.text-box');
container.appendChild(paragraph);
const sound = document.querySelector('.sound');

icon.addEventListener('click', () => {
  sound.play();
  dictate();
});

const dictate = () => {
  recognition.start();
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    
    paragraph.textContent = speechToText;

    if (event.results[0].isFinal) {

      if (speechToText.includes('what is the time')) {
          speak(getTime);
      };
      
      if (speechToText.includes('what is the date')) {
          speak(getDate);
      };
      
      if (speechToText.includes('what is the weather in')) {
          getTheWeather(speechToText);
      };
	   if (speechToText.includes('what is your name')||speechToText.includes('who are you')) {
          speak(tellname);};
		if(speechToText.includes('Jai Hind doston')){
		speak(bhoa);};
		if(speechToText.includes('how are you')){
		speak(howareyou);};
		if(speechToText.includes('which is your favourite movie')|| speechToText.includes('your favourite movie')){
		speak(movie);};
		if(speechToText.includes('who is your favourite actor')){
		speak(actor);};
		if(speechToText.includes('where are you from')){
		speak(addr);};
		if(speechToText.includes('what are your hobbies')||speechToText.includes('your hobbies')){
		speak(hobb);};
		if(speechToText.includes('which is your mother tongue')||speechToText.includes('your mother tongue')){
		speak(moth);};
		if(speechToText.includes('what is your height')||speechToText.includes('your height')){
		speak(hei);};
		if(speechToText.includes('which is your favourite book')||speechToText.includes('your favourite book')){
		speak(book);};
		if(speechToText.includes('which is your favourite song')||speechToText.includes('your favourite song')){
		speak(song);};
		if(speechToText.includes('hi')||speechToText.includes('hello')){
		speak(hi);};
		if(speechToText.includes('who is Royal')){
		speak(royal);};
		if(speechToText.includes('who is Samyuktha')){
		speak(sam);};
		if(speechToText.includes('who is your favourite actress')){
		speak(actress);};
		
		
    }
  }
}
const actress= () =>{
	return 'No body. Actress dont know acting, they only know overacting';};
const sam= () =>{
	return 'Samyuktha is the mentor of sophists. She currently works in Dell in Banglore';};
const royal= () =>{
	return 'Royal is the mentor of sophists. He currently works in Canada';};
const hi= () =>{
 return 'Hello';};
const song= () =>{
 return 'Well! It keeps changing by time. Currently my favorite is Bekhayali. Le me sing it for you. Bekhayali mein bhi tera, he khayal aaye. Kyun bichadna hai zaroori, Ye sawaal aaye. Teri nazdeekiyon ki khushi, behi saab thiHissmein faasley bhi tere, bemisaal aaye.Main jo tum se door hoon Kyun door main rahoon Tera guroor hoon.Aa tu faasla mita, Tu khawabsa mila Kyun khwaab toddoon.Oo.Oo.Oo.Oo.';};
const book= () =>{
 return 'My favorite book is Three Thousand Stitches by Sudhamurthy';};
const hei= () =>{
 return 'My height is 5 feet 6 inches that is 168 centimeter';};
const moth= () =>{
	return 'My Mother tounge is Konkani and I am proud of it.';};
const hobb= () =>{
	return 'My hobbies are Reading books, Listening to Music, Workout etc.';};
const addr= () =>{
	return 'I am from India. My home town is Monkey in honnavar of Uttar Kannada district from Karnataka. I am currently in belgaum for engineering';};
const actor= () =>{
	return 'Allu Arjun, Shahrukh Khan and Salman Khan';};
const movie= () =>{
	return 'Tiger Zinda Hain';};
const howareyou= () =>{
	return 'I am good,Thankyou';};
const bhoa= () => {
	return 'Nikal Love day';
};
const speak = (action) => {
  utterThis = new SpeechSynthesisUtterance(action());
  synth.speak(utterThis);
};

const getTime = () => {
  const time = new Date(Date.now());
  return `attha time ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
};

const getDate = () => {
  const time = new Date(Date.now())
  return `today is ${time.toLocaleDateString()}`;
};
const tellname= () => {
	return 'My name is Kapil';
};

const getTheWeather = (speech) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[5]}&appid=58b6f7c78582bffab3936dac99c31b25&units=metric`) 
  .then(function(response){
    return response.json();
  })
  .then(function(weather){
    if (weather.cod === '404') {
      utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
      synth.speak(utterThis);
      return;
    }
    utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
    synth.speak(utterThis);
  });
};