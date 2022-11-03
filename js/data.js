/* exported data */

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

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('code-journal-local-storage', dataJSON);
});

/***
 * <li>
 * <div class="row">
 *   <div class="column-half">
 *     <img class="entry-image empty-photo" src="images/placeholder-image-square.jpg">
 *   </div>
 *   <div class="column-half">
 *     <div class="row">
 *       <div class="column-half-2">
 *         <h2 class="entry-title">Title</h2>
 *       </div>
 *       <div class="column-half-2">
 *         <i class="fas  fa-edit edit-icon"></i>
 *       </div>
 *       <p class="entry-notes">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, ipsam?</p>
 *     </div>
 *   </div>
 * </div>
*/
