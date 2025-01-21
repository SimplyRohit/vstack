import dedent from "dedent";

// "explanation": "",
// "generatedFiles": []
// Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.

export const Suggestions = [
  "Create ToDo App in React",
  "Create Budget Track App",
  "Create Gym Managment Portal Dashboard",
  "Create Quizz App On History",
  "Create Login Signup Screen",
];

export const Color = {
  LABEL: "#a3a3a3",
  SUBHEADING: "#d1d5db",
  BACKGROUND: "#151515",
  BLUE: "#2ba6ff",
  CHAT_BACKGROUND: "#272727",
};

export const Dependency = {
  postcss: "^8",
  tailwindcss: "^3.4.1",
  autoprefixer: "^10.0.0",
  uuid4: "^2.0.3",
  "tailwind-merge": "^2.4.0",
  "tailwindcss-animate": "^1.0.7",
  "lucide-react": "^0.469.0",
  "react-router-dom": "^7.1.1",
  firebase: "^11.1.0",
  "@google/generative-ai": "^0.21.0",
  "date-fns": "^4.1.0",
  "react-chartjs-2": "^5.3.0",
  "chart.js": "^4.4.7",
};

export const Default_File = {
  "/public/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  },
  "/App.css": {
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
  },
  "/tailwind.config.js": {
    code: `/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
"./src/**/*.{js,jsx,ts,tsx}",],
theme: {
  extend: {},
},
plugins: [],
}`,
  },
  "/postcss.config.js": {
    code: `/** @type {import('postcss-load-config').Config} */
const config = {
plugins: {
  tailwindcss: {},
},
};

export default config;
`,
  },
};

export const Chat_Prompt = dedent`
  'You are a AI Assistant and experience in React Development.
  GUIDELINES:
  - Tell user what your are building
  - response less than 15 lines. 
  - Skip code examples and commentary'
`;

export const Code_Gen_Prompt = dedent`
Generate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, 
without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.
also you can use date-fns for date format and react-chartjs-2 chart, graph library

Return the response in JSON format with the following schema:
{
  "projectTitle": "",
  "files": {
    "/App.js": {
      "code": ""
    },
  
  },
}

Here’s the reformatted and improved version of your prompt:

Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.

Return the response in JSON format with the following schema:

json
Copy code
{
  "projectTitle": "",
  
  "files": {
    "/App.js": {
      "code": ""
    },
  
  }
}
Ensure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:
files:{
  "/App.js": {
    "code": "import React from 'react';\nimport './styles.css';\nexport default function App() {\n  return (\n    <div className='p-4 bg-gray-100 text-center'>\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\n    </div>\n  );\n}"
  }
}
  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required
  
  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg
  -Add Emoji icons whenever needed to give good user experinence
  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

- Use icons from lucide-react for logos.

- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.
   `;
