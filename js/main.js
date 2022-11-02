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
