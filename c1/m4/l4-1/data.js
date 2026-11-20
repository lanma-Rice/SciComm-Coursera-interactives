/* Course 1 · Module 4 · Lecture 4.1: Use Media Strategically
   Source: Course I Ungraded Assessments doc.
   DRAFT (Claude): Activity 1 learner instructions were missing from the doc. */
window.LECTURE = {
  id: "c1/m4/l4-1",
  activities: [
    {
      title: "Activity 1: Complete the planning graphic",
      meta: "Optional · Matching",
      instructions: "Three questions guide a media choice. Match each question in the planning graphic to the factor it asks about.",
      figure: "<figure><img src=\"../../../assets/img/c1-l4-1-planning-graphic.png\" width=\"1100\" height=\"618\" alt=\"Planning graphic titled Choosing Media Strategically. Three circles, each with its label replaced by a question mark, point to a circle labeled Media Choice. The circles ask: Who are you trying to reach? What are you trying to accomplish? What skills can you use effectively?\"></figure>",
      steps: [{
        type: "match",
        selectLabel: "Factor",
        options: ["Audience", "Goal", "Strengths"],
        items: [
          { text: "“Who are you trying to reach?”", answer: "Audience",
            feedback: "Yes! Consider whom you want to reach and where they get information.",
            retry: "This question focuses on the people you want to reach. That’s your audience." },
          { text: "“What are you trying to accomplish?”", answer: "Goal",
            feedback: "Exactly! Choose media that helps you achieve your communication goal.",
            retry: "This question asks about your intended outcome. That’s your communication goal." },
          { text: "“What skills can you use effectively?”", answer: "Strengths",
            feedback: "Right! Your communication skills help determine which formats you can use effectively.",
            retry: "This question focuses on what you can do well. Those are your strengths." }
        ]
      }],
      completion: "Your audience, goal, and strengths work together to guide your media choice. Consider all three rather than automatically choosing a familiar format."
    },
    {
      title: "Activity 2: Choose the media",
      meta: "Optional · Single choice",
      context: "<p class=\"sc-card-title\">Your planning graphic</p><ul><li><strong>Audience:</strong> Local council members attending a meeting.</li><li><strong>Goal:</strong> Help them hear how highway noise masks birdsong.</li><li><strong>Strengths:</strong> Recording and editing clear audio.</li></ul>",
      steps: [{
        type: "choice",
        prompt: "Which approach most directly supports this communication goal?",
        options: [
          { letter: "A", text: "Show a chart comparing traffic noise levels at several locations.",
            feedback: "A chart could help council members compare noise levels, but it doesn’t let them hear how traffic masks bird calls. Which option would let them hear the difference directly?" },
          { letter: "B", text: "Play a short recording of birdsong with and without nearby traffic noise.", correct: true,
            feedback: "Yes! The recording lets council members hear the problem directly. It supports your goal, suits the meeting setting, and uses your audio recording skills." },
          { letter: "C", text: "Display a written explanation of how traffic noise interferes with birdsong.",
            feedback: "A written explanation could provide useful context, but it doesn’t let council members hear the effect. Which option would make the sound itself part of your message?" }
        ]
      }],
      completion: "The most useful medium depends on the situation. Here, audio connects your audience, your goal, and your strengths."
    }
  ]
};
