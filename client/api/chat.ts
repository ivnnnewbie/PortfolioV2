import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-2.5-flash";

// Inlined context to ensure 100% reliable bundling on Vercel Serverless Functions
const portfolioContext = {
  owner: "Daverick Ivan Tenorio",
  pronouns: "He/Him",
  contact: {
    email: "daverickivant@gmail.com",
    phone: "09380120661",
    contactPage: "/contact",
  },
  education: {
    primaryeducation: [
      {
      name: "Fragante Elementary School",
      awards: "Academic Excellence Awardee for 7 consecutive years",
      }
    ],
    secondaryeducation: [
      {
        name: "Pandan National Vocational High School",
        strand: "Humanities and Social Sciences",
        awards: "Academic Excellence Awardee for 6 consecutive years",
      }
    ],
    tertiaryeducation: [
      {
      name: "University of Antique - Tario Lim Memorial Campus",
      program: "Bachelor of Science in Information Technology",
      major: "Human-Computer Interaction",
      awards: "Deans Lister for 7 consecutive semesters, Cum Laude",
      }
    ]
  },
  personal: {
    favouritequote: "Que sera, sera. Whatever will be, will be.",
    zodiacsign: "Virgo",
    politicalview: "Pro Philippine Democracy, Pro People, Pro Environment",
    hobbies: ["Gaming", "Reading", "Music", "Dancing"],
    favoritecolor: "Green, not neon green though",
    favoriteartist:"Ariana Grande",
  },
  availability: {
    status: "Actively looking for employment opportunities",
    focus: ["Frontend development", "UI/UX Design", "Graphic Design"],
    location: "Philippines Fragante, Pandan, Antique",
    contactHint: "Use the Contact section on the portfolio to reach out.",
  },
  techStack: {
    Design: ["Canva", "Affinity", "Figma", "AdobeXD"],
    Code: ["VS Code", "Android Studio", "HTML", "CSS", "Git", "GitHub", "MySQL", "Vercel"],
    Office: ["Google Docs", "Google Sheets", "Google Sites", "Microsoft Word"],
  },
  experiences: {
    publicservice: [
      {
      role: "Secretary",
      organization: "Sangguniang Kabataan Barangay Fragante, Pandan, Antique",
      duration: "2024-2026",
      description: "As the Secretary of the Sangguniang Kabataan, I am responsible for maintaining accurate records of meetings, preparing agendas, and ensuring effective communication within the organization. I also assist in organizing community events and initiatives that promote youth engagement and development.",
      },
    ],
    Academic: [
      {
      role: ["News Writer", "Editor-in-Chief"],
      organization: "THE iCON (College of Computing and Information Sciences Official Student Publication)",
      duration: "2023-2026",
      description: "Started as a News Writer, I contributed articles and reports on various topics related to the College's activities and student life. Later promoted to Editor-in-Chief, I oversee the content submitted by junior staffs, manage the editorial team, and ensure the quality and accuracy of all published materials.",
      }
    ],
    internship: [
      {
      role: ["Data Encoder", "Graphic Designer"],
      organization: "Commission on Higher Education Regional Office VI (CHED RO VI)",
      unit: "Higher Education Management Information System (HEMIS)",
      duration: "February 2026 - May 2026",
      description: "As a Data Encoder, I was responsible for accurately inputting and managing data related to Higher Education Institution Data. Additionally, I contributed to graphic design projects, creating publication and multimedia materials.",
      }
    ]
  },
  projects: [
    {
      name: "Mobile Thrift Shop UI",
      description: "A mobile thrift shop UI design with a clean and modern interface, focusing on user-friendly navigation and product presentation.",
      tech: ["Canva"],
      live: "https://canva.link/2m8wkbxuuoi1i8m",
    },
    {
      name: "Magazine Layout Design",
      description: "A magazine layout design that combines visual storytelling with a clean and organized structure, enhancing readability and engagement.",
      tech: ["Canva"],
      live: "https://canva.link/65saukau8lvx91o",
    },
  ],
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // 1. Add CORS Headers to allow your localhost browser to talk to Vercel
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allows localhost access
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle the browser's automatic security preflight (OPTIONS method)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing GOOGLE_API_KEY" });
    }

    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = [
      ...history.map((h: any) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const result = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        // We pass the stringified portfolio structure and append strict formatting constraints
        systemInstruction: `You are ${portfolioContext.owner}'s portfolio assistant. Use this data to answer questions accurately: ${JSON.stringify(portfolioContext)}. 
        
        CRITICAL FORMATTING RULES:
        - DO NOT use any Markdown formatting under any circumstances.
        - NEVER use double asterisks (**) or single asterisks (*) to bold, emphasize, or highlight words.
        - Always return responses as clean, plain, unformatted text only.
        - If text elements contain commas, list them naturally in a smooth sentence.`,
        temperature: 0.3,
        maxOutputTokens: 300,
      },
    });

    const reply =
      result?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ??
      "Sorry, I didn't get that right. Please Try again.";

    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Chat failed" });
  }
}