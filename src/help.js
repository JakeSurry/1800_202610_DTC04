import { renderQuestions } from "./components/FaqCards";

const dummyQuestions = [
  {
    question: "Question 1",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima veniam animi repellendus. Tempore, veniam, pariatur, id autem laborum ab a eum corporis eaque velit fugit sequi culpa aperiam vel quo!",
  },
  {
    question: "Question 2",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima veniam animi repellendus. Tempore, veniam, pariatur, id autem laborum ab a eum corporis eaque velit fugit sequi culpa aperiam vel quo!",
  },
  {
    question: "Question 3",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima veniam animi repellendus. Tempore, veniam, pariatur, id autem laborum ab a eum corporis eaque velit fugit sequi culpa aperiam vel quo!",
  },
  {
    question: "Question 4",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima veniam animi repellendus. Tempore, veniam, pariatur, id autem laborum ab a eum corporis eaque velit fugit sequi culpa aperiam vel quo!",
  },
];

function setup() {
  renderQuestions(dummyQuestions, "general-questions");
  renderQuestions(dummyQuestions, "fan-questions");
  renderQuestions(dummyQuestions, "organization-questions");
}

$(document).ready(function () {
  setup();
});
