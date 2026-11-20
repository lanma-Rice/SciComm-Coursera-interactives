/* Course 1 · Module 3 · Lecture 3.2: Know Your Audience
   Source: Course I Ungraded Assessments doc. */
window.LECTURE = {
  id: "c1/m3/l3-2",
  intro: "<span class=\"sc-fictional\">Fictional project</span> A local butterfly depends on a particular flowering plant that has become scarce. Your project aims to increase suitable plantings in the community.",
  activities: [
    {
      title: "Practice: Same science, different audience",
      meta: "Optional · About 3 minutes",
      steps: [
        {
          type: "choice", heading: "1. Who actually showed up?",
          context: "<p>You planned a talk encouraging residents to plant these flowers in their yards. When you ask the attendees about their gardening space, you learn that they live in apartments and have no private outdoor planting space.</p>",
          prompt: "How should you adapt the action you recommend?",
          options: [
            { text: "Keep the yard-planting instructions so everyone receives the same message.",
              feedback: "The information may be accurate, but the recommended action does not fit this audience’s circumstances." },
            { text: "Explain how they can support planting these flowers in public spaces.", correct: true,
              feedback: "This gives the actual audience a practical way to contribute to the same conservation goal." },
            { text: "Replace the planting advice with butterfly facts and leave out any suggested action.",
              feedback: "Interesting facts may raise awareness, but you can still offer an achievable action that supports the project’s goal." }
          ]
        },
        {
          type: "match", heading: "2. What should you build on?",
          instructions: "You’ve asked two groups about their experience. Match each audience with the opening activity that best fits what you learned.",
          selectLabel: "Opening activity",
          options: [
            "Compare two garden images and identify which includes the plant the butterfly needs.",
            "Introduce pollination with familiar examples, then guide a seed-planting activity."
          ],
          retryFeedback: "Look at what each group already knows. Which activity builds on that knowledge or supplies a missing foundation?",
          items: [
            { html: "<strong>Experienced gardeners:</strong> Members say they regularly grow flowers and already understand why pollinators matter. They want to know which plants support this butterfly.",
              text: "Experienced gardeners: Members say they regularly grow flowers and already understand why pollinators matter. They want to know which plants support this butterfly.",
              answer: "Compare two garden images and identify which includes the plant the butterfly needs.",
              feedback: "This uses their existing gardening knowledge and focuses on the new information they need." },
            { html: "<strong>Beginning learners:</strong> A class says they have not learned about pollination, and most have never planted a seed. Their school has a planting area available.",
              text: "Beginning learners: A class says they have not learned about pollination, and most have never planted a seed. Their school has a planting area available.",
              answer: "Introduce pollination with familiar examples, then guide a seed-planting activity.",
              feedback: "This provides the foundations they need and a hands-on experience suited to their available space." }
          ]
        }
      ],
      completion: "Ask who is there, what they already know, and what they can do. Then adapt your communication."
    }
  ]
};
