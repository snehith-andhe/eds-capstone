export default async function decorate(block) {
  const articleLists = block.querySelector("a[href$='.json']");
  if (articleLists) {
    const resp = await fetch(articleLists.href);
    const results = await resp.json();

    results.data.forEach((row) => {
      const articleDiv = document.createElement('div');
      articleDiv.classList.add('article-item');
      const link = document.createElement('a');
      link.href = row.link;
      const img = document.createElement('img');
      img.src = row.image;
      img.alt = row.title;
      const title = document.createElement('h3');
      title.textContent = row.title;
      const paragraph = document.createElement('p');
      paragraph.textContent = row.description;

      link.appendChild(img);
      link.appendChild(title);
      articleDiv.appendChild(link);
      articleDiv.appendChild(paragraph);
      block.appendChild(articleDiv);
      articleLists.replaceWith();
    });
  }
}
