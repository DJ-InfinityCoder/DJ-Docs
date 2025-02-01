import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchSubjects = () => axios.get(`${API_BASE_URL}`);
export const fetchSubjectByCode = (subjectCode) => axios.get(`${API_BASE_URL}/${subjectCode}`);
export const fetchChapterByCode = (subjectCode, chapterCode) =>
    axios.get(`${API_BASE_URL}/${subjectCode}/${chapterCode}`);
export const fetchTopicById = (subjectCode, chapterCode, topicId) =>
    axios.get(`${API_BASE_URL}/${subjectCode}/${chapterCode}/${topicId}`);
