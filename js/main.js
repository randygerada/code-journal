/* global data */

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
  var generatedEntry = developNewEntry(entry);
  $list.prepend(generatedEntry);
  $form.reset();

}

/*****
 ****  <li>
 *         <div class="row">
 *           <div class="column-half">
 *             <img class="entry-image empty-photo" src="images/placeholder-image-square.jpg">
 *           </div>
 *           <div class="column-half">
 *             <h2 class="entry-title">Title</h2>
 *             <p class="entry-notes">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, ipsam?</p>
 *           </div>
 *         </div>
 */

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
  $columnTwo.className = 'colunm-half';
  $row.appendChild($columnTwo);

  var $title = document.createElement('h2');
  $title.className = 'entry-title';
  $title.textContent = entry.title;
  $columnTwo.appendChild($title);

  var $notes = document.createElement('p');
  $notes.className = 'entry-notes';
  $notes.textContent = entry.notes;
  $columnTwo.appendChild($notes);

  return $entry;
}

function DOMContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var generatedEntry = createEntry(data.entries[i]);
    $list.append(generatedEntry);
  }
}

function developNewEntry(event) {
  $entryForm.className = 'container entry-form';
  $entries.className = 'container entries hidden';
  data.view = 'entry-form';
}

function viewEntries(event) {
  $entryForm.className = 'container entry-form hidden';
  $entries.className = 'container entries';
  data.view = 'entry-form';
}

var $entryForm = document.querySelector('.entry-form');
var $entries = document.querySelector('.entries');

var $list = document.querySelector('.entry-list');
document.addEventListener('DOMContentLoaded', DOMContentLoaded);

var $nav = document.querySelector('.entries-nav');
$nav.addEventListener('click', viewEntries);

var newButton = document.querySelector('.btn-new');
newButton.addEventListener('click', developNewEntry);

var $form = document.querySelector('.form');
$form.addEventListener('submit', submitForm);

var changeUrl = document.querySelector('.photo-url');
var changeImage = document.querySelector('.empty-photo');

changeUrl.addEventListener('input', updateUrl);

if (data.view === 'entry-form') {
  developNewEntry();
} else {
  viewEntries();
}
