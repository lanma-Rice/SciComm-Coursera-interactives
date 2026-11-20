/* Course 1 · Module 4 · Lecture 4.4: Use Humor
   Source: Course I Ungraded Assessments doc.
   Per the doc: "serious" is not styled as a wrong or unsuccessful choice. */
window.LECTURE = {
  id: "c1/m4/l4-4",
  activities: [
    {
      title: "Activity 1: What role should humor play?",
      meta: "Optional · One dropdown",
      steps: [{
        type: "fill",
        segments: ["Humor is most useful when it helps the audience ", {
          label: "Role of humor",
          options: [
            { text: "feel at ease and connect with the science", correct: true,
              feedback: "Exactly! Humor can make scientists seem approachable and technical material less intimidating. It should support your communication goal." },
            { text: "remember the joke, even if they miss the science",
              feedback: "A memorable joke doesn’t necessarily mean the message succeeded. Humor should help people connect with the science." },
            { text: "see that every science communicator can be funny",
              feedback: "You don’t have to be funny to communicate science effectively. Use humor when it feels natural and serves your audience." }
          ]
        }, "."]
      }]
    },
    {
      title: "Activity 2: Adjust the humor",
      meta: "Optional · Two situations",
      instructions: "For each situation, choose the more appropriate approach.",
      steps: [{
        type: "label",
        shuffle: false,
        labels: ["Light humor may fit", "Keep the focus serious"],
        items: [
          { text: "At a relaxed community stargazing night, visitors are chatting and laughing. You consider a brief joke about your own struggle to set up the telescope before explaining what they’ll see.",
            answer: "Light humor may fit",
            feedback: "Yes! A brief joke about yourself may help people feel comfortable in this relaxed setting. Keep astronomy as the main focus.",
            retry: "This relaxed setting offers room for gentle humor about yourself. It’s optional, but it may help you connect with visitors." },
          { text: "Residents whose homes were damaged by a flood attend a briefing about the causes. They are worried and want clear explanations. You consider opening with a joke about their flooded streets.",
            answer: "Keep the focus serious",
            feedback: "Right. The audience has experienced harm and needs clear information. Joking about their situation could make them feel dismissed.",
            retry: "Consider what the audience has experienced. A joke about their flooded streets could seem dismissive and undermine your message." }
        ]
      }]
    },
    {
      title: "Activity 3: When a joke needs revising",
      meta: "Optional · Click to revise",
      instructions: "You’re preparing a community talk about recycling. Replace the highlighted sentence with wording that keeps the tone light without insulting the audience.",
      steps: [{
        type: "revise",
        segments: [
          "“Recycling labels can be confusing. ",
          { text: "Only an idiot would put that in the wrong bin.", options: [
            { text: "I’ve stood over a recycling bin like I was taking a final exam.", correct: true,
              feedback: "Yes! The speaker makes fun of their own uncertainty rather than the audience. It also leads naturally into explaining the labels." },
            { text: "Some people apparently need a university degree to use a bin.",
              feedback: "This still makes people’s confusion the target of the joke. Try wording that helps them feel comfortable asking questions." },
            { text: "You’d think adults could figure out a few symbols.",
              feedback: "This could embarrass people who find the labels confusing. Humor should make the explanation more welcoming." }
          ]},
          " Let’s look at what the symbols mean.”"
        ]
      }]
    }
  ]
};
