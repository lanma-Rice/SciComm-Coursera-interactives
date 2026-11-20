/* Course 1 · Module 4 · Lecture 4.2: Use Metaphors
   Source: Course I Ungraded Assessments doc. */
window.LECTURE = {
  id: "c1/m4/l4-2",
  activities: [
    {
      title: "Activity 1: Find the connection",
      meta: "Optional · Two dropdowns",
      context: "<p>Someone describes a cell membrane as a ‘gatekeeper’ because it helps control what enters and leaves the cell.</p>",
      steps: [{
        type: "fill",
        retryFeedback: "The cell membrane is the science concept being explained. A gatekeeper provides the familiar comparison. Try switching your selections.",
        segments: [
          "The unfamiliar concept being explained is ",
          { label: "Unfamiliar concept", options: [{ text: "a cell membrane", correct: true }, { text: "a gatekeeper" }] },
          ". The familiar idea used to explain it is ",
          { label: "Familiar idea", options: [{ text: "a cell membrane" }, { text: "a gatekeeper", correct: true }] },
          "."
        ],
        reveal: "<p>Yes! The familiar role of a gatekeeper helps explain the membrane’s role in controlling what enters and leaves.</p>"
      }]
    },
    {
      title: "Activity 2: A comparison your audience knows",
      meta: "Optional · Single choice",
      instructions: "You’re explaining how a computer processes tasks to children who know how a school cafeteria works but have never worked in an office. <strong>Which comparison gives you the most useful starting point?</strong>",
      steps: [{
        type: "choice",
        options: [
          { letter: "A", text: "Tasks moving through a cafeteria lunch line.", correct: true,
            feedback: "Yes! The children already understand a lunch line. You can build on that familiar experience to explain tasks waiting to be processed." },
          { letter: "B", text: "Documents moving through an office approval process.",
            feedback: "An office approval process might work for another audience. These children would need that process explained before it could help them understand computing." },
          { letter: "C", text: "Instructions moving through a computer’s processor.",
            feedback: "This stays within the unfamiliar concept. A useful analogy gives learners a connection to something they already understand." }
        ]
      }]
    },
    {
      title: "Activity 3: Where does the comparison break down?",
      meta: "Optional · One dropdown",
      context: "<p>The lock-and-key analogy helps explain how an enzyme interacts with a particular substrate. But it can suggest that enzymes are rigid. In reality, enzymes can change shape.</p>",
      steps: [{
        type: "fill",
        segments: ["This shows that analogies ", {
          label: "What this shows about analogies",
          options: [
            { text: "explain selected similarities but have limits", correct: true,
              feedback: "Exactly! A comparison can explain one feature well while giving a misleading impression of another. Consider whether that limitation matters for your audience and goal." },
            { text: "represent every feature of the scientific concept",
              feedback: "An analogy compares selected features. The lock-and-key comparison helps explain a particular interaction, but it doesn’t capture an enzyme’s flexibility." },
            { text: "should be avoided whenever they simplify science",
              feedback: "Simplification is part of what makes analogies useful. The key is to recognize their limits and clarify those that matter for your message." }
          ]
        }, "."]
      }]
    }
  ]
};
