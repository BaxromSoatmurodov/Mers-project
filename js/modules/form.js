function form(modalSelector) {
  // Form
  const forms = document.querySelectorAll("form");
  forms.forEach((item) => {
    bindPostData(item);
  });
  const Massage = {
    loading: "img/form/spinner.svg",
    success: "success",
    failure: "error",
  };
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
    return await res.json();
  };
  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formMassage = document.createElement("img");
      formMassage.src = Massage.loading;
      formMassage.style.cssText = `
      display:block;
      margin:0 auto`;
      form.insertAdjacentElement("afterend", formMassage);
      // const request = new XMLHttpRequest();
      // request.open("POST", "server1.php");
      // request.setRequestHeader("Content-type", "application/json");
      const formData = new FormData(form);
      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // const json = JSON.stringify(object);

      // fetch("server1.php", {
      //   method: "POST",
      // headers: {
      //   "Content-type": "application/json",
      // },
      //   body: formData,
      // })
      // .then((data) => {
      //   return data.text();
      // })
      postData("http://localhost:3000/request", json)
        .then((data) => {
          console.log(data);
          showThinksModal(Massage.success);
          formMassage.remove();
        })
        .catch(() => {
          showThinksModal(Massage.failure);
        })
        .finally(() => {
          form.reset();
        });

      // request.send(json);
      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThinksModal(Massage.success);
      //     form.reset();
      //     formMassage.remove();
      //   } else {
      //     showThinksModal(Massage.failure);
      //   }
      // });
    });
  }
  function showThinksModal(Massage) {
    const prevdialogModal = document.querySelector(".modal__dialog");

    prevdialogModal.classList.add("hide");
    openModal(modalSelector);

    const ThinksModal = document.createElement("div");
    ThinksModal.classList.add("modal__dialog");
    ThinksModal.innerHTML = `
    <div class="modal__content">  
      <div class="modal__close" data-close>x</div>
      <div class="modal__title">${Massage}</div>
    </div>`;
    document.querySelector(".modal").append(ThinksModal);
    setTimeout(() => {
      ThinksModal.remove();
      prevdialogModal.classList.add("show");
      prevdialogModal.classList.remove("hide");
      closeModal(modalSelector);
    }, 4000);
  }
}
export default form;
import { openModal, closeModal } from "./modals";
