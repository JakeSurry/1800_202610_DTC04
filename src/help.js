/**
 * help.js
 * Entry script for the Help / FAQ page (help.html).
 * Renders FAQ cards into three sections: General, Fan, and Organization questions.
 */

import { renderQuestions } from "./components/FaqCards";

// Placeholder FAQ content (to be replaced with real Q&A)
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

/** Render FAQ cards into each accordion section. */
function setup() {
  renderQuestions(dummyQuestions, "general-questions");
  renderQuestions(dummyQuestions, "fan-questions");
  renderQuestions(dummyQuestions, "organization-questions");
}

$(document).ready(function () {
  setup();
});
