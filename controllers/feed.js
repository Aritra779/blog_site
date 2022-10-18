
import {BlogModel} from '../models/index.js';

const getFeed = async (req, res) => {
    const blogs = await BlogModel.find();
    res.render('feed', {blogs : blogs});
}
export default getFeed;