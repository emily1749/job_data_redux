import axios from 'axios';

export default axios.create({
  baseURL: 'https://jobdataapi.emlin.repl.co/jobSkillsData/',
});
