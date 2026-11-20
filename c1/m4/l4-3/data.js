/* Course 1 · Module 4 · Lecture 4.3: Be Authentic & Find Your Voice
   Source: Course I Ungraded Assessments doc. */
window.LECTURE = {
  id: "c1/m4/l4-3",
  activities: [
    {
      title: "Activity 1: Different voices, same science",
      meta: "Optional · Matching",
      instructions: "These sentences describe the same observation: a seedling growing toward a window. Match each sentence to its most noticeable style.",
      steps: [{
        type: "match",
        selectLabel: "Style",
        options: ["Humorous", "Wonder-filled", "Direct"],
        items: [
          { text: "“The seedling apparently voted for the window seat—it’s growing toward the light.”", answer: "Humorous",
            feedback: "Yes! The playful ‘window seat’ comparison adds humor to the observation.",
            retry: "Look at ‘voted for the window seat.’ That playful wording is intended to make the reader smile." },
          { text: "“Even a tiny seedling can respond to the light around it—an everyday glimpse of something remarkable.”", answer: "Wonder-filled",
            feedback: "Exactly! This wording invites the audience to appreciate the wonder in an everyday observation.",
            retry: "Notice how ‘something remarkable’ encourages the reader to appreciate the observation." },
          { text: "“The seedling is growing toward the light coming through the window.”", answer: "Direct",
            feedback: "Right! This sentence states the observation clearly and gets straight to the point.",
            retry: "This sentence presents the observation without a joke or an emphasis on wonder." }
        ]
      }],
      completion: "All three communicate the same observation. Your voice comes through in your wording, rhythm, and emphasis. You don’t have to be funny or dramatic to communicate effectively."
    },
    {
      title: "Activity 2: Make it sound like you",
      meta: "Optional · Click to revise",
      context: "<p>You naturally explain things in a calm, straightforward way. While drafting a short science talk, you add several jokes to sound like a presenter you admire. When you read it aloud, the jokes feel forced.</p>",
      instructions: "Select the highlighted phrase and choose a more useful next step.",
      steps: [{
        type: "revise",
        segments: [
          "“My next step is to ",
          { text: "add more jokes until I sound like that presenter", options: [
            { text: "revise the wording to sound natural, then read it aloud again", correct: true,
              feedback: "Yes! Revising and reading aloud helps you hear whether the wording and rhythm feel like you. A calm, direct style can be an effective authentic voice." },
            { text: "keep the wording and rehearse until I can deliver the jokes smoothly",
              feedback: "Rehearsal may improve delivery, but it doesn’t address wording that feels forced. Try revising the draft to fit your own voice, then listen to how it sounds." }
          ]},
          ".”"
        ]
      }],
      completion: "Finding your voice takes trial and error. Read aloud, listen, and revise until the wording and pacing feel natural to you."
    }
  ]
};
