const fileInput = document.getElementById('txtUpload');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const rawData = event.target.result;

        const questions = parseQAString(rawData); 
        alert('Questions to be asked: ' + questions.length)
        runQuiz(questions); // Start your quiz with the loaded data
    };

    reader.readAsText(file);
});

function parseQAString(qaString) {
    const lines = qaString.trim().split('\n');
    const quizData = [];
  
    for (let i = 0; i < lines.length; ++i) {
      if (lines[i].startsWith('Q:') && lines[i + 1].startsWith('A:')) {
        const question = lines[i].slice(2).trim();
        const answer = lines[i + 1].slice(2).trim();
        quizData.push({ question, answer });
      } else {
        // Handle invalid format if needed 
      }
    }
  
    return quizData;
  }  

  function runQuiz(questions) {
    let remainingQuestions = [...questions]; // Copy the questions array
    let asked = 0;
    let correct = 0;

    while (remainingQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
        const { question, answer } = remainingQuestions[randomIndex];

        let userAnswer = prompt(question);
        
        if (userAnswer == null) {
            break;
        }
    
        asked++; // Increment the number of questions asked

        if (userAnswer.toLowerCase() === answer.toLowerCase()) {
            correct++; // Increment correct count
            alert(`Correct! ${correct} out of ${asked} correct (${calculatePercentage(asked, correct)}%)`);
            remainingQuestions.splice(randomIndex, 1); 
        } else {
            alert(`Answer was ${answer}. Try again.`);
        }
    }

    // Final summary after the quiz ends
    alert(`Quiz complete! You answered ${correct} out of ${asked} questions correctly (${calculatePercentage(asked, correct)}%).`);
    fileInput.value = ''; // Reset the file input
}

// Helper function for calculating percentage
function calculatePercentage(total, correct) {
    return (correct / total * 100).toFixed(1); // Round to one decimal place
}
