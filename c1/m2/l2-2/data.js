/* Course 1 · Module 2 · Lecture 2.2: Expert Blind Spot
   Source: Course I Ungraded Assessments doc. */
window.LECTURE = {
  id: "c1/m2/l2-2",
  activities: [
    {
      title: "Practice: Spot the blind spot",
      meta: "Optional · About 2–3 minutes",
      instructions: "A scientist is explaining a plant study to visitors with no science background. Select the <strong>three phrases</strong> that could make the explanation harder to follow.",
      steps: [{
        type: "highlight",
        hint: "Look for a word that assumes understanding, an unexplained technical term, or a conclusion with missing steps.",
        segments: [
          "“",
          { text: "Obviously,", correct: true, after: " ",
            feedback: "What feels obvious to an expert may be new to a beginner. Removing this word helps avoid making learners feel they should already understand." },
          "the plants showed ",
          { text: "a phototropic response.", correct: true, after: " ",
            feedback: "This term may be unfamiliar. Define it or explain it in everyday language: the plants grew toward the light." },
          { text: "We put a lamp on one side of the plants.", lead: "Keep this one.", after: " ",
            feedback: "This sentence helps explain the research process. The goal is to include useful details, not remove every detail." },
          { text: "The results confirmed our prediction.", correct: true,
            feedback: "The visitors haven’t been told what the scientists predicted or observed. Add those missing steps so they can follow the reasoning." },
          "”"
        ],
        reveal: "<h3 class=\"sc-step-heading\">Make the thinking visible</h3><p>One possible revision:</p><blockquote>“We wanted to find out whether the plants would grow toward a light. We put a lamp on one side and observed their growth over several days. The plants grew toward the lamp, as we predicted. Growth toward light is called positive phototropism.”</blockquote><p>This version explains the term, shows what the researchers did, and connects the observation to the prediction. Overcoming the expert blind spot can mean <strong>adding a few essential details</strong>, rather than simply shortening an explanation.</p>"
      }],
      completion: "<p><strong>Before sharing your own explanation:</strong> Ask someone unfamiliar with the topic, “Which word or step needs more explanation?” Their feedback can reveal assumptions you missed.</p>"
    }
  ]
};
