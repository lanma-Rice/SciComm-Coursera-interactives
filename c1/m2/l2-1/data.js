/* Course 1 · Module 2 · Lecture 2.1: Lack of Training and Support
   Source: Course I Ungraded Assessments doc. */
window.LECTURE = {
  id: "c1/m2/l2-1",
  activities: [
    {
      title: "Practice: What support is missing?",
      meta: "Optional · About 2–3 minutes",
      instructions: "For each example, identify the main barrier and choose the support that directly addresses it.",
      steps: [
        {
          type: "match", heading: "Card 1: “I know the science. How do I explain it?”",
          context: "<blockquote>“My training taught me to write research papers for specialists. I haven’t learned how to explain my work to people outside my field.”</blockquote>",
          shuffleOptions: false,
          items: [
            { text: "The main barrier is:", selectLabel: "Barrier", keepOrder: true, options: [
              { text: "Lack of communication training", correct: true, feedback: "Yes. Writing for specialists and communicating with general audiences require different skills. Scientific expertise alone does not provide all the preparation." },
              { text: "Lack of institutional recognition", feedback: "The concern here is about skills the researcher hasn’t learned. Look for the barriers related to training." }
            ]},
            { text: "What would directly help?", selectLabel: "Support", keepOrder: true, options: [
              { text: "Coaching on explaining science to general audiences", correct: true, feedback: "Yes. Coaching can help scientists explain complex ideas, avoid jargon, and structure a story. Scott developed these skills with help from a newspaper editor." },
              { text: "More practice writing technical papers for specialists", feedback: "Technical writing practice serves a different audience. This researcher needs practice and feedback focused on communicating with non-specialists." }
            ]}
          ]
        },
        {
          type: "match", heading: "Card 2: “Does public engagement count?”",
          context: "<blockquote>“I’m ready to take part in public science events, but my university gives little recognition to outreach when evaluating faculty for promotion.”</blockquote>",
          shuffleOptions: false,
          items: [
            { text: "The main barrier is:", selectLabel: "Barrier", keepOrder: true, options: [
              { text: "Lack of communication training", feedback: "This scientist is ready to participate. Focus on how the university recognizes that work." },
              { text: "Lack of institutional recognition", correct: true, feedback: "Yes. The issue is whether the institution values and rewards public engagement, rather than whether the scientist knows how to communicate." }
            ]},
            { text: "What would directly help?", selectLabel: "Support", keepOrder: true, options: [
              { text: "Another introductory communication workshop", feedback: "A workshop could build skills, but it would not address the stated problem: public engagement receives little recognition." },
              { text: "Recognition of public engagement in faculty evaluations", correct: true, feedback: "Yes. Giving public engagement meaningful recognition would directly address the lack of incentive described here." }
            ]}
          ]
        }
      ],
      completion: "Scientists need opportunities to develop communication skills, and institutions can help by encouraging and recognizing public engagement."
    }
  ]
};
