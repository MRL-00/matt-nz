import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../site';

export async function GET(context: { site?: URL }) {
  const posts = (await getCollection('writing', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: `${site.title} — writing`,
    description: site.description,
    site: context.site?.toString() ?? site.url,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/writing/${post.id}`,
      categories: post.data.tags,
    })),
    customData: '<language>en-nz</language>',
  });
}
