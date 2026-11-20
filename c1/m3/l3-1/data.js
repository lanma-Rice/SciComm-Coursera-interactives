/* Course 1 · Module 3 · Lecture 3.1: Establish Your Goals
   Source: Course I Ungraded Assessments doc. */
window.LECTURE = {
  id: "c1/m3/l3-1",
  activities: [
    {
      title: "Practice: Start with the goal",
      meta: "Optional · About 2–3 minutes",
      steps: [
        {
          type: "sort", heading: "1. Goal or tactic?",
          instructions: "Sort each statement into <strong>Goal</strong> or <strong>Tactic</strong>. Ask yourself: Does it describe an intended outcome or an action used to get there?",
          poolLabel: "Statements",
          categories: [{ id: "goal", label: "Goal" }, { id: "tactic", label: "Tactic" }],
          retryFeedback: "Complete the phrase “I’m doing this so that…” What comes afterward usually points toward the goal.",
          cards: [
            { category: "goal", text: "Help residents understand how scientists monitor local water quality.",
              feedback: "This describes what you want the audience to understand as a result of your communication." },
            { category: "tactic", text: "Publish an article in the community newsletter.",
              feedback: "Publishing is an action. The goal explains what you hope the article will accomplish." },
            { category: "goal", text: "Increase the number of residents participating in a community science project.",
              feedback: "This describes a desired change in participation—an outcome you could track." },
            { category: "tactic", text: "Give a demonstration at a neighborhood event.",
              feedback: "A demonstration is a way to communicate. Its value depends on whether it helps achieve your goal." }
          ]
        },
        {
          type: "fill", heading: "2. Make the goal clearer",
          context: "<span class=\"sc-fictional\">Fictional starting point</span><blockquote>“I want to make a video about our butterfly-counting project.”</blockquote><p>The project needs more adult volunteers from the local community. The communicator wants viewers to sign up for an upcoming count.</p>",
          instructions: "Complete the goal by choosing an audience and an intended outcome.",
          segments: [
            "“My goal is for ",
            { label: "Audience", options: [
              { text: "adults in the local community", correct: true, feedback: "This identifies the people the project wants to recruit." },
              { text: "people of all ages around the world", feedback: "That audience is broader than the project needs. Focus on the local adult volunteers described here." }
            ]},
            " to ",
            { label: "Outcome", options: [
              { text: "watch a video about butterflies", feedback: "Watching is an intermediate step. The stated goal is to encourage participation in the count." },
              { text: "understand why butterfly monitoring matters", feedback: "Understanding is a valid goal, but this project’s stated priority is recruiting volunteers." },
              { text: "sign up for an upcoming butterfly count", correct: true, feedback: "This directly expresses the desired action and gives you an outcome to track." }
            ]},
            ".”"
          ],
          reveal: "<p><strong>Goal:</strong> Adults in the local community sign up for an upcoming butterfly count.<br><strong>Possible tactic:</strong> Share a short recruitment video through local community channels.<br><strong>Evidence to track:</strong> Sign-ups from the intended audience, with a question asking how volunteers heard about the project.</p>"
        }
      ],
      completion: "Now the video has a purpose. You have identified whom you want to reach, what you want them to do, and evidence you can collect to assess progress."
    }
  ]
};
