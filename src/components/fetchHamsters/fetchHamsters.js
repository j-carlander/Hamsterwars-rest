export async function fetchHamsters(setHamsters) {
  let response = await fetch("http://127.0.0.1:5000/api/hamster");

  let data = await response.json();
  console.log(data);
  setHamsters(data);
}
