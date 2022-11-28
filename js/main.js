/* global data */
/* exported data */

function updateUrl(event) {
  var $photoUrl = event.target.value;
  changeImage.setAttribute('src', $photoUrl);
}

function submitForm(event) {
  event.preventDefault();
  if (data.editing === null) {
    var entry = {};
    entry.entryId = data.nextEntryId;
  } else {
    var $entry = data.editing;
    entry = matchObj($entry);
  }

  entry.title = $form.elements.title.value;
  entry.urlPhoto = $form.elements.urlPhoto.value;
  entry.notes = $form.elements.notes.value;

  var generatedEntry = createEntry(entry);

  if (data.editing === null) {
    $list.prepend(generatedEntry);
    data.entries.unshift(entry);
    data.nextEntryId++;

  } else {
    $entry.replaceWith(generatedEntry);
  }
  viewEntries();

}

function createEntry(entry) {
  var $entry = document.createElement('li');
  $entry.className = 'entry';

  var $row = document.createElement('div');
  $row.className = 'row';
  $entry.appendChild($row);

  var $columnOne = document.createElement('div');
  $columnOne.className = 'column-half';
  $row.appendChild($columnOne);

  var $img = document.createElement('img');
  $img.className = 'empty-photo';
  $img.setAttribute('src', entry.urlPhoto);
  $img.setAttribute('alt', 'entry image');
  $columnOne.appendChild($img);

  var $columnTwo = document.createElement('div');
  $columnTwo.className = 'column-half';
  $row.appendChild($columnTwo);

  var $rowColumn = document.createElement('div');
  $rowColumn.className = 'row';
  $columnTwo.appendChild($rowColumn);

  var $columnLeft = document.createElement('div');
  $columnLeft.className = 'column-half-2';
  $rowColumn.appendChild($columnLeft);

  var $columnRight = document.createElement('div');
  $columnRight.className = 'column-half-2 button-div right';
  $rowColumn.appendChild($columnRight);

  var $title = document.createElement('h2');
  $title.className = 'entry-title';
  $title.textContent = entry.title;
  $columnLeft.appendChild($title);

  var $editIcon = document.createElement('i');
  $editIcon.className = 'fa-solid fa-pencil fa-edit icon-edit';
  $columnRight.appendChild($editIcon);

  var $notes = document.createElement('p');
  $notes.className = 'entry-notes';
  $notes.textContent = entry.notes;
  $columnTwo.appendChild($notes);

  $entry.setAttribute('data-entry-id', entry.entryId);
  return $entry;
}

function loadContentEntry(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var generatedEntry = createEntry(data.entries[i]);
    $list.append(generatedEntry);
  }

}

function swapViewEntry(event) {
  $entryForm.className = 'container entry-form';
  $entries.className = 'container entries hidden';
  data.view = 'entry-form';
}

function viewEntries(event) {
  $entryForm.className = 'container entry-form hidden';
  $entries.className = 'container entries';
  data.view = 'entries';

  data.editing = null;
}

function makeAnEntry(event) {
  $form.reset();
  changeImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  swapViewEntry();

}

function edit(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  swapViewEntry();

  var $entry = event.target.closest('li');
  data.editing = $entry;
  var getObj = matchObj($entry);

  changeTitle.value = getObj.title;
  changeUrl.value = getObj.urlPhoto;
  changeImage.setAttribute('src', getObj.urlPhoto);
  changeNotes.value = getObj.notes;
}

function matchObj($entry) {
  var numEntryId = parseInt($entry.getAttribute('data-entry-id'));
  for (var i = 0; i < data.entries.length; i++) {
    if (numEntryId === data.entries[i].entryId.toString()) {
      var obj = data.entries[i];
      return obj;
    }
  }
}

var $entryForm = document.querySelector('.entry-form');
var $entries = document.querySelector('.entries');

var $list = document.querySelector('.entry-list');
document.addEventListener('DOMContentLoaded', loadContentEntry);

var $nav = document.querySelector('.entries-nav');
$nav.addEventListener('click', viewEntries);

var $button = document.querySelector('.button-new');
$button.addEventListener('click', makeAnEntry);

var $form = document.querySelector('.form');
$form.addEventListener('submit', submitForm);

var changeUrl = document.querySelector('.photo-url');
var changeImage = document.querySelector('.empty-photo');
changeUrl.addEventListener('input', updateUrl);

var changeTitle = document.querySelector('.title-input');
var changeNotes = document.querySelector('.notes-input');

$list.addEventListener('click', edit);

if (data.view === 'entry-form') {
  swapViewEntry();
} else {
  viewEntries();
}
