let synth = window.speechSynthesis;
let voices = [];

const convertSpeakWord = (speakWord) => {
  let convMsg = speakWord.replace('<br/>','');
  convMsg = convMsg.replace('<br />','');
  return convMsg;
}

const createVoiceList = (voiceSelect) => {
  voices = synth.getVoices();
  const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  // 空行を追加 変数名のスコープを明確にするため{}をつけている。
  {
    let option = document.createElement('option');
    option.textContent = '選択してください。';
    option.setAttribute('data-lang', '');
    option.setAttribute('data-name', '');
    voiceSelect.appendChild(option);  
  }

  for(let i = 0; i < voices.length ; i++) {
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

const speakDialogMsg = (speakWord, voiceSelect) => {
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    if (selectedOption === '') {
      console.log('no voice select');
      return;      
    }
    if (synth.speaking) {
        // speaking中は終了する。
        console.log('speechSynthesis.speaking');
        return;
    }
    const speakWordEdit = convertSpeakWord(speakWord);
    if (speakWordEdit !== '') {
      const utterThis = new SpeechSynthesisUtterance(speakWordEdit);
      utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
      }
      utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
      }
      // 選択されたVoiceを設定する。
      for(let i = 0; i < voices.length ; i++) {
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

export { createVoiceList, speakDialogMsg };