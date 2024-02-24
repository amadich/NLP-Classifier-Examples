const natural = require('natural');

// Larger dataset: post titles and their corresponding subjects
const posts = [
    { title: "Introduction to JavaScript programming", sujet: "Programming" },
    { title: "Tips for effective time management", sujet: "Productivity" },
    { title: "Delicious and easy recipes for beginners", sujet: "Cooking" },
    { title: "Web development best practices", sujet: "Programming" },
    { title: "Improving work efficiency with time-saving techniques", sujet: "Productivity" },
    { title: "Healthy and quick dinner recipes", sujet: "Cooking" },
    // Add more posts with different subjects
];

// Split the data into training and testing sets
const splitIndex = Math.floor(posts.length * 0.8); // 80% training, 20% testing
const trainingData = posts.slice(0, splitIndex);
const testingData = posts.slice(splitIndex);

// Train a Naive Bayes classifier
const classifier = new natural.BayesClassifier();

// Train the classifier with the training data
trainingData.forEach(post => {
    classifier.addDocument(post.title, post.sujet);
});

classifier.train();

// Evaluate the model on the testing data
let correctPredictions = 0;
const predictions = [];

testingData.forEach(post => {
    const prediction = classifier.classify(post.title);
    console.log(`Post Title: '${post.title}', Actual Subject: '${post.sujet}', Predicted Subject: '${prediction}'`);

    // Store predictions for later accuracy calculation
    predictions.push({ actual: post.sujet, predicted: prediction });

    // Manually calculate accuracy
    if (prediction === post.sujet) {
        correctPredictions++;
    }
});

// Calculate accuracy
const accuracy = (correctPredictions / testingData.length) * 100;
console.log(`Model accuracy on testing data: ${accuracy.toFixed(2)}%`);

// Show detailed predictions
console.log("Detailed Predictions:");
predictions.forEach(({ actual, predicted }) => {
    console.log(`Actual: '${actual}', Predicted: '${predicted}'`);
});
