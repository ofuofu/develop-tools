const synth = window.speechSynthesis;

let voices = [];

// 改行をなくす⇒不要(タグに関してはしゃべらなかった。)
/*
const convertSpeakWord = (speakWord) => {
    let speakWordEidt = speakWord.replace('<br/>','');
    speakWordEidt = speakWordEidt.replace('<br />','');
    return speakWordEidt;
}
*/

createVoiceList = (voiceSelect) => {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    if (voices[i].lang === 'ja-JP' ) {
      let option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);  
    }
  }
  voiceSelect.selectedIndex = selectedIndex;
}

const speakDialog = (speakWord, voiceSelect) => {
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    //const speakWordEdit = convertSpeakWord(speakWord);
    if (speakWord !== '') {
    var utterThis = new SpeechSynthesisUtterance(speakWord);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    // 選択されたVoiceを設定する。
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    // pitchの設定しない
    // utterThis.pitch = pitch.value;
    // rateの設定しない
    // utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}
