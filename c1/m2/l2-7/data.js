/* Course 1 · Module 2 · Lecture 2.7: Measuring Impact
   Source: Course I Ungraded Assessments doc. */
window.LECTURE = {
  id: "c1/m2/l2-7",
  activities: [
    {
      title: "Practice: What should you measure?",
      meta: "Optional · About 2–3 minutes",
      steps: [
        {
          type: "match", heading: "1. Match the goal to the measure",
          instructions: "Match each goal with the measure that most directly addresses it. Use each measure once.",
          selectLabel: "Measure",
          options: ["Attendance count", "Viewing duration", "Audience age data", "Responses to the same opinion questions at multiple time points"],
          retryFeedback: "Look for the measure that answers the specific question in the goal: how many attended, how long they watched, who you reached, or whether opinions changed.",
          items: [
            { text: "Find out how many people attended your science talk.", answer: "Attendance count",
              feedback: "Attendance tells you how many people came. It doesn’t tell you what they learned or whether their views changed." },
            { text: "Find out whether viewers stay through most of your video.", answer: "Viewing duration",
              feedback: "How long people watch helps you assess whether they stay with the content. View counts alone don’t show this." },
            { text: "Find out whether your content reaches your intended age group.", answer: "Audience age data",
              feedback: "Audience demographics help you check whether you are reaching the people you intended to reach." },
            { text: "Track whether audience opinions change over time.", answer: "Responses to the same opinion questions at multiple time points",
              feedback: "Repeated questions let you compare opinions over time. A single survey provides only a snapshot." }
          ]
        },
        {
          type: "choice", heading: "2. What can you conclude?",
          context: "<span class=\"sc-fictional\">Fictional video results</span><p class=\"sc-card-title\">Goal: Help viewers understand how scientists study bird migration.</p><p>Result: <strong>10,000 views</strong><br>No questions about understanding were asked.</p>",
          prompt: "What do these results tell you?",
          options: [
            { letter: "A", text: "The video achieved its learning goal because it received many views.",
              feedback: "Views show that the video was accessed, but they don’t establish what viewers understood." },
            { letter: "B", text: "The video received attention, but you need evidence of understanding to assess the learning goal.", correct: true,
              feedback: "Exactly. A short understanding check would provide evidence more directly connected to this goal." },
            { letter: "C", text: "The video missed its learning goal because understanding wasn’t measured.",
              feedback: "Not measuring understanding doesn’t mean viewers failed to learn. It means you can’t yet judge whether the goal was achieved." }
          ]
        }
      ],
      completion: "Start with the goal. Choose a relevant measure. Interpret only what the evidence supports."
    }
  ]
};
