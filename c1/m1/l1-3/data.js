/* Course 1 · Module 1 · Lecture 1.3: Theories of Science Communication
   Source: Course I Ungraded Assessments doc. */
window.LECTURE = {
  id: "c1/m1/l1-3",
  activities: [
    {
      title: "Activity 1: Match the communication model",
      meta: "Optional · About 1–2 minutes",
      instructions: "Match each example to the model it most clearly illustrates: <strong>Deficit</strong>, <strong>Dialogue</strong>, or <strong>Participation</strong>. Use each label once.",
      steps: [{
        type: "match",
        options: ["Deficit", "Dialogue", "Participation"],
        selectLabel: "Model",
        retryFeedback: "Look at what the public is doing: receiving information, exchanging perspectives, or contributing to research.",
        items: [
          { text: "A scientist creates a fact sheet explaining how to identify common birds.", answer: "Deficit",
            feedback: "This example focuses on sharing knowledge from an expert with the public. One-way information sharing can be useful when the goal is to explain something." },
          { text: "A scientist and local residents discuss changes in bird populations, exchanging research findings, observations, and concerns.", answer: "Dialogue",
            feedback: "Both scientists and residents contribute. Listening and exchanging perspectives are central to the dialogue model." },
          { text: "Residents follow a shared counting procedure and submit bird observations for a research study.", answer: "Participation",
            feedback: "Members of the public contribute data to scientific research. They participate in doing science." }
        ]
      }],
      completion: "The key difference is how people are involved. These examples highlight one model each, but real activities can combine them."
    },
    {
      title: "Activity 2: Fix the statement",
      meta: "Optional · About 1 minute",
      instructions: "Choose the words that make each statement accurate.",
      steps: [
        { type: "fill", heading: "Statement 1",
          segments: ["Giving people more scientific facts ", {
            label: "Statement 1 blank",
            options: [{ text: "will always" }, { text: "does not necessarily", correct: true }],
            correctFeedback: "Facts matter, but people’s attitudes also depend on their values, identities, trust, sense of personal relevance, and emotions.",
            retryFeedback: "Think about the influences discussed in the lecture. Is information the only thing that shapes how people think?"
          }, " change their attitudes."] },
        { type: "fill", heading: "Statement 2",
          segments: ["The deficit, dialogue, and participation models ", {
            label: "Statement 2 blank",
            options: [{ text: "can be used separately or combined", correct: true }, { text: "must always be used together" }],
            correctFeedback: "There is no requirement to use every model. Choose an approach—or combination—that fits what you want to accomplish and what is practical.",
            retryFeedback: "Think about the lecture example: sharing information, inviting discussion, and offering participation are possible choices, not mandatory steps."
          }, " depending on the communication goal and practical constraints."] }
      ]
    }
  ]
};
