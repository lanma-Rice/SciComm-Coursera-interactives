/* Course 1 · Module 2 · Lecture 2.6: Being a Good Listener
   Source: Course I Ungraded Assessments doc. */
window.LECTURE = {
  id: "c1/m2/l2-6",
  activities: [
    {
      title: "Practice: Listen, then respond",
      meta: "Optional · About 2–3 minutes",
      steps: [
        {
          type: "highlight", heading: "1. What is the audience telling you?",
          instructions: "Read this fictional message from a podcast listener. Select the sentence that tells you what they would like explained.",
          block: true,
          segments: [
            { text: "I enjoyed your episode about urban trees.", after: " ", lead: "Not this one.",
              feedback: "This tells you the listener enjoyed the episode, but it does not identify what they want to learn next." },
            { text: "I’m still wondering how researchers measure the cooling effect of shade.", after: " ", correct: true,
              feedback: "Exactly. The listener is asking about how the research is conducted. That gives you a specific topic to address." },
            { text: "I usually listen on my walk to work.", lead: "Not this one.",
              feedback: "Listening habits can be useful context, but this sentence does not identify their unanswered question." }
          ]
        },
        {
          type: "choice", heading: "What would be the most responsive next step?",
          options: [
            { text: "Explain how researchers measure the cooling effect, using a clear example.", correct: true,
              feedback: "This directly addresses the listener’s question. You are using feedback to guide your explanation." },
            { text: "Recommend another episode about the benefits of urban trees.",
              feedback: "That is related to the topic, but it may leave the question about research methods unanswered." },
            { text: "Thank them and invite them to send more questions.",
              feedback: "This welcomes feedback, but listening also involves responding to what they have already asked." }
          ]
        },
        {
          type: "match", heading: "2. Make room for feedback",
          instructions: "Match each situation with the feedback channel that best fits the stated circumstances.",
          selectLabel: "Feedback channel",
          options: [
            "Invite questions and listen to audience responses.",
            "Provide a public contact email or social media account for reader questions."
          ],
          retryFeedback: "Think about whether the audience can respond during the communication or needs a way to contact you afterward.",
          items: [
            { text: "You are giving a live presentation with time reserved for audience participation.",
              answer: "Invite questions and listen to audience responses.",
              feedback: "A live exchange lets you hear questions and respond directly. Welcoming questions can also help people feel comfortable participating." },
            { text: "You have published a print book and want readers to be able to contact you afterward.",
              answer: "Provide a public contact email or social media account for reader questions.",
              feedback: "A book does not allow an immediate conversation, but a contact channel gives readers a way to respond—and gives you feedback to learn from." }
          ]
        }
      ],
      completion: "Listening means making space for feedback, paying attention to it, and using it to shape your response."
    }
  ]
};
