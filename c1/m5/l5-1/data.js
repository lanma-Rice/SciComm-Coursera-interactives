/* Course 1 · Module 5 · Lecture 5.1: AI and Science Communication
   Source: Course I Ungraded Assessments doc. */
window.LECTURE = {
  id: "c1/m5/l5-1",
  activities: [
    {
      title: "Activity 1: Name the risk",
      meta: "Optional · Matching",
      instructions: "Match each example to the issue it illustrates.",
      steps: [{
        type: "match",
        selectLabel: "Issue",
        options: ["Invented information", "Missing nuance", "Outdated information", "Bias"],
        retryFeedback: "Look at the main issue: is the information invented, missing qualifications, missing recent developments, or representing people unevenly?",
        items: [
          { text: "AI supplies a journal article title and authors, but checking the journal confirms that the article does not exist.", answer: "Invented information",
            feedback: "Yes! AI can produce convincing references that are entirely made up. Check that sources actually exist." },
          { text: "A summary describes a study’s findings but leaves out its small sample and important limitations.", answer: "Missing nuance",
            feedback: "Exactly! A summary can omit details that change how readers should interpret the findings." },
          { text: "Asked about current research, AI provides an older overview that omits several relevant recent studies.", answer: "Outdated information",
            feedback: "Right! An answer may leave out newer developments. Check whether it reflects the relevant recent research." },
          { text: "Asked to suggest scientists to profile, AI repeatedly selects men despite equally relevant women in the supplied source list.", answer: "Bias",
            feedback: "Yes! AI output can reproduce human biases. Review whose perspectives and contributions are included or excluded." }
        ]
      }]
    },
    {
      title: "Activity 2: Check the summary",
      meta: "Optional · Click to revise",
      layout: "side",
      figure: "<div class=\"sc-flow\" role=\"img\" aria-label=\"Diagram: a research paper goes into an AI tool, which produces a summary.\"><span><img src=\"../../../assets/img/paper-stack.png\" alt=\"\"><span class=\"sc-flow-label\">Source</span></span><span class=\"sc-flow-arrow\" aria-hidden=\"true\">→</span><span><img src=\"../../../assets/img/ai-chip.png\" alt=\"\"><span class=\"sc-flow-label\">AI</span></span><span class=\"sc-flow-arrow\" aria-hidden=\"true\">→</span><span><img src=\"../../../assets/img/summary-chart.svg\" alt=\"\"><span class=\"sc-flow-label\">Summary</span></span></div>",
      context: "<span class=\"sc-fictional\">Fictional practice example</span><p class=\"sc-card-title\">Source excerpt</p><p>“Researchers observed 30 balcony gardens in one city. Gardens with more flowering plant species had more bee visits. The study did not test whether adding plant species caused the increase.”</p>",
      instructions: "Replace the highlighted phrase in the AI-generated summary with wording supported by the source.",
      steps: [{
        type: "revise",
        segments: [
          "<strong>AI-generated summary:</strong> “A study ",
          { text: "proved that adding more kinds of flowers increases bee visits", options: [
            { text: "found that gardens with more flowering plant species had more bee visits", correct: true,
              feedback: "Yes! This reports the observed relationship without claiming that one factor caused the other." },
            { text: "confirmed that adding flower species attracts more bees in every city",
              feedback: "The study covered one city and did not establish cause and effect. This wording adds two claims the source doesn’t support." },
            { text: "found no relationship between flowering plant species and bee visits",
              feedback: "The researchers did observe a relationship. Preserving uncertainty means describing that finding accurately." }
          ]},
          ".”"
        ]
      }],
      completion: "Check an AI summary against the original research before using it. A fluent sentence can still overstate what a study shows."
    },
    {
      title: "Activity 3: Make the AI contribution clear",
      meta: "Optional · Two dropdowns",
      context: "<p>You used AI to suggest an outline for a public-facing article. You wrote the article yourself and checked its scientific claims against the original sources. Complete an accurate note about your process.</p>",
      steps: [{
        type: "fill",
        segments: [
          "“AI was used to ",
          { label: "AI’s contribution", options: [{ text: "suggest the outline", correct: true }, { text: "write the entire article" }],
            correctFeedback: "Yes! This identifies the specific assistance AI provided without overstating its role.",
            retryFeedback: "The scenario says AI suggested the outline. The note should accurately describe that contribution." },
          ". I ",
          { label: "Your responsibility", options: [{ text: "checked the scientific claims against original sources", correct: true }, { text: "relied on the AI output as verification" }],
            correctFeedback: "Exactly! You remain responsible for checking the claims in the finished article.",
            retryFeedback: "AI output is what needs checking. Compare scientific claims with the original sources." },
          ".”"
        ]
      }],
      completion: "Transparency explains how AI contributed. Accountability means taking responsibility for what you share. A disclosure supports trust, but it doesn’t replace verification."
    }
  ]
};
