# Gida Koruculari (Food Rangers)

Reading the long, complex, and sometimes obscure ingredient lists on the back of packaged foods while grocery shopping can be exhausting for all of us. I developed this mobile app with the thought that "knowing what we eat is our most fundamental right."

The app basically uses your phone's camera to scan the ingredients section on food packaging. Then, it analyzes this text in the background using the Gemini API, presenting you with an understandable health score and warning badges for risky substances (allergens, harmful chemicals, preservatives, etc.).

For those who want to test the app directly on their own phone without dealing with the code, I have also added the APK file to the repo. You can download and install it right away.

What Can It Do?
- Fast and instant ingredient scanning from packaging using the camera
- Content analysis in seconds with Gemini integration
- Visual scoring system based on the food's health status (Health Score Gauge)
- Risk badges for harmful components or ingredients that need attention

Technologies Used
To ensure performance and code readability while developing the project, I set up the following structure:
- React Native & Expo (Mobile interface and camera integration)
- TypeScript
- Google Gemini API (Text analysis and risk detection)

How to Run the Project on Your Computer
If you want to review the codes or get involved in the development, the steps are very simple:

1. Clone the repo to your computer:
git clone https://github.com/lutfukara63/Gida-Koruculari.git

2. Enter the project directory and install packages:
cd Gida-Koruculari
npm install

3. Start the development server:
npx expo start

(A quick note: You need to add your own Gemini API key into the code for the app's analysis part to work properly.)

Contributing
My goal is to use technology to create works that benefit society and touch people's lives. You can review the codes and fix any missing parts you see, open an Issue if you have new feature ideas, or send a PR directly. I am open to all kinds of contributions and feedback.
