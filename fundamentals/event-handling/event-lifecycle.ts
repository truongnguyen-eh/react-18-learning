const initUI = () => {
  document.body.textContent = 'body';
  document.body.style.margin = '20px';

  // Create div and button
  const div = document.createElement('div');
  div.style.padding = '40px';
  div.style.background = '#f0f0f0';
  div.style.margin = '40px';
  div.textContent = 'div';
  div.addEventListener('click', (e) => {
    alert('Click on div');
    e.stopPropagation();
  }, true)

  const button = document.createElement('button');
  button.textContent = 'button';
  button.style.padding = '10px 20px';
  button.style.margin = '10px';
  button.style.fontSize = '16px';
  button.style.background = '#ffd54f';
  button.addEventListener('click', () => {
    alert('Click on Button');
  })

  div.appendChild(button);
  document.body.appendChild(div);
}

initUI();
