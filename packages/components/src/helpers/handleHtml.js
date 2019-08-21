const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
const { decode } = entities;

function handleNewlines(text) {
  text = text.replace(/<br>/g, "\n");
  text = text.replace(/<div>/g, "\n");
  text = text.replace(/```<\/?div>(.*?)<\/?div>```/g, "```\n$1\n```");
  text = text.replace(/<\/?div>/g, "");
  return text.replace(/\n\n\n+/g, "\n\n");
}

export default function handleHtml(html) {
  return handleNewlines(decode(html));
}
