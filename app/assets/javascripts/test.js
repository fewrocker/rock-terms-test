window.addEventListener("DOMContentLoaded", () => {

  platformId = document.getElementById("platform_id").innerText.toString()

  async function checkTerms() {
    const response = await axios.post("https://fafb2b8c.ngrok.io/v1/terms/check", { "platform_id": platformId })
    if (!response.data.check && response.data.term) {
      const term = response.data.term
      showModal(term);
    }
  }

  async function buildAcceptEndpoint() {
    const response = await axios.post("https://fafb2b8c.ngrok.io/v1/terms/accept", { "platform_id": platformId })
    if (response.data.success) {
      console.log("deu bom")
      modal.classList.remove("is-visible")
    } else {
      console.log("deu ruim")
    }
  }

  function enableAccept() {
    acceptEnabled = true
    button = modal.getElementsByClassName("modal-accept")[0]
    button.onclick = buildAcceptEndpoint
    button.classList.remove("modal-accept-disabled")
  }

  function showModal(term) {
    modal.getElementsByClassName("modal-text")[0].innerHTML = term.modal_text
    modal.getElementsByClassName("modal-file")[0].href = term.file_path
    modal.getElementsByClassName("modal-file")[0].onclick = enableAccept
    modal.classList.add("is-visible")
  }

  function buildModal() {
    const modal = document.createElement("div")
    modal.innerHTML = '<div class="modal" id="modal1" class="is-visible" data-animation="slideInOutLeft"> <div class="modal-dialog"> <header class="modal-header"> <p>Novos termos de serviço</p> <button class="close-modal" aria-label="close modal" data-close> ✕ </button> </header> <section class="modal-content"> <p class="modal-text"></p> </section> <footer class="modal-footer"> <div class="modal-footer-div"> <a class="modal-file modal-btn" href="" target="_blank"> Ver termos </a> <p class="modal-accept modal-accept-disabled modal-btn"> Aceitar termos </p> </div> </footer> </div> </div>'
    return modal
  }

  const modalElement = buildModal()
  document.body.appendChild(modalElement);
  const modal = document.getElementById("modal1")

  checkTerms();
})
