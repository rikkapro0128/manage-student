// Handle hide user profile if user click different area
import { eraseCookie } from "./handle-token.js";
export function handleButton() {
  $(document).click(function (event) {
    //Hide the menus if visible
    if (
      $(event.target).closest(".manager ._user").length &&
      !$(".manager ._user").hasClass("show")
    ) {
      $(".manager ._user .--dropdown").show();
      $(".manager ._user").addClass("show");
    } else {
      $(".manager ._user .--dropdown").hide();
      $(".manager ._user").removeClass("show");
    }
    if ($(event.target).closest(".--dropdown").length) {
      $(".manager ._user .--dropdown").show();
    }
  });
  $(".logout").click(function (event) {
    event.preventDefault();
    eraseCookie("Authorization");
    location.replace(location.origin + `/home`);
  });

  $("#accept-make-author").click(function (event) {
    const data = { changeUser: "author" };
    fetch("http://localhost:19436/private/accept-make-author", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.isSucess) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Bạn đăng ký thành công rồi đoá!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  $("#add-story").click(function () {
    location.href = "http://localhost:19436/private/upload-story/add";
  });

  const nameStory = $('.info.name_story[name="nameStory"]');
  const nameAuthor = $('.info.name_author[name="nameAuthor"]');
  const typeStory = $('.type_story[name="typeStory"]');
  const nodeLists = $('.custom-control-input[name="categories[]"]');
  const categories = Array.from(nodeLists);
  const deleteStory = Array.from($('#delete_story.delete'));
  // const fileField = $('.cover_image[type="file"]');
  const fileField = document.querySelector('.cover_image[type="file"]');
  const addStory = {
    nameStory: "",
    nameAuthor: "",
    typeStory: "storyTranslate",
    categories: [],
  };
  // console.log({nameStory, nameAuthor})
  nameStory.keyup(function (event) {
    addStory.nameStory = $(this).val();
  });
  nameAuthor.keyup(function (event) {
    addStory.nameAuthor = $(this).val();
  });
  typeStory.change(function (event) {
    addStory.typeStory = $(this).val();
  });
  categories.forEach((element) => {
    $(element).change(function (event) {
      if ($(this).prop("checked")) {
        addStory.categories.push($(this).next().text());
      } else {
        addStory.categories = addStory.categories.filter(
          (value) => value !== $(this).next().text()
        );
      }
    });
  });
  // fileField.addEventListener('change', function (event) {
  //   formData.append('coverImage', fileField.files[0]);
  // });
  $("#create_story").click(function () {
    fetch("http://localhost:19436/private/upload-story/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addStory),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.isSucess) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Tạo thành công rồi bạn ơi!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  });

  deleteStory.forEach((element) => {
    $(element).click(function() {
      console.log('click')
      fetch("http://localhost:19436/private/upload-story/delete?_method=DELETE", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({deleteStory: $(this).parent('ul').attr('id_story')}),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSucess) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Xóa thành công rồi bạn ơi!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    })
  })
}
