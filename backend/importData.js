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

        const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

        await Subject.deleteMany();
        await Chapter.deleteMany();
        await Topic.deleteMany();

        for (const subjectData of data.subjects) {
            const chapterIds = [];

            const subject = new Subject({
                subjectCode: subjectData.subjectCode,
                subjectImage: subjectData.subjectImage,
                subjectName: subjectData.subjectName,
                subjectIntroContent: subjectData.subjectIntroContent,
            });
            await subject.save();

            for (const chapterData of subjectData.chapters) {
                const chapter = new Chapter({
                    chapterCode: chapterData.chapterCode,
                    chapterName: chapterData.chapterName,
                    chapterIntroContent: chapterData.chapterIntroContent,
                    subject: subject._id, 
                });
                await chapter.save();

                const topicIds = [];

                for (const topicData of chapterData.topics) {
                    const topic = new Topic({
                        topicId: topicData.topicId,
                        topicName: topicData.topicName,
                        contentList: topicData.contentList,
                        mainContent: topicData.mainContent,
                        chapter: chapter._id, 
                    });
                    await topic.save();
                    topicIds.push(topic._id);
                }

                chapter.topics = topicIds;
                await chapter.save();

                chapterIds.push(chapter._id);
            }

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
