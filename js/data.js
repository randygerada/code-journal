/* exported data */

function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('code-journal-local-storage', dataJSON);
}

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('code-journal-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', beforeUnload);
