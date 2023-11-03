const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function hackingEffect(element, newText) {
  let iteration = 0;
  const originalText = element.innerText;

  const interval = setInterval(() => {
    element.innerText = originalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return newText[index];
        }
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration >= newText.length) {
      clearInterval(interval);
      element.innerText = newText; // Fix for unfinished text bug
    }

    iteration += 1;
  }, 20); // Make the hacking effect a bit faster (adjust the interval time as needed)
}

// Load the JSON data
fetch('texts.json')
  .then(response => response.json())
  .then(data => {
    let currentIndex = 1; // Start with the second set

    // Function to change text with the next set from the JSON data using hacking effect
    function changeTextInOrder() {
      const textSet = data[currentIndex];

      hackingEffect(document.getElementById("title1"), textSet.title1);
      hackingEffect(document.getElementById("title2"), textSet.title2);
      hackingEffect(document.getElementById("description"), textSet.description);

      currentIndex = (currentIndex + 1) % data.length;
    }

    // Change the text to the next set from the JSON data every ten seconds with the hacking effect
    setInterval(changeTextInOrder, 10000); // 10 seconds in milliseconds
  });
