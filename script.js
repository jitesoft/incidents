const run = async () => {
  const template = document.querySelector('template#incident');
  const label = document.querySelector('template#label');
  const app = document.querySelector('#app');

  const converter = new showdown.Converter();
  const data = await (await fetch(`${config.baseUri}/${config.repo}/issues?state=all&sort=updated&per_page=${config.pagesize}&page=1&creator=${config.user}`)).json();

  for (const inc of data) {
    if (inc.user.login.toLowerCase() !== config.user.toLowerCase()) {
      continue;
    }

    const incident = document.importNode(template.content, true);

    incident.querySelector('[data-ref="status"]').classList.add(inc.state);
    // This is not the best way to do it, but we need html and we filter the data from the api on user, so for now, it will do.
    incident.querySelector('[data-ref="text"]').innerHTML = converter.makeHtml(inc.body);
    incident.querySelector('[data-ref="status"]').innerText = inc.state;
    incident.querySelector('[data-ref="title"]').innerText = inc.title;
    incident.querySelector('[data-ref="created"]').innerText = 'Opened ' + new Date(inc.created_at).toLocaleString();
    incident.querySelector('[data-ref="updated"]').innerText = 'Updated ' + new Date(inc.updated_at).toLocaleString();

    if (inc.closed_at) {
      incident.querySelector('[data-ref="closed"]').innerText = 'Resolved ' + new Date(inc.closed_at).toLocaleString();
    }

    if (inc.comments !== 0) {
      incident.querySelector('[data-ref="comments"]').innerText = "Comments";
      incident.querySelector('[data-ref="comments"]').href = inc.html_url;
    }

    const labelContainer = incident.querySelector('[data-ref="labels"]');

    for (const lbl of inc.labels.slice(0, 6)) {
      const element = document.createElement('span');
      element.classList.add('label');
      element.style.backgroundColor = `#${lbl.color}`;
      element.style.color = '#' + ((parseInt(lbl.color, 16) & 0x000000) | (~parseInt(lbl.color, 16) & 0xFFFFFF)).toString(16);
      element.innerText = lbl.name;
      labelContainer.appendChild(element);
    }

    app.appendChild(incident);
  }
};
run();

// Light/Dark mode!
const modeButton = document.querySelector('.mode-switcher');

modeButton.addEventListener('click', (self) => {
  const bodyClasses = document.body.classList;
  if (bodyClasses.contains('light')) {
    self.target.innerText = '🌞';
    bodyClasses.remove('light');
    bodyClasses.add('dark');
  } else {
    self.target.innerText = '🌙';
    bodyClasses.remove('dark');
    bodyClasses.add('light');
  }


});
