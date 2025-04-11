var SiteName = document.getElementById("SiteName");
var SiteURL = document.getElementById("SiteURL");
var BookmarkBtn = document.getElementById("addBookmarkBtn");
var bookmarksTable = document.getElementById("bookmarksTable");
var RegexSiteName = /^[A-Z|a-z].+$/;
var RegexSiteURL =
  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
var popup = document.getElementById("popup");
var closeIconEl = document.querySelector(".close-icon");
//#################################################################
var BookmarkList = [];
if (localStorage.getItem("BookmarkList")) {
  BookmarkList = JSON.parse(localStorage.getItem("BookmarkList"));
  ShowBookmarks();
}
//######################################################################
function AddBookmark() {
  if (Validate(RegexSiteName, SiteName) && Validate(RegexSiteURL, SiteURL)) {
    var Bookmark = {
      name: SiteName.value,
      url: SiteURL.value,
    };
    BookmarkList.push(Bookmark);
    localStorage.setItem("BookmarkList", JSON.stringify(BookmarkList));
    ShowBookmarks();
    ResetBookmark();
  } else {
    popup.classList.toggle("d-none");
    overlay.classList.remove("d-none");
    closeIconEl.addEventListener("click", () => {
      popup.classList.add("d-none");
      overlay.classList.add("d-none");
      console.log("close icon clicked");
    });
  }
}

//######################################################################
function ResetBookmark() {
  SiteName.value = "";
  SiteURL.value = "";
}

//######################################################################
function ShowBookmarks() {
  var table = `
        <tr>
        <th>Index</th>
        <th>Site Name</th>
        <th>Visit</th>
        <th>Delete</th>
        </tr>
    `;

  for (var i = 0; i < BookmarkList.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${BookmarkList[i].name}</td>
            <td><a id="visit" href="${
              BookmarkList[i].url
            }" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></td>
            <td><button id="delete" onclick='DeleteBookmark(${i})'><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `;
  }

  bookmarksTable.innerHTML = table;
}

//######################################################################
function DeleteBookmark(index) {
  BookmarkList.splice(index, 1);
  localStorage.setItem("BookmarkList", JSON.stringify(BookmarkList));
  bookmarksTable.deleteRow(index + 1);
  ShowBookmarks();
}

//######################################################################
function Validate(regex, ele) {
  if (regex.test(ele.value)) {
    ele.classList.remove("is-invalid");
    ele.classList.add("is-valid");
    return true;
  } else {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
    return false;
  }
}
