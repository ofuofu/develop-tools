const showYesNoDialog = (dialog, titleText, message) => {
  const title = document.getElementById('xxxQuestionDialogTitle');
  const msg = document.getElementById('xxxQuestionDialogMsg');
  title.innerHTML = titleText;
  msg.innerHTML = message;
  dialog.showModal(); 
}

const showInfoDialog = (dialog, titleText, message) => {
  const title = document.getElementById('xxxInfoDialogTitle');
  const msg = document.getElementById('xxxInfoDialogMsg');
  title.innerHTML = titleText;
  msg.innerHTML = message;
  dialog.showModal(); 
}

const showCautionDialog = (dialog, titleText, message) => {
  const title = document.getElementById('xxxCautionDialogTitle');
  const msg = document.getElementById('xxxCautionDialogMsg');
  title.innerHTML = titleText;
  msg.innerHTML = message;
  dialog.showModal(); 
}

const showErrorDialog = (dialog, titleText, message) => {
  const title = document.getElementById('xxxErrorDialogTitle');
  const msg = document.getElementById('xxxErrorDialogMsg');
  title.innerHTML = titleText;
  msg.innerHTML = message;
  dialog.showModal(); 
}


//export {showYesNoDialog};
