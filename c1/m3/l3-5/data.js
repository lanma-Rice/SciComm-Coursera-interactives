/* Course 1 · Module 3 · Lecture 3.5: Tell Stories
   Source: Course I Ungraded Assessments doc ("Lecture 3.4 Tell Stories").
   Each dropdown uses all FIVE stage descriptions (the doc said four, but lists five stages). */
var ARC = [
  "Introduces the characters and the starting situation.",
  "Something happens that sets the story in motion.",
  "Presents a challenge and builds tension.",
  "The story reaches a pivotal moment or turning point.",
  "Shows how things turn out."
];
window.LECTURE = {
  id: "c1/m3/l3-5",
  activities: [
    {
      title: "Activity 1: What makes a story?",
      meta: "Optional · Matching",
      instructions: "Complete the narrative arc. For each numbered point, choose the description that fits that story stage.",
      figure: "<figure><img src=\"../../../assets/img/c1-l3-5-narrative-arc.png\" width=\"1100\" height=\"618\" alt=\"The narrative arc drawn as a path up and down a mountain, with five numbered points: point 1 at the base, points 2 and 3 on the way up, point 4 at the peak, and point 5 on the way down.\"></figure>",
      steps: [{
        type: "match",
        selectLabel: "Description",
        options: ARC,
        retryFeedback: "Take another look: are you introducing the situation, starting the action, building tension, reaching a turning point, or showing the outcome?",
        items: [
          { html: "<strong>Point 1 · Exposition</strong>", text: "Point 1 · Exposition", answer: ARC[0],
            feedback: "Yes! Exposition gives the audience the background they need to enter the story." },
          { html: "<strong>Point 2 · Action begins</strong>", text: "Point 2 · Action begins", answer: ARC[1],
            feedback: "Yes! This is the event that sets the story in motion and sends the characters into action." },
          { html: "<strong>Point 3 · Conflict</strong>", text: "Point 3 · Conflict", answer: ARC[2],
            feedback: "Exactly. A challenge creates tension and gives the audience a reason to follow what happens next." },
          { html: "<strong>Point 4 · Climax</strong>", text: "Point 4 · Climax", answer: ARC[3],
            feedback: "Right. The climax is the pivotal moment the story has been building toward." },
          { html: "<strong>Point 5 · Resolution</strong>", text: "Point 5 · Resolution", answer: ARC[4],
            feedback: "Yes. The resolution shows the outcome and brings the story to a close." }
        ]
      }]
    },
    {
      title: "Activity 2: Give a star a story",
      meta: "Optional · Single choice",
      instructions: "You’re creating a short science article for a general audience about how stars change as they age. <strong>Which opening introduces a character and a developing challenge?</strong>",
      steps: [{
        type: "choice",
        options: [
          { letter: "A", text: "“Stars change over their lifetimes. As their fuel supplies decrease, their size and temperature can change.”",
            feedback: "This is a clear explanation of the science. To begin a narrative, introduce a particular character and something happening to it." },
          { letter: "B", text: "“For billions of years, this star has shone steadily. Now, its fuel is running low—and a dramatic transformation is beginning.”", correct: true,
            feedback: "Exactly! The star is the character, and its dwindling fuel introduces a challenge. A science story’s main character can be a star, a cell, an animal, or a person." },
          { letter: "C", text: "“Astronomers studied an aging star using telescope observations. Their report describes the methods, results, and implications.”",
            feedback: "This introduces the research and its reporting structure. A narrative opening instead introduces a character and a situation that begins to unfold." }
        ]
      }],
      completion: "A story gives audiences something to follow. Characters and a developing challenge can draw people in and help them remember the science."
    }
  ]
};
