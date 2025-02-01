const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const Subject = require('./models/Subject');
const Chapter = require('./models/Chapter');
const Topic = require('./models/Topic');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        // Read data.json
        const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

        // Clear existing data
        await Subject.deleteMany();
        await Chapter.deleteMany();
        await Topic.deleteMany();

        // Insert subjects, chapters, and topics
        for (const subjectData of data.subjects) {
            const chapterIds = [];

            // Create the subject
            const subject = new Subject({
                subjectCode: subjectData.subjectCode,
                subjectName: subjectData.subjectName,
                subjectIntroContent: subjectData.subjectIntroContent,
            });
            await subject.save();

            for (const chapterData of subjectData.chapters) {
                // Create the chapter first
                const chapter = new Chapter({
                    chapterCode: chapterData.chapterCode,
                    chapterName: chapterData.chapterName,
                    chapterIntroContent: chapterData.chapterIntroContent,
                    subject: subject._id, // Associate chapter with the subject
                });
                await chapter.save();

                const topicIds = [];

                // Create topics associated with the chapter
                for (const topicData of chapterData.topics) {
                    const topic = new Topic({
                        topicId: topicData.topicId,
                        topicName: topicData.topicName,
                        contentList: topicData.contentList,
                        mainContent: topicData.mainContent,
                        chapter: chapter._id, // Associate topic with the chapter
                    });
                    await topic.save();
                    topicIds.push(topic._id);
                }

                // Update chapter with its topics
                chapter.topics = topicIds;
                await chapter.save();

                chapterIds.push(chapter._id);
            }

            // Update the subject with its chapters
            subject.chapters = chapterIds;
            await subject.save();
        }

        console.log('Data Imported Successfully');
        process.exit();
    } catch (err) {
        console.error('Error importing data:', err.message);
        process.exit(1);
    }
};

importData();
