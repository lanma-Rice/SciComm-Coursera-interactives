/* ==========================================================================
   CATALOG — single source of truth for course, module and lecture titles.
   Lecture pages and the landing page read their titles from here.

   Folder for each lecture:  c{course}/m{module}/l{module}-{lecture}/
   status: "ready"  = practice page built
           "todo"   = placeholder page ("coming soon")
           "none"   = no practice planned (no folder)
   video:  video ID from FSC_Solomon_VideoTracker (for cross-reference)

   Keep this file valid JSON after "window.CATALOG =" (tools/scaffold.py reads it).
   ========================================================================== */
window.CATALOG =
{
  "specialization": "Fundamentals of Science Communication",
  "courses": [
    {
      "id": "c1",
      "number": 1,
      "title": "Principles of Science Communication",
      "modules": [
        { "id": "m1", "number": 1, "title": "What Is Science Communication?", "lectures": [
          { "id": "l1-1", "number": "1.1", "video": "A01", "status": "todo", "title": "Why Communicate Science?" },
          { "id": "l1-2", "number": "1.2", "video": "A02", "status": "ready", "title": "Who Communicates Science?" },
          { "id": "l1-3", "number": "1.3", "video": "A03", "status": "todo", "title": "Theories of Science Communication" }
        ]},
        { "id": "m2", "number": 2, "title": "Challenges of Science Communication", "lectures": [
          { "id": "l2-1", "number": "2.1", "video": "B01", "status": "todo", "title": "Lack of Training and Support" },
          { "id": "l2-2", "number": "2.2", "video": "B02", "status": "todo", "title": "Expert Blind Spot" },
          { "id": "l2-3", "number": "2.3", "video": "B03", "status": "todo", "title": "Describing Uncertainty" },
          { "id": "l2-4", "number": "2.4", "video": "B04", "status": "todo", "title": "Crowded Spaces" },
          { "id": "l2-5", "number": "2.5", "video": "B05", "status": "todo", "title": "Confronting Skepticism and Misinformation" },
          { "id": "l2-6", "number": "2.6", "video": "B06", "status": "todo", "title": "Being a Good Listener" },
          { "id": "l2-7", "number": "2.7", "video": "B07", "status": "todo", "title": "Measuring Impact" }
        ]},
        { "id": "m3", "number": 3, "title": "Principles of Science Communication, Part I", "lectures": [
          { "id": "l3-1", "number": "3.1", "video": "C01", "status": "todo", "title": "Establish Your Goals" },
          { "id": "l3-2", "number": "3.2", "video": "C02", "status": "todo", "title": "Know Your Audience" },
          { "id": "l3-3", "number": "3.3", "video": "C03", "status": "todo", "title": "Develop Trust" },
          { "id": "l3-4", "number": "3.4", "video": "C04", "status": "todo", "title": "Use Plain Language" },
          { "id": "l3-5", "number": "3.5", "video": "C05", "status": "todo", "title": "Tell Stories" }
        ]},
        { "id": "m4", "number": 4, "title": "Principles of Science Communication, Part II", "lectures": [
          { "id": "l4-1", "number": "4.1", "video": "D01", "status": "todo", "title": "Choose Your Media Strategically" },
          { "id": "l4-2", "number": "4.2", "video": "D02", "status": "todo", "title": "Use Metaphors" },
          { "id": "l4-3", "number": "4.3", "video": "D03", "status": "todo", "title": "Be Authentic and Find Your Voice" },
          { "id": "l4-4", "number": "4.4", "video": "D04", "status": "todo", "title": "Use Humor" },
          { "id": "l4-5", "number": "4.5", "video": "D05", "status": "todo", "title": "Have Fun" }
        ]},
        { "id": "m5", "number": 5, "title": "Science Communication Considerations", "lectures": [
          { "id": "l5-1", "number": "5.1", "video": "E01", "status": "todo", "title": "AI and Science Communication" },
          { "id": "l5-2", "number": "5.2", "video": "E02", "status": "ready", "title": "Being a Science Communicator" }
        ]}
      ]
    },
    {
      "id": "c2",
      "number": 2,
      "title": "Fundamentals of Science Writing",
      "modules": [
        { "id": "m1", "number": 1, "title": "What Science Writing Is and Core Moves", "lectures": [
          { "id": "l1-1", "number": "1.1", "video": "A01", "status": "todo", "title": "What Is Science Writing?" },
          { "id": "l1-2", "number": "1.2", "video": "A02", "status": "todo", "title": "How to Write an Op-Ed" },
          { "id": "l1-3", "number": "1.3", "video": "A03", "status": "todo", "title": "Press Releases" },
          { "id": "l1-4", "number": "1.4", "video": "A04", "status": "todo", "title": "Writing Science News" }
        ]},
        { "id": "m2", "number": 2, "title": "Short-Form and Timely Formats", "lectures": [
          { "id": "l2-1", "number": "2.1", "video": "B01", "status": "todo", "title": "Short-Form Writing: Blogs, Newsletters, and Social Media Posts" },
          { "id": "l2-2", "number": "2.2", "video": "B02", "status": "todo", "title": "Social Media" },
          { "id": "l2-3", "number": "2.3", "video": "B03", "status": "todo", "title": "Writing for Magazines" },
          { "id": "l2-4", "number": "2.4", "video": "B04", "status": "todo", "title": "Writing a Book" }
        ]},
        { "id": "m3", "number": 3, "title": "Science Writing Essentials, Part I", "lectures": [
          { "id": "l3-1", "number": "3.1", "video": "C01", "status": "todo", "title": "Knowing Your Audience" },
          { "id": "l3-2", "number": "3.2", "video": "C02", "status": "todo", "title": "Hooking Your Audience" },
          { "id": "l3-3", "number": "3.3", "video": "C03", "status": "todo", "title": "Telling a Story" },
          { "id": "l3-4", "number": "3.4", "video": "C04", "status": "todo", "title": "Jargon: To Use or Not to Use" }
        ]},
        { "id": "m4", "number": 4, "title": "Science Writing Essentials, Part II", "lectures": [
          { "id": "l4-1", "number": "4.1", "video": "D01", "status": "todo", "title": "Using Metaphors, Anecdotes, and Examples" },
          { "id": "l4-2", "number": "4.2", "video": "D02", "status": "todo", "title": "AI and Science Writing" },
          { "id": "l4-3", "number": "4.3", "video": "D03", "status": "todo", "title": "How to Get Started in Science Writing" },
          { "id": "l4-4", "number": "4.4", "video": "D05", "status": "todo", "title": "Interview with Science Writers" }
        ]}
      ]
    },
    {
      "id": "c3",
      "number": 3,
      "title": "Fundamentals of Oral and Visual Science Communication",
      "modules": [
        { "id": "m1", "number": 1, "title": "Oral Modes", "lectures": [
          { "id": "l1-1", "number": "1.1", "video": "A01", "status": "todo", "title": "The Elevator Pitch" },
          { "id": "l1-2", "number": "1.2", "video": "A02", "status": "todo", "title": "Oral Presentations" },
          { "id": "l1-3", "number": "1.3", "video": "A03", "status": "todo", "title": "Being Interviewed" },
          { "id": "l1-4", "number": "1.4", "video": "A04", "status": "todo", "title": "Podcasts" },
          { "id": "l1-5", "number": "1.5", "video": "A05", "status": "todo", "title": "Speaking with Children" }
        ]},
        { "id": "m2", "number": 2, "title": "Presentation Essentials", "lectures": [
          { "id": "l2-1", "number": "2.1", "video": "B01", "status": "todo", "title": "Crafting Your Message" },
          { "id": "l2-2", "number": "2.2", "video": "B02", "status": "todo", "title": "Sticking to Your Talking Points" },
          { "id": "l2-3", "number": "2.3", "video": "B03", "status": "todo", "title": "Practicing Your Presentation" },
          { "id": "l2-4", "number": "2.4", "video": "B04", "status": "todo", "title": "Honing Your Delivery" },
          { "id": "l2-5", "number": "2.5", "video": "B05", "status": "todo", "title": "Engaging Your Audience" },
          { "id": "l2-6", "number": "2.6", "video": "B06", "status": "todo", "title": "Visual Aids" }
        ]},
        { "id": "m3", "number": 3, "title": "Visual Storytelling Basics", "lectures": [
          { "id": "l3-1", "number": "3.1", "video": "C01", "status": "todo", "title": "Graphs and Figures" },
          { "id": "l3-2", "number": "3.2", "video": "C02", "status": "todo", "title": "Infographics" },
          { "id": "l3-3", "number": "3.3", "video": "C03", "status": "todo", "title": "Scientific Illustration" },
          { "id": "l3-4", "number": "3.4", "video": "C04", "status": "todo", "title": "Science Cartoons and Animation" }
        ]},
        { "id": "m4", "number": 4, "title": "Visual Media and Production", "lectures": [
          { "id": "l4-1", "number": "4.1", "video": "D01", "status": "todo", "title": "Science Photography" },
          { "id": "l4-2", "number": "4.2", "video": "D02", "status": "todo", "title": "Short Science Videos" },
          { "id": "l4-3", "number": "4.3", "video": "D03", "status": "todo", "title": "Long Science Videos" },
          { "id": "l4-4", "number": "4.4", "video": "D04", "status": "todo", "title": "Visual Science Communication Using AI" }
        ]}
      ]
    }
  ]
}
;
