const ICON_ROOT = '/icons';

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  const socialLinks = [
    'white-facebook', 'white-twitter', 'white-instagram',
  ];
  // setup image columns
  [...block.children].forEach((row) => {
    row.className = 'writer-lists';
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }

        /* Social Links section */
        const socialIcons = document.createElement('ul');
        socialIcons.className = 'social-links-list';
        socialLinks.forEach(async (icon) => {
          const singleIcon = document.createElement('li');
          const span = document.createElement('span');
          const resp = await fetch(`${window.hlx.codeBasePath}${ICON_ROOT}/${icon}.svg`);
          if (resp.ok) {
            const iconHTML = await resp.text();
            if (iconHTML.match(/<style/i)) {
              const img = document.createElement('img');
              img.src = `data:image/svg+xml,${encodeURIComponent(iconHTML)}`;
              span.appendChild(img);
            } else {
              span.innerHTML = iconHTML;
            }
          }
          singleIcon.append(span);
          socialIcons.append(singleIcon);
        });
        col.append(socialIcons);
      }
    });
  });
}
