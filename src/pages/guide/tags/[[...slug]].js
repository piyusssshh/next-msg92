import { useRouter } from 'next/router';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Head from 'next/head';
import Pagination from '@/components/Guide/page/Pagination';
import { countPosts, listPostContent } from '@/components/Guide/lib/posts';
import { getTag, listTags } from '@/components/Guide/lib/tags';
import PostItem from '@/components/Guide/page/PostItem';
export default function Index({ posts, tag, pagination, page }) {
    const router = useRouter();
    const handleClick = () => {
        router.back();
    };
    const url = `/guide/tags/${tag}` + (page ? `/${page}` : '');
    return (
        <>
            <Head>
                <title>{tag} | MSG91 Guide</title>
                <meta
                    property='og:title'
                    content={`Explore our collection of articles tagged under ${tag} at MSG91 -The Best Cloud Communication Platform. Discover insightful content, tips, and resources related to ${tag}.`}
                    key='title'
                />
            </Head>
            <div className='blog'>
                <div className={'container blog-home-container'}>
                    <div className={'posts'}>
                        <button className='d-inline-block btn blog-container__back-btn mb-4' onClick={handleClick}>
                            <MdKeyboardArrowLeft />
                            Back
                        </button>
                        <div className='flex flex-wrap gap-12'>
                            {posts?.map((it, i) => (
                                <PostItem key={i} post={it} />
                            ))}
                        </div>
                        <Pagination
                            current={pagination.current}
                            pages={pagination.pages}
                            link={{
                                href: () => '/guide/tags/[[...slug]]',
                                as: (page) => (page === 1 ? '/guide/tags/' + tag : `/guide/tags/${tag}/${page}`),
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps({ params }) {
    let queries = [];
    queries = params.slug;
    const [slug, page] = [queries[0], queries[1] || 1];
    const posts = listPostContent(page ? parseInt(page) : 1, 18, slug);
    const tag = getTag(slug);

    const pagination = {
        current: page ? parseInt(page) : 1,
        pages: Math.ceil(countPosts(slug) / 18),
    };
    const props = {
        posts,
        tag,
        pagination: { current: pagination.current, pages: pagination.pages },
        page,
    };
    if (page) {
        props.page = page;
    }
    return {
        props,
    };
}

export async function getStaticPaths() {
    const paths = listTags().flatMap((tag) => {
        const pages = Math.ceil(countPosts(tag.slug) / 18);

        return Array.from(Array(pages).keys()).map((page) =>
            page === 0
                ? {
                      params: { slug: [tag.slug] },
                  }
                : {
                      params: { slug: [tag.slug, (page + 1).toString()] },
                  }
        );
    });
    return {
        paths: paths,
        fallback: false,
    };
}
