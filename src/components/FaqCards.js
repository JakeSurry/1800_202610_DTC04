class Question extends HTMLElement {
  set question(value) {
    this._question = value;
    this.render();
  }

  render() {
    const question = this._question;
    if (!question) return;
    this.innerHTML = `
        <div class="bg-neutral-300 rounded-md p-5">
          <h4>${question.question}</h4>
          <p>${question.answer}</p>
        </div>
        `;
  }
}

customElements.define("question-card", Question);

export function renderQuestions(questions, questionsContainerID) {
  const eventsContainer = $(`#${questionsContainerID}`);
  for (let question of questions) {
    const eventCard = document.createElement("question-card");
    eventCard.question = question;
    eventsContainer.append(eventCard);
  }
}
