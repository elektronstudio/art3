import { marked } from "marked";

export const formatMarkdown = (text = "") =>
  marked(text, {
    breaks: true,
  });
