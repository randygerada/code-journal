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
  changeImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  var generatedEntry = createEntry(entry);

  if (data.editing === null) {
    $list.prepend(generatedEntry);
    data.entries.unshift(entry);
    data.nextEntryId++;

  } else {
    $entry.replaceWith(generatedEntry);
  }
  viewEntries();
  $form.reset();
  data.editing = null;
}

function createEntry(entry) {
  var $entry = document.createElement('li');
  var $row = document.createElement('div');
  var $columnOne = document.createElement('div');
  var $img = document.createElement('img');
  var $columnTwo = document.createElement('div');
  var $rowColumn = document.createElement('div');
  var $columnLeft = document.createElement('div');
  var $columnRight = document.createElement('div');
  var $editIcon = document.createElement('i');
  var $title = document.createElement('h2');
  var $notes = document.createElement('p');

  $entry.className = 'entry';
  $row.className = 'row';
  $columnOne.className = 'column-half';
  $img.className = 'empty-photo';
  $img.setAttribute('src', entry.urlPhoto);
  $img.setAttribute('alt', 'entry image');
  $columnTwo.className = 'column-half';
  $rowColumn.className = 'row';
  $columnLeft.className = 'column-half-2';
  $title.className = 'entry-title';
  $title.textContent = entry.title;
  $columnRight.className = 'column-half-2 button-div';
  $editIcon.className = 'fa-solid fa-pencil fa-edit icon-edit';
  $notes.className = 'entry-notes';
  $notes.textContent = entry.notes;

  $entry.appendChild($row);
  $row.appendChild($columnOne);
  $columnOne.appendChild($img);
  $row.appendChild($columnTwo);
  $columnTwo.appendChild($rowColumn);
  $rowColumn.appendChild($columnLeft);
  $columnLeft.appendChild($title);
  $rowColumn.appendChild($columnRight);
  $columnRight.appendChild($editIcon);
  $columnTwo.appendChild($notes);

  $entry.setAttribute('data-entry-id', entry.entryId);
  return $entry;
}

// edit function
function edit(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  swapViewEntry();
  var $entry = event.target.closest('li');
  data.editing = $entry;
  var getObj = matchObj($entry);

  changeTitle.value = getObj.title;
  changeUrl.value = getObj.$photoUrl;
  changeImage.setAttribute('src', getObj.changeUrl);
  changeNotes.value = getObj.notes;
}

// find matching entry object
// loop through through data.entries

function matchObj($entry) {
  var numEntryId = parseInt($entry.getAttribute('data-entry-id'));
  for (var i = 0; i < data.entries.length; i++) {
    if (numEntryId === data.entries[i].entryId) {
      var obj = data.entries[i];
      return obj;
    }
  }
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
}

var $entryForm = document.querySelector('.entry-form');
var $entries = document.querySelector('.entries');
var $list = document.querySelector('.entry-list');
var $nav = document.querySelector('.entries-nav');
var $button = document.querySelector('.button-new');
var $form = document.querySelector('.form');
var changeUrl = document.querySelector('.photo-url');
var changeImage = document.querySelector('.empty-photo');
var changeTitle = document.querySelector('.title-input');
var changeNotes = document.querySelector('.notes-input');

document.addEventListener('DOMContentLoaded', loadContentEntry);
$nav.addEventListener('click', viewEntries);
$button.addEventListener('click', swapViewEntry);
$form.addEventListener('submit', submitForm);
changeUrl.addEventListener('input', updateUrl);

$list.addEventListener('click', edit);

if (data.view === 'entry-form') {
  swapViewEntry();
} else {
  viewEntries();
}
