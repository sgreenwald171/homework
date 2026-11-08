Object.assign(document.body.style, {
  margin: '0',
  boxSizing: 'border-box',
  backgroundColor: 'pink',
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: '1fr 3fr 1fr',
  gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
  placeItems: 'center'
});

const features = document.querySelectorAll('img:not(#MrPotatoHead)');
let offset;
let dragee;
let zIndex = 1;

features.forEach((el, index) => {
  el.id = `part-${index}`;
  const col = index < 4 ? 1 : 3;
  const row = (index % 5) + 2;
  el.style.gridArea = `${row} / ${col}`;

  el.addEventListener('mousedown', e => {
    e.preventDefault();
    dragee = el;

    const rect = dragee.getBoundingClientRect();
    dragee.style.top = `${rect.top + window.scrollY}px`;
    dragee.style.left = `${rect.left + window.scrollX}px`;
    el.style.position = 'absolute';
    el.style.zIndex = ++zIndex;
    offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  });
});

const loadedPeices = JSON.parse(localStorage.getItem('peices')) ?? [];
loadedPeices.forEach(peice => {
  const el = document.getElementById(peice.id);
  el.style.position = 'absolute';
  el.style.top = peice.top;
  el.style.left = peice.left;
  el.style.zIndex = peice.zIndex;
  if (peice.zIndex > zIndex) zIndex = peice.zIndex;

});



function handleMouseMove(e) {
  dragee.style.top = `${e.clientY + window.scrollY - offset.y}px`;
  dragee.style.left = `${e.clientX + window.scrollX- offset.x}px`;
}
 
function handleMouseUp(e) {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);
  
}

window.addEventListener('pagehide', () => {
  const peices = [];
  features.forEach(el => {
    if (el.style.position === 'absolute') {
      peices.push({
        id: el.id,
        top: el.style.top,
        left: el.style.left,
        zIndex: parseInt(el.style.zIndex) || 1
      });
    }
  });
  localStorage.setItem('peices', JSON.stringify(peices));
});