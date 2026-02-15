require('dotenv').config();
const AIProcessor = require('./server/utils/aiProcessor');

async function test() {
    const processor = new AIProcessor();
    try {
        console.log("Testing Learning Path Generation...");
        const path = await processor.generateLearningPath('React', 'beginner', 'Get Hired', 4);
        console.log("Learning Path Result:", JSON.stringify(path, null, 2));

        console.log("\nTesting Chat...");
        const chatResponse = await processor.chat("Hello, who are you?");
        console.log("Chat Response:", chatResponse);

    } catch (error) {
        console.error("Test Failed:", error);
    }
}

test();
