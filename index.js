(function () {
  // write your code here
  const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
  const INDEX_URL = BASE_URL + '/api/v1/users/'
  const data = []
  //index.api
  axios.get(INDEX_URL).then((response) => {
    console.log(response)
    data.push(...response.data.results)
    displayDataList(data)
  }).catch((err) => console.log(err))
  const dataPanel = document.getElementById('data-panel')
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-user')) {
      showuser(event.target.dataset.id)
    }
  })
  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      let cName = ''
      if (item.gender == 'male') {
        cName = 'user-male'
      } else {
        cName = 'user-female'
      }
      htmlContent += `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card mb-2 ${cName}">
            <a href="javascript:;" data-toggle="modal" data-target="#show-user-modal">
            <img class="card-img-top btn-show-user" data-id="${item.id}" src="${item.avatar}" alt="Card image cap">
            </a>
              <div class="card-body user-item-body">
                <h6 class="card-title">${item.name} ${item.surname}</h6>
                <em>Age ${item.age}</em>
              </div>
            </div>
          </div>
        `
    })
    dataPanel.innerHTML = htmlContent
  }
  function showuser(id) {
    const modalName = document.getElementById('show-user-name')
    const modalImage = document.getElementById('show-user-image')
    const modalGender = document.getElementById('show-user-gender')
    const modalAge = document.getElementById('show-user-age')
    const modalRegion = document.getElementById('show-user-region')
    const modalBirthday = document.getElementById('show-user-birthday')
    const modalEmail = document.getElementById('show-user-email')
    //show api
    const url = INDEX_URL + id
    axios.get(url).then((response) => {
      const data = response.data
      console.log(response)
      modalName.textContent = `${data.name} ${data.surname}`
      modalImage.innerHTML = `<img src="${data.avatar}" class="img-fluid" alt="Responsive image">`
      modalGender.textContent = `Gender：${data.gender}`
      modalAge.textContent = `Age：${data.age}`
      modalRegion.textContent = `Region：${data.region}`
      modalBirthday.textContent = `Birthday：${data.birthday}`
      modalEmail.textContent = `Email：${data.email}`
    }).catch((err) => console.log(err))
  }
  //Get the button:
  topButton = document.getElementById('topBtn');
  topBtn.addEventListener('click', topFunction)

  document.getElementById('goBtn')
  goBtn.addEventListener('click', listFunction)

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () { scrollFunction() }

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topButton.style.display = 'block'
    } else {
      topButton.style.display = 'none'
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  function listFunction() {
    window.scrollTo({
      top: 500,
      behavior: 'smooth'
    });
  }
})()