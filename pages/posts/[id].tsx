import React from 'react';
import { GetStaticPaths, GetStaticProps } from "next";
import Head from 'next/head';
import { getAllPostIds, getPostData } from '@/lib/post';
import homeStyles from "@/styles/Home.module.css";

const Post = ({postData}: {
    postData: {
        title: string
        date: string
        contentHtml: string
    }
}) => {
  return (
    <div>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={homeStyles.headingXl}>{postData.title}</h1>
            <div>
                {postData.date}
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml}}/>
        </article>
    </div>
  )
}

export default Post


export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) =>{
    
    const postData = await getPostData(params?.id as string)

    return {
        props: {
            postData
        }
    }
}