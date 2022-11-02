/* global data */

var $form = document.querySelector('.form');
$form.addEventListener('submit', submitForm);

var changeUrl = document.querySelector('.photo-url');
var changeImage = document.querySelector('.empty-photo');

changeUrl.addEventListener('input', updateUrl);

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
  var entryLi = document.createElement('li');
  entryLi.className = 'entry';

  var $row = document.createElement('div');
  $row.className = 'row';
  entryLi.appendChild($row);

  var imgColumnHalf = document.createElement('div');
  imgColumnHalf.className = 'column-half';
  $row.appendChild(imgColumnHalf);

  var $img = document.createElement('img');
  $img.className = 'empty-photo';
  $img.setAttribute('src', entry.urlPhoto);
  $img.setAttribute('alt', 'entry image');
  imgColumnHalf.appendChild($img);

  var textColumnHalf = document.createElement('div');
  textColumnHalf.className = 'colunm-half';
  $row.appendChild(textColumnHalf);

  var $title = document.createElement('h2');
  $title.className = 'entry-title';
  $title.textContent = entry.title;
  textColumnHalf.appendChild($title);

  var $notes = document.createElement('p');
  $notes.className = 'entry-notes';
  $notes.textContent = entry.notes;
  textColumnHalf.appendChild($notes);

  return entryLi;
}

function DOMContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var generatedEntry = createEntry(data.entries[i]);
    $list.append(generatedEntry);
  }
}

var $list = document.querySelector('.entry-list');
document.addEventListener('DOMContentLoaded', DOMContentLoaded);
