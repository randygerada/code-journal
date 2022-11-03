/* global data */
/* exported data */

function updateUrl(event) {
  var $photoUrl = event.target.value;
  changeImage.setAttribute('src', $photoUrl);
}

function submitForm(event) {
  event.preventDefault();
  var entry = {
    title: $form.elements.title.value,
    urlPhoto: $form.elements.urlPhoto.value,
    notes: $form.elements.notes.value
  };

  entry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(entry);
  changeImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  var generatedEntry = createEntry(entry);
  $list.prepend(generatedEntry);
  viewEntries();
  $form.reset();

}

function createEntry(entry) {
  var $entry = document.createElement('li');
  var $row = document.createElement('div');
  var $columnOne = document.createElement('div');
  var $img = document.createElement('img');
  var $columnTwo = document.createElement('div');
  var $title = document.createElement('h2');
  var $notes = document.createElement('p');

  $entry.className = 'entry';
  $row.className = 'row';
  $columnOne.className = 'column-half';
  $img.className = 'empty-photo';
  $img.setAttribute('src', entry.urlPhoto);
  $img.setAttribute('alt', 'entry image');
  $columnTwo.className = 'column-half';
  $title.className = 'entry-title';
  $title.textContent = entry.title;
  $notes.className = 'entry-notes';
  $notes.textContent = entry.notes;

  $entry.appendChild($row);
  $row.appendChild($columnOne);
  $columnOne.appendChild($img);
  $row.appendChild($columnTwo);
  $columnTwo.appendChild($title);
  $columnTwo.appendChild($notes);

  return $entry;
}

function DOMContentLoaded(event) {
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

document.addEventListener('DOMContentLoaded', DOMContentLoaded);
$nav.addEventListener('click', viewEntries);
$button.addEventListener('click', swapViewEntry);
$form.addEventListener('submit', submitForm);
changeUrl.addEventListener('input', updateUrl);

if (data.view === 'entry-form') {
  swapViewEntry();
} else {
  viewEntries();
}
