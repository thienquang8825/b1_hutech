const checkResult = (answer) => {
  const element = document.querySelector(`[for='${answer._id}']`)

  if (answer.isCorrect === true) {
    element.style.color = '#73a839'
    element.innerHTML = answer.answer + " <i class='fas fa-check'></i>"
  } else {
    element.style.color = 'red'
    element.innerHTML = answer.answer + " <i class='fas fa-times'></i>"
  }
}

export default checkResult
