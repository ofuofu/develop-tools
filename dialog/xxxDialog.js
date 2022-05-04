/*
    Windows Formっぽいダイアログ JS
    © 2022 Hiromichi Yoneda
*/
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
const initDefaultCancelButton = (dialog) => {
  let defaultCancelButton = dialog.getElementsByClassName('xxxDialogDefaultCancel')[0];
  defaultCancelButton.addEventListener('click',  event => {
    dialog.close();
  });  
}

export { showYesNoDialog, showInfoDialog, showCautionDialog, showErrorDialog, initDefaultCancelButton};

