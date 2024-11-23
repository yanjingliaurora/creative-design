document.getElementById('generateBtn').addEventListener('click', generatePoem);

async function generatePoem() {
    const apiKey = 'sk-b5a87e886db842a2b9d3e66952a0e2f4'; // Replace with your actual DeepSeek API key
    const keyword = document.getElementById('keywordInput').value.trim();
    if (!keyword) {
        alert('Please enter a keyword');
        return;
    }

    try {
        // Call DeepSeek API
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'You are a poetic assistant skilled at writing emotional and introspective poems.' },
                    { role: 'user', content: `Generate a complete modern poem inspired by the theme "${keyword}". The poem should be concise, less than 80 characters, vivid, with an intimate tone, and ensure a complete thought.` }
                ],
                max_tokens: 100,
                temperature: 0.8
            })
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            let poemText = data.choices[0].message.content.trim();
            displayPoem(poemText.split(','));
        } else {
            alert('Failed to generate content, please try again.');
        }
    } catch (error) {
        console.error('Request failed:', error);
        alert('Unable to generate content, please try again later.');
    }
}

function displayPoem(phrases) {
    const poemContainer = document.getElementById('poemContainer');
    poemContainer.innerHTML = '';
    poemContainer.style.visibility = 'visible';

    // Random notebook background
    const backgrounds = ['notebook1.png', 'notebook2.png', 'notebook3.png', 'notebook4.png', 'notebook5.png','notebook6.png',,'notebook7.png','notebook8.png','notebook9.png','notebook10.png','notebook11.png','notebook12.png','notebook13.png','notebook14.png','notebook15.png'];
    const randomBackground = `url("notebook-backgrounds/${backgrounds[Math.floor(Math.random() * backgrounds.length)]}")`;
    poemContainer.style.backgroundImage = randomBackground;
    poemContainer.style.backgroundSize = '200% 200%';
    poemContainer.style.backgroundRepeat = 'no-repeat';
    poemContainer.style.backgroundPosition = 'center';

    const fonts = ['Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana', 'Tahoma', 'Comic Sans MS', 'Lucida Console', 'Garamond'];
    const accentColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#33FFF1', '#FFF233', '#B833FF', '#33FF85', '#FF8C33'];
    const textColors = ['#FFFFFF', '#000000', '#FFD700', '#8B0000', '#4B0082', '#FF1493', '#00CED1', '#32CD32', '#8A2BE2', '#FF4500', '#2E8B57']; // Expanded text colors

    phrases.forEach(phrase => {
        const line = document.createElement('div');
        line.className = 'poem-line';
        let words = phrase.trim().split(' ');

        words.forEach(word => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word + ' ';
            wordSpan.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];

            // Default to white background with black text
            wordSpan.style.backgroundColor = 'white';
            wordSpan.style.color = 'black';

            // Randomly change some blocks to have colorful backgrounds (15% chance)
            if (Math.random() < 0.15) {
                const randomColor = accentColors[Math.floor(Math.random() * accentColors.length)];
                const randomOpacity = (Math.random() * 0.5 + 0.5).toFixed(2); // Random opacity between 0.5 and 1
                wordSpan.style.backgroundColor = hexToRgba(randomColor, randomOpacity);

                // Choose a contrasting text color from the expanded palette
                const textColor = textColors[Math.floor(Math.random() * textColors.length)];
                wordSpan.style.color = textColor;
                wordSpan.style.fontWeight = 'bold'; // Bold text within colored blocks
            }

            // Styling for the collage effect with adjusted shadow
            wordSpan.style.boxShadow = '3px 3px 6px rgba(0, 0, 0, 0.3)'; // Adjusted shadow offset and blur
            wordSpan.style.display = 'inline-block';
            wordSpan.style.marginRight = '5px';
            wordSpan.style.padding = '2px 4px';
            wordSpan.style.borderRadius = '2px';
            wordSpan.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;

            line.appendChild(wordSpan);
        });

        poemContainer.appendChild(line);
    });
}

function hexToRgba(hex, alpha) {
    // Convert hex color to rgba string with specified alpha
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
