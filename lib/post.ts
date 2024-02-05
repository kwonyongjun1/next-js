import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostData(){

    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map(fileName=>{
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        const matterResult = matter(fileContents);

        return{
            id,
            ...matterResult.data as { date: string; title: string}
        }
    })

    // Sorting

    return allPostsData.sort((a,b)=>{
        if(a.date < b.date){
            return 1;
        }else{
            return -1;
        }
    })
}