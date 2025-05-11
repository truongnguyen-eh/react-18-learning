function createRoot(container) {
  container.addEventListener('click', (event) => {
    let el = event.target; // Example: <button>
    let shouldStopPropagation = false;
    
    while (el && el !== container) {
      if (el._handlers?.click) {
        // Create a proxy event with stopPropagation
        const proxyEvent = {
          ...event,
          stopPropagation: () => {
            shouldStopPropagation = true;
          }
        };
        el._handlers.click(proxyEvent);
        if (shouldStopPropagation) break;
      }
      el = el.parentElement; // Or nearestElement?
    }
  });

  return {
    render(element) {
      container.innerHTML = ''; // clear previous content
      container.appendChild(element);
    }
  };
}

function createElement(type, props = {}, ...children) {
  if (typeof type === 'function') {
    // Functional component
    return type({ ...props, children });
  }
  const el = document.createElement(type);

  // Custom handler storage
  const handlers = {};

  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventType = key.slice(2).toLowerCase();
      handlers[eventType] = value;
    } else {
      el.setAttribute(key, value);
    }
  }

  if (Object.keys(handlers).length) {
    el._handlers = handlers;
  }

  for (const child of children) {
    el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }

  return el;
}

function App() {
  function handleParentClick(e) {
    alert('Parent clicked!');
  }

  function handleChildClick(e) {
    e.stopPropagation();
    alert('Child clicked! Propagation stopped!');
  }

  return createElement(
    'div',
    { onClick: handleParentClick, style: 'padding: 20px; border: 2px solid blue;' },
    createElement(
      'button',
      { onClick: handleChildClick, style: 'margin: 10px;' },
      'Click me (stops propagation)'
    ),
    createElement(
      'button',
      { onClick: () => alert('This will trigger parent click too!'), style: 'margin: 10px;' },
      'Click me (propagates)'
    )
  );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(createElement(App));
