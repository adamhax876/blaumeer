export let tours = [];

export async function loadTours() {
  try {
    const res = await fetch('/api/tours');
    if (res.ok) {
      tours = await res.json();
    } else {
      console.error('Failed to load tours', await res.text());
    }
  } catch(err) {
    console.error('Failed to load tours from API', err);
  }
}
