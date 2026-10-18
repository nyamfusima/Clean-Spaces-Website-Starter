const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#enquiry-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Clean Spaces website enquiry — ${data.get('project-type') || 'New project'}`);
  const body = encodeURIComponent(
`Hello Clean Spaces,

I'd like to discuss a project.

Name: ${data.get('name')}
Email: ${data.get('email')}
Phone / WhatsApp: ${data.get('phone') || 'Not provided'}
Project type: ${data.get('project-type') || 'Not specified'}

About my space:
${data.get('message') || 'I would like to discuss my ideas.'}

Please get in touch with me.

Thank you.`
  );
  // Replace this address with the client's confirmed business email before launch.
  const email = 'hello@example.com';
  const status = form.querySelector('.form-status');
  status.textContent = 'Your email draft is opening. The demo email address must be replaced before the website goes live.';
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});
