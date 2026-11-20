/* Course 1 · Module 3 · Lecture 3.4: Use Plain Language
   Source: Course I Ungraded Assessments doc.
   Note: the doc's drag-into-blank word bank is built with dropdowns (the doc's accessible alternative). */
window.LECTURE = {
  id: "c1/m3/l3-4",
  activities: [
    {
      title: "Practice: Plain language, clear meaning",
      meta: "Optional · About 2–3 minutes",
      steps: [
        {
          type: "fill", heading: "1. Complete the principle",
          instructions: "Complete the statement using the word bank: <strong>understands its meaning</strong> · <strong>define it clearly</strong>.",
          retryFeedback: "Think about what the audience already understands and what you need to explain when introducing something unfamiliar.",
          segments: [
            "Technical language works well when the audience ",
            { label: "First blank", options: [{ text: "understands its meaning", correct: true }, { text: "define it clearly" }],
              correctFeedback: "Technical terms can communicate efficiently among people who share their meaning. The audience’s understanding determines whether the language is useful." },
            ". If an unfamiliar technical term is useful for the audience to learn, ",
            { label: "Second blank", options: [{ text: "understands its meaning" }, { text: "define it clearly", correct: true }],
              correctFeedback: "Sometimes people need the technical term to recognize it elsewhere or find more information. A clear definition makes that term accessible." },
            " the first time you use it."
          ]
        },
        {
          type: "revise", heading: "2A. Use a familiar equivalent",
          instructions: "For a general audience, replace the highlighted word without changing its meaning.",
          segments: [
            "“The researchers ",
            { text: "utilized", options: [
              { text: "used", correct: true, feedback: "‘Used’ communicates the same action in a more familiar, direct way." },
              { text: "tested", feedback: "‘Tested’ changes the meaning. The sentence says they used the camera, not that they evaluated whether it worked." },
              { text: "developed", feedback: "‘Developed’ suggests they created the camera. Plain-language editing should preserve the original meaning." }
            ]},
            " a camera to record the birds.”"
          ]
        },
        {
          type: "choice", heading: "2B. Explain a useful technical term",
          context: "<p>Readers are new to this topic, but they will encounter the term <em>phototropism</em> in a linked resource. Here, it means plant growth in response to light.</p>",
          prompt: "Which wording prepares them to understand that resource?",
          options: [
            { text: "“The study examined phototropism.”", feedback: "This keeps the useful term but leaves readers without an explanation." },
            { text: "“The study examined phototropism—plant growth in response to light.”", correct: true,
              feedback: "This introduces the term and explains it immediately, helping readers recognize it in the linked resource." },
            { text: "“The study examined how plants grow in response to light.”",
              feedback: "This is clear plain language. For this particular purpose, also naming the term would help readers recognize it in the next resource." }
          ]
        }
      ],
      completion: "Use familiar language, preserve the meaning, and explain technical terms when your audience needs them."
    }
  ]
};
