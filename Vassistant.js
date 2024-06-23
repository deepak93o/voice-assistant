const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();
    var greeting;

    if (hour >= 0 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    return greeting;
}

function makeCall(contact) {
    speak(`Making a call to ${contact}`);
    window.open(`tel:${contact}`);
}

window.addEventListener('load', () => {
    speak("Initializing Assistant...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello') || message.includes('hi') || message.includes('hello sky') || message.includes('hey sky') || message.includes('hi sky')){
        speak("Hello Sir, How May I Help You?");
    } else if(message.includes('tell me about you') || message.includes('who are you')){
        speak("I'm Sky. I am a Voice Assistant created by Deepak");
    } else if(message.includes('how are you')){
        speak("I'm Good what about you");
    } else if(message.includes('i am good too')||message.includes('fine')){
            speak("Good to hear. How may I help you");
    } else if(message.includes('impressive')|| message.includes('nice')){
        speak("Thank you boss");
    } else if (message.includes("good morning") || message.includes("good afternoon") || message.includes("good evening")) {
        const greeting = wishMe();
        speak(`${greeting}! How can I assist you today?`);
    } else if(message.includes('who is the best cricketer')){
        speak("Mahendra Singh Dhoni is the best cricketer");
    } else if(message.includes('i love you')){
        speak("Awwwww, Thank you");
    } else if(message.includes('open my github account')){
        window.open("https://github.com/deepak93o");
        speak("Opening GitHub...");
    } else if(message.includes('what is your name')){
        speak("My name is Sky");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if(message.includes('2 + 2 equal to 5 how')){
        speak("by mistake");
    } else if(message.includes('what i am doing')){
        speak("Talking with me");
    } else if(message.includes('what are you doing')){
        speak("Talking with you");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time') || message.includes('what is time now')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date') || message.includes('what is date today')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes("open calculator")) {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            window.location.href = "calshow://";
            speak("Opening Calculator.");
        } else if (/Android/.test(navigator.userAgent)) {
            window.location.href = "intent://com.android.calculator2/#Intent;scheme=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;end";
            speak("Opening Calculator.");
        } else {
            window.open('Calculator:///', '_blank');
            speak("Opening Calculator.");
        }
    } else if (message.includes('open whatsapp')) {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
            window.open("whatsapp://send?text=Hello");
            speak("Opening WhatsApp...");
        } else {
            window.open("https://web.whatsapp.com", "_blank");
            speak("Opening WhatsApp Web...");
        }
    } else if (message.includes("make a call to")) {
        const contact = message.replace('make a call to', '').trim();
        if (contact) {
            makeCall(contact);
        } else {
            speak("Please provide a contact number.");
        }
    } else if (message.includes('send message to')) {
        let details = message.replace('send message to', '').trim();
        let [contact, ...msgParts] = details.split(' ');
        let msg = msgParts.join(' ');
        window.open(`sms:${contact}?body=${encodeURIComponent(msg)}`);
        speak(`Sending message to ${contact}`);
    } else if (message.includes('open chrome')) {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            window.location.href = "googlechrome://";
            speak("Opening Chrome.");
        } else if (/Android/.test(navigator.userAgent)) {
            window.location.href = "googlechrome://navigate?url=http://www.example.com";
            speak("Opening Chrome.");
        } else {
            window.open('chrome://newtab', '_blank');
            speak("Opening Chrome.");
        }
    } else if (message.includes('open brave')) {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            window.location.href = "brave://";
            speak("Opening Brave.");
        } else if (/Android/.test(navigator.userAgent)) {
            window.location.href = "brave://open-url?url=http://www.example.com";
            speak("Opening Brave.");
        } else {
            window.open("https://brave.com", "_blank");
            speak("Opening Brave.");
        }
    } else if (message.includes('set a timer for')) {
        let timeString = message.replace('set a timer for', '').trim();
        let timeValue = parseFloat(timeString);
        let timerDuration;

        if (timeString.includes('hour') || timeString.includes('hours')) {
            timerDuration = timeValue * 60 * 60 * 1000;
        } else if (timeString.includes('minute') || timeString.includes('minutes')) {
            timerDuration = timeValue * 60 * 1000;
        } else {
            speak("Please specify the time in minutes or hours.");
            return;
        }

        setTimeout(() => {
            speak("Time's up!");
            alert("Time's up!");
        }, timerDuration);

        speak(`Setting a timer for ${timeString}.`);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}
