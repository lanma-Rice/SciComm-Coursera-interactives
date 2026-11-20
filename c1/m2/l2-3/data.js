/* Course 1 · Module 2 · Lecture 2.3: Describing Uncertainty
   Source: Course I Ungraded Assessments doc.
   Note: the doc's "drag a phrase tile" (part 2) is built as a two-option choice, which is
   keyboard- and screen-reader-friendly without a separate drag alternative. */
window.LECTURE = {
  id: "c1/m2/l2-3",
  activities: [
    {
      title: "Practice: Make uncertainty clearer",
      meta: "Optional · Three short tasks",
      steps: [
        {
          type: "number", heading: "1. Make the probability concrete",
          context: "<span class=\"sc-fictional\">Fictional forecast</span><p>A forecast estimates a <strong>1% chance</strong> of an event. Complete an equivalent way to express this probability.</p>",
          before: "“The estimated chance is 1 in", after: ".”", answer: 100,
          correctFeedback: "Exactly. 1% and 1 in 100 express the same probability. Giving both forms can help people understand the estimate. Saying only ‘non-zero’ leaves out how small or large the chance is.",
          retryFeedback: "Percent means ‘out of 100.’ Try using that to complete the statement.",
          grid: { total: 100, marked: 1, label: "A grid of 100 dots with one marked: 1% equals 1 in 100", caption: "1% = 1 in 100" },
          reveal: "<p>This illustrates the probability; it does not guarantee exactly one occurrence in every 100 trials.</p>"
        },
        {
          type: "choice", heading: "2. Explain why an estimate changed",
          context: "<p>Researchers collect additional observations and revise their estimates. Complete the update so readers understand why it changed:</p><blockquote>“Our estimate has changed because ______.”</blockquote>",
          retryFeedback: "Think about what scientists should do when they obtain new evidence. Should they keep the original conclusion or reconsider it?",
          options: [
            { text: "new observations allowed us to update our calculations", correct: true,
              feedback: "Updating a conclusion when new evidence becomes available is part of science. Explaining what changed helps readers understand the process." },
            { text: "changing a conclusion means the scientific process failed" }
          ]
        },
        {
          type: "highlight", heading: "3. Keep the claim within the evidence",
          instructions: "A fictional study measured plants grown under two lighting conditions. Select the phrase that makes a claim about <strong>every plant</strong>, rather than the group average.",
          segments: [
            "“Plants under Light A were ",
            { text: "taller on average", lead: "Not this one.", after: ", so ",
              feedback: "This phrase correctly describes a group average. Look for the part that extends the claim to every individual plant." },
            { text: "every plant under Light A was taller than every plant under Light B", correct: true,
              feedback: "A difference between averages does not mean every individual follows the same pattern. Individual exceptions can exist even when the group averages differ." },
            ".”"
          ],
          reveal: "<p><strong>Corrected sentence:</strong> “Plants under Light A were taller on average than plants under Light B.”</p>"
        }
      ]
    }
  ]
};
