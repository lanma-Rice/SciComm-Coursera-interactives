/* Course 1 · Module 3 · Lecture 3.3: Develop Trust
   Source: Course I Ungraded Assessments doc.
   DRAFT (Claude): replacement options and feedback for the SECOND highlighted statement
   ("I haven't checked…") are not in the doc and need Lan's and Scott's review. */
window.LECTURE = {
  id: "c1/m3/l3-3",
  activities: [
    {
      title: "Practice: Revise for trust",
      meta: "Optional · About 2–3 minutes",
      steps: [
        {
          type: "revise", heading: "1. Own the mistake, and the limits",
          instructions: "A scientist is updating residents about a fictional neighborhood tree study. Replace the two highlighted statements with wording that better supports trust.",
          segments: [
            "“We’re studying how trees affect temperatures on neighborhood streets.\n",
            { text: "The number in my earlier post was incorrect, but it was only a small mistake, so let’s move on.",
              options: [
                { text: "I reported the wrong number earlier. Here is the corrected figure and the source used to verify it.", correct: true,
                  feedback: "This acknowledges the error, corrects the information, and lets readers check the source. Accountability supports trust." },
                { text: "I updated the number in the original post, so there’s no need to mention the correction here.",
                  feedback: "Updating the post helps, but people who saw the earlier version may not know it changed. A visible correction helps them understand what happened." },
                { text: "The incorrect number came from another source, so readers should direct their questions there.",
                  feedback: "Explaining the source of an error can be useful, but you still need to take responsibility for correcting information you shared." }
              ]},
            "\n",
            { text: "I haven’t checked whether this finding applies to every neighborhood, but I’m confident it does.",
              options: [
                { text: "I haven’t yet checked whether this finding applies to every neighborhood. We’ll share what we learn as we look further.", correct: true,
                  feedback: "This is honest about what you don’t know yet. Acknowledging the limits of your evidence helps people judge what you say." },
                { text: "This finding applies to every neighborhood.",
                  feedback: "Dropping the caveat makes the claim sound certain, but it still hasn’t been checked. Confidence doesn’t replace accuracy." },
                { text: "Other neighborhoods are probably similar, so there’s no need to mention them.",
                  feedback: "Leaving out what you haven’t checked hides an important limitation. Be honest about what you don’t know." }
              ]},
            "\nWhat questions or concerns would you like our team to address?”"
          ]
        },
        {
          type: "multi", heading: "2. Which practices help establish and maintain trust?",
          instructions: "Select all that apply.",
          options: [
            { text: "Verify information before sharing it.", correct: true, feedback: "Accuracy supports credibility, including when sharing someone else’s content." },
            { text: "Acknowledge when you don’t know an answer.", correct: true, feedback: "Being honest about your limits helps people judge what you say." },
            { text: "Give a confident answer even when you haven’t checked it.", feedback: "Confidence does not replace accuracy. Check the information or explain that you don’t know." },
            { text: "Acknowledge and correct mistakes.", correct: true, feedback: "Taking responsibility for errors demonstrates accountability." }
          ]
        },
        {
          type: "fill", heading: "3. Complete the main idea",
          segments: ["Trust is built and maintained through ", {
            label: "Main idea blank",
            options: [{ text: "consistent trustworthy behavior over time", correct: true }, { text: "one strong first impression" }],
            correctFeedback: "A good first impression can help, but trust requires ongoing accuracy, honesty, accountability, and listening.",
            retryFeedback: "A good first impression can help, but trust requires ongoing accuracy, honesty, accountability, and listening."
          }, "."]
        }
      ],
      completion: "Trust grows through accuracy, honesty, accountability, and genuine attention to people—not a single reassuring message."
    }
  ]
};
