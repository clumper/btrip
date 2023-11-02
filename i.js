const originalImage = document.getElementById('originalImage');
const gifImage = document.getElementById('gifImage');
const resultText = document.querySelector('.result');
const spinButton = document.getElementById('spinButton');
const overlay = document.getElementById('overlay');
let spinning = false;

// Image URLs for the results
const resultImages = {
    'Beer': 'https://i.imgur.com/owHNNiO.jpg',
    'Shot': 'https://i.imgur.com/Z6iNILf.png',
    'Fireball': 'https://i.imgur.com/tKHwkqu.jpg',
    'Sour monkey': 'https://i.imgur.com/ED4GBbO.jpg',
    'Give': 'https://i.imgur.com/Y513UhZ.jpg',
    'Bev of choice': 'https://i.imgur.com/mkSJE7Z.jpg',
    'Oreos n vodka': 'https://i.imgur.com/xHe1EoE.jpg',
    'Jello shots': 'https://i.imgur.com/JzNUWK7.jpg',
    'Zenny/vape/cigar': 'https://i.imgur.com/7qoxnyR.jpg',
    'Water': 'https://i.imgur.com/yGmdZdL.jpg',
};

spinButton.addEventListener('click', () => {
    if (spinning) return;
    spinning = true;

    spinButton.disabled = true;
    resultText.textContent = '';

    originalImage.style.display = 'none';
    gifImage.style.display = 'block';

    // Simulate the wheel spinning for 5-7 seconds
    setTimeout(() => {
        // After 5-7 seconds, switch back to the original image
        originalImage.style.display = 'block';
        gifImage.style.display = 'none';

        const randomAngle = getRandomAngle();
        const item = getSelectedItem(randomAngle);

        // Display the overlay (at 95% black)
        overlay.style.display = 'block';

        // Create a result image element (move to the front of the overlay)
        const resultImage = document.createElement('img');
        resultImage.src = resultImages[item.name];
        resultImage.style.position = 'fixed'; // Fixed positioning
        resultImage.style.top = '50%';
        resultImage.style.left = '50%';
        resultImage.style.transform = 'translate(-50%, -50%)'; // Center the image
        resultImage.style.maxWidth = '80%'; // Limit the image size
        resultImage.style.maxHeight = '80%';
        resultImage.style.zIndex = '10000'; // Move the image to the front
        document.body.appendChild(resultImage);

        setTimeout(() => {
            resultText.textContent = `Result: ${item.name}`;
            spinButton.disabled = false;
            spinning = false;
        }, 1000); // Display the result after 1 second
    }, getRandomDuration()); // Show the GIF for a random duration
});

function getRandomAngle() {
    return Math.floor(Math.random() * 360);
}

function getRandomDuration() {
    // Returns a random duration between 5 and 7 seconds (in milliseconds)
    return Math.floor(Math.random() * 3000) + 5000;
}

function getSelectedItem(angle) {
    const items = [
        { name: 'Beer', percentage: 15 },
        { name: 'Shot', percentage: 15 },
        { name: 'Fireball', percentage: 10 },
        { name: 'Sour monkey', percentage: 10 },
        { name: 'Give', percentage: 10 },
        { name: 'Bev of choice', percentage: 5 },
        { name: 'Oreos n vodka', percentage: 10 },
        { name: 'Jello shots', percentage: 5 },
        { name: 'Zenny/vape/cigar', percentage: 10 },
        { name: 'Water', percentage: 10 },
    ];

    let total = 0;
    for (const item of items) {
        total += item.percentage;
        if (angle < total * 3.6) {
            return item;
        }
    }
}
